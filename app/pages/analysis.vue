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
        fileData.value = rows.slice(0, 200).map(r => keys.map(k => parseFloat(r[k]) || 0))
      } catch (err) { error.value = err.message }
    }
  })
}

const loadSampleData = () => {
  fileName.value = 'synthetic_test_sample.csv'
  const samples = []
  for (let i = 0; i < 200; i++) {
    const t = i * 0.0001
    // Generate simple sine waves for Va, Vb, Vc (with 120 deg phase shifts)
    const va = Math.sin(2 * Math.PI * 50 * t) 
    const vb = Math.sin(2 * Math.PI * 50 * t - (2*Math.PI/3))
    const vc = Math.sin(2 * Math.PI * 50 * t - (4*Math.PI/3))
    // Currents (Ia, Ib, Ic)
    const ia = 0.5 * Math.sin(2 * Math.PI * 50 * t)
    const ib = 0.5 * Math.sin(2 * Math.PI * 50 * t - (2*Math.PI/3))
    const ic = 0.5 * Math.sin(2 * Math.PI * 50 * t - (4*Math.PI/3))
    
    // Add minor random noise
    const noise = () => (Math.random() - 0.5) * 0.05
    samples.push([t, va + noise(), vb + noise(), vc + noise(), ia + noise(), ib + noise(), ic + noise()])
  }
  fileData.value = samples
}

const handleAnalysis = async () => {
  if (!fileData.value) return
  loading.value = true; error.value = null
  setTimeout(async () => {
    try {
      result.value = await predictFault(fileData.value)
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
