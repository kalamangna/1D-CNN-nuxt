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
  
  const samples = []
  const dt = 0.0001 
  const freq = 50 
  const totalRows = 400
  const faultStart = 200 
  
  // Randomize Fault Type and Location if applicable
  const faultTypes = ['A-G', 'B-G', 'C-G', 'A-B', 'B-C', 'C-A', 'AB-G', 'BC-G', 'CA-G', 'A-B-C']
  const selectedType = isFaultScenario ? faultTypes[Math.floor(Math.random() * faultTypes.length)] : 'Normal'
  const randomLocationPct = Math.floor(Math.random() * 90) + 5 // 5% to 95%
  
  fileName.value = isFaultScenario 
    ? `test_${selectedType.toLowerCase()}_${randomLocationPct}pct_400.csv` 
    : 'test_normal_400.csv'

  for (let i = 0; i < totalRows; i++) {
    const t = i * dt
    const isFault = isFaultScenario && i >= faultStart
    
    const vPeak = 1.0
    const iPeak = 0.164

    // Base Sinusoidal Signals
    let v = [
      vPeak * Math.sin(2 * Math.PI * freq * t),
      vPeak * Math.sin(2 * Math.PI * freq * t - (2 * Math.PI / 3)),
      vPeak * Math.sin(2 * Math.PI * freq * t - (4 * Math.PI / 3))
    ]

    let curr = [
      iPeak * Math.sin(2 * Math.PI * freq * t),
      iPeak * Math.sin(2 * Math.PI * freq * t - (2 * Math.PI / 3)),
      iPeak * Math.sin(2 * Math.PI * freq * t - (4 * Math.PI / 3))
    ]

    if (isFault) {
      // Impact of location: Closer (lower %) usually means higher current spike
      const severityFactor = 1.0 - (randomLocationPct / 100)
      
      // DEEPER SAGS & HIGHER SPIKES for better detection
      // Voltage sag: 0.05 (near) to 0.4 (far)
      const vSag = 0.05 + (randomLocationPct / 250) 
      // Current spike: 8.0x (far) to 20.0x (near)
      const iBoost = 8.0 + (severityFactor * 12.0) 

      const applyFault = (idx) => {
        v[idx] = v[idx] * vSag
        curr[idx] = curr[idx] * iBoost
      }

      if (selectedType === 'A-G') applyFault(0)
      else if (selectedType === 'B-G') applyFault(1)
      else if (selectedType === 'C-G') applyFault(2)
      else if (selectedType === 'A-B' || selectedType === 'AB-G') { applyFault(0); applyFault(1); }
      else if (selectedType === 'B-C' || selectedType === 'BC-G') { applyFault(1); applyFault(2); }
      else if (selectedType === 'C-A' || selectedType === 'CA-G') { applyFault(2); applyFault(0); }
      else if (selectedType === 'A-B-C') { applyFault(0); applyFault(1); applyFault(2); }
    }

    const noise = () => (Math.random() - 0.5) * 0.005
    samples.push([
      t, 
      v[0] + noise(), v[1] + noise(), v[2] + noise(),
      curr[0] + noise(), curr[1] + noise(), curr[2] + noise() 
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
    return vAbsMin < 0.7 || iAbsMax > 1.3 // Slightly stricter for windowing
  })
  
  if (faultIdx !== -1) {
    // Capture 30% pre-fault and 70% post-fault for rich context
    windowStart = Math.max(0, faultIdx - 60)
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
