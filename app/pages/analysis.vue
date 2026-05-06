<template>
  <div class="min-h-screen flex flex-col items-center justify-center p-8 bg-[#fafafa] relative">

    <!-- Header Controls (Floating) -->
    <header class="absolute top-10 left-10 right-10 flex justify-between items-center no-print">
       <NuxtLink to="/" class="group flex items-center gap-3 px-5 py-2.5 bg-white border border-slate-200 rounded-full shadow-sm hover:shadow-md transition-all active:scale-95">
          <i class="fa-solid fa-arrow-left text-[10px] text-slate-400 group-hover:text-indigo-600 transition-colors"></i>
          <span class="text-[11px] font-bold text-slate-500 uppercase tracking-widest group-hover:text-slate-900 transition-colors">Home</span>
       </NuxtLink>
       <BackendStatus />
    </header>

    <div class="w-full max-w-3xl space-y-12 animate-in fade-in zoom-in-95 duration-700">
      
      <Transition name="slide-up" mode="out-in">
        <!-- Ingestion State -->
        <AnalyzeCard 
          v-if="!result && !loading"
          key="ingestion"
          title="Lab"
          :has-data="!!fileData"
          :file-name="fileName"
          @trigger-file="triggerFileInput"
          @analyze="handleAnalysis"
          @load-test="loadSampleData"
        />

        <!-- Processing State -->
        <LoadingState 
          v-else-if="loading"
          key="loading"
          message="Processing"
          submessage="Computing results..."
        />

        <!-- Result State -->
        <ResultDisplay 
          v-else-if="result"
          key="result"
          :result="result"
          :signals="fileData"
          @dismiss="resetAnalysis"
          @export="printReport"
        />
      </Transition>

      <!-- Hidden File Input -->
      <input type="file" ref="fileInput" class="hidden" @change="handleFileUpload" accept=".csv" />
    </div>

    <!-- Error Toast -->
    <div v-if="error" class="fixed bottom-10 left-1/2 -translate-x-1/2 p-4 bg-rose-600 text-white rounded-2xl shadow-2xl flex items-center gap-4 animate-shake z-[100]">
       <i class="fa-solid fa-triangle-exclamation"></i>
       <span class="text-xs font-bold uppercase tracking-widest">{{ error }}</span>
       <button @click="error = null" class="ml-4 opacity-50 hover:opacity-100"><i class="fa-solid fa-xmark"></i></button>
    </div>

  </div>
</template>

<script setup>
const { predictFault } = useApi()

const fileInput = ref(null)
const fileName = ref('')
const fileData = ref(null)
const result = ref(null)
const loading = ref(false)
const error = ref(null)

const triggerFileInput = () => fileInput.value.click()

const handleFileUpload = (e) => {
  const file = e.target.files[0]; if (!file) return
  fileName.value = file.name; error.value = null
  Papa.parse(file, {
    header: true, dynamicTyping: true, skipEmptyLines: true,
    complete: (res) => {
      try {
        const rows = res.data
        if (rows.length < 200) throw new Error('Short window.')
        const keys = [
          rows[0] && Object.keys(rows[0]).find(k => k.toLowerCase().includes('t (s)')),
          rows[0] && Object.keys(rows[0]).find(k => k.includes('V(a)')),
          rows[0] && Object.keys(rows[0]).find(k => k.includes('V(b)')),
          rows[0] && Object.keys(rows[0]).find(k => k.includes('V(c)')),
          rows[0] && Object.keys(rows[0]).find(k => k.includes('I(a)')),
          rows[0] && Object.keys(rows[0]).find(k => k.includes('I(b)')),
          rows[0] && Object.keys(rows[0]).find(k => k.includes('I(c)'))
        ]
        if (keys.some(k => !k)) throw new Error('Data Schema mismatch.')
        // Store all rows for visualization, handleAnalysis will handle windowing
        fileData.value = rows.map(r => keys.map(k => parseFloat(r[k]) || 0))
      } catch (err) { error.value = err.message }
    }
  })
}

const loadSampleData = () => {
  const isFaultScenario = Math.random() > 0.5
  fileName.value = isFaultScenario ? 'test_fault_400.csv' : 'test_normal_400.csv'
  
  const samples = []
  // dt MUST be 0.0001 (10kHz) based on training data
  const dt = 0.0001 
  const freq = 50 // Standard grid frequency
  const totalRows = 400
  const faultStart = 200 
  
  for (let i = 0; i < totalRows; i++) {
    const t = i * dt
    const isFault = isFaultScenario && i >= faultStart
    
    // Normal peaks from processed dataset observations
    const vPeak = 1.0
    const iPeak = 0.164

    let vA = vPeak * Math.sin(2 * Math.PI * freq * t)
    let vB = vPeak * Math.sin(2 * Math.PI * freq * t - (2 * Math.PI / 3))
    let vC = vPeak * Math.sin(2 * Math.PI * freq * t - (4 * Math.PI / 3))

    let iA = iPeak * Math.sin(2 * Math.PI * freq * t)
    let iB = iPeak * Math.sin(2 * Math.PI * freq * t - (2 * Math.PI / 3))
    let iC = iPeak * Math.sin(2 * Math.PI * freq * t - (4 * Math.PI / 3))

    if (isFault) {
      // Simulate an A-G fault (Phase A drops, Current A spikes)
      vA = 0.2 * vA // Voltage sag
      iA = 10.0 * iPeak * Math.sin(2 * Math.PI * freq * t - 0.5) // Current spike
    }

    const noise = () => (Math.random() - 0.5) * 0.005
    samples.push([
      t, 
      vA + noise(), vB + noise(), vC + noise(),
      iA + noise(), iB + noise(), iC + noise() 
    ])
  }
  fileData.value = samples
}

const handleAnalysis = async () => {
  if (!fileData.value) return
  loading.value = true; error.value = null
  
  // Logic to find the best 200-sample window for the API
  // Align with backend thresholds: vAbsMin < 0.8 or iAbsMax > 1.2
  let windowStart = 0
  const faultIdx = fileData.value.findIndex(r => {
    const vAbsMin = Math.min(Math.abs(r[1]), Math.abs(r[2]), Math.abs(r[3]))
    const iAbsMax = Math.max(Math.abs(r[4]), Math.abs(r[5]), Math.abs(r[6]))
    return vAbsMin < 0.8 || iAbsMax > 1.2
  })
  
  if (faultIdx !== -1) {
    // Start the window shortly before the fault to capture the transient
    windowStart = Math.max(0, faultIdx - 50)
  }
  
  // Ensure we don't exceed array bounds
  if (windowStart + 200 > fileData.value.length) {
    windowStart = Math.max(0, fileData.value.length - 200)
  }

  const analysisWindow = fileData.value.slice(windowStart, windowStart + 200)

  setTimeout(async () => {
    try {
      result.value = await predictFault(analysisWindow)
    } catch (e) { error.value = 'System Error or Offline' }
    finally { loading.value = false }
  }, 1500)
}

const resetAnalysis = () => {
  result.value = null
  fileData.value = null
  fileName.value = ''
}

const printReport = () => window.print()
</script>

<style scoped>
.slide-up-enter-active,
.slide-up-leave-active { transition: all 0.6s cubic-bezier(0.22, 1, 0.36, 1); }
.slide-up-enter-from { opacity: 0; transform: translateY(30px) scale(0.98); }
.slide-up-leave-to { opacity: 0; transform: translateY(-30px) scale(0.98); }

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-4px); }
  75% { transform: translateX(4px); }
}
.animate-shake { animation: shake 0.3s cubic-bezier(.36,.07,.19,.97) both; }
</style>
