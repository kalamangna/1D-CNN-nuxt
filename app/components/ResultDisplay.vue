<template>
  <div class="animate-in fade-in zoom-in-95 duration-700">
    <div class="relative bg-white border border-slate-200 rounded-[3rem] p-8 lg:p-16 shadow-2xl shadow-slate-200/50 overflow-hidden">
      
      <!-- Subtle Glow Background -->
      <div 
        :class="result.detection === 'Normal' ? 'bg-emerald-500/5' : 'bg-rose-500/5'"
        class="absolute -top-24 -right-24 w-96 h-96 blur-[120px] pointer-events-none rounded-full"
      ></div>

      <div class="relative z-10 space-y-16">
        
        <!-- SECTION 01: DIAGNOSTIC SUMMARY -->
        <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-8 border-b border-slate-100 pb-12">
          <div class="space-y-4">
            <div class="flex items-center gap-3">
              <div :class="result.detection === 'Normal' ? 'bg-emerald-500' : 'bg-rose-500'" class="w-2.5 h-3 rounded-full animate-pulse shadow-lg"></div>
              <span class="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Verdict</span>
            </div>
            <h2 
              :class="result.detection === 'Normal' ? 'text-emerald-600' : 'text-rose-600'"
              class="text-5xl md:text-6xl lg:text-7xl font-[1000] tracking-tighter leading-none uppercase italic break-all"
            >
              {{ result.detection === 'Normal' ? 'NORMAL' : 'FAULT' }}
            </h2>
          </div>

          <div class="flex flex-col sm:flex-row gap-4">
             <div class="bg-slate-50 border border-slate-100 rounded-3xl p-5 px-8">
                <span class="text-[9px] font-black text-slate-400 uppercase tracking-widest block mb-1">Certainty</span>
                <p class="text-3xl font-black text-slate-900 tracking-tighter mono">
                   {{ (result.confidence * 100).toFixed(1) }}<span class="text-xl text-slate-300 ml-1">%</span>
                </p>
             </div>
          </div>
        </div>

        <!-- SECTION 02: KEY PARAMETERS -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
           <!-- Classification Card -->
           <div class="p-8 rounded-[2.5rem] bg-slate-50/50 border border-slate-100 flex items-center justify-between transition-all hover:bg-white hover:shadow-xl hover:shadow-slate-100/50 group">
              <div class="space-y-1">
                 <span class="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Type</span>
                 <p class="text-2xl font-black text-slate-800 tracking-tight uppercase">{{ result.classification }}</p>
              </div>
              <i class="fa-solid fa-fingerprint text-3xl text-slate-200 group-hover:text-indigo-500 transition-colors"></i>
           </div>

           <!-- Location Card -->
           <div class="p-8 rounded-[2.5rem] bg-slate-50/50 border border-slate-100 flex items-center justify-between transition-all hover:bg-white hover:shadow-xl hover:shadow-slate-100/50 group">
              <div class="space-y-1">
                 <span class="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Location</span>
                 <p class="text-2xl font-black text-slate-800 tracking-tight uppercase">
                    {{ result.fault_location_km !== 'N/A' ? result.fault_location_km : '--' }} 
                    <span class="text-lg text-slate-300 ml-1">KM</span>
                 </p>
              </div>
              <i class="fa-solid fa-location-dot text-3xl text-slate-200 group-hover:text-rose-500 transition-colors"></i>
           </div>

           <!-- Inception Time Card -->
           <div class="p-8 rounded-[2.5rem] bg-slate-50/50 border border-slate-100 flex items-center justify-between transition-all hover:bg-white hover:shadow-xl hover:shadow-slate-100/50 group">
              <div class="space-y-1">
                 <span class="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Inception Time</span>
                 <p class="text-2xl font-black text-slate-800 tracking-tight uppercase">
                    {{ result.fault_time_s !== 'N/A' ? (result.fault_time_s * 1000).toFixed(1) : '--' }}
                    <span class="text-lg text-slate-300 ml-1">MS</span>
                 </p>
              </div>
              <i class="fa-solid fa-stopwatch text-3xl text-slate-200 group-hover:text-amber-500 transition-colors"></i>
           </div>
        </div>

        <!-- SECTION 03: VISUALIZATION STAGE (Unified Background) -->
        <div class="p-8 lg:p-12 bg-slate-50/50 rounded-[3rem] border border-slate-100 space-y-24">
           
           <!-- PER UNIT SET -->
           <div class="space-y-10">
              <div class="flex items-center gap-4">
                 <span class="w-1.5 h-6 bg-indigo-500 rounded-full"></span>
                 <h3 class="text-lg font-black text-slate-900 tracking-tight italic uppercase">Normalized Signal <span class="text-slate-300 font-normal ml-2 text-sm">(p.u.)</span></h3>
              </div>

              <div class="space-y-12">
                 <div class="space-y-6">
                    <div class="flex justify-between items-center pl-1">
                       <span class="text-[9px] font-bold text-slate-400 uppercase tracking-[0.2em] block">Voltage Profile</span>
                       <button @click="openModal('vPu')" class="text-[9px] font-black text-indigo-400 hover:text-indigo-600 uppercase tracking-widest transition-colors flex items-center gap-2">
                          <i class="fa-solid fa-expand"></i> Expand
                       </button>
                    </div>
                    <div class="h-44 w-full"><canvas ref="vPuCanvas"></canvas></div>
                 </div>
                 <div class="space-y-6">
                    <div class="flex justify-between items-center pl-1">
                       <span class="text-[9px] font-bold text-slate-400 uppercase tracking-[0.2em] block">Current Profile</span>
                       <button @click="openModal('iPu')" class="text-[9px] font-black text-indigo-400 hover:text-indigo-600 uppercase tracking-widest transition-colors flex items-center gap-2">
                          <i class="fa-solid fa-expand"></i> Expand
                       </button>
                    </div>
                    <div class="h-44 w-full"><canvas ref="iPuCanvas"></canvas></div>
                 </div>
              </div>
           </div>

           <!-- PHYSICAL UNIT SET -->
           <div class="space-y-10 border-t border-slate-100 pt-16">
              <div class="flex items-center gap-4">
                 <span class="w-1.5 h-6 bg-rose-500 rounded-full"></span>
                 <h3 class="text-lg font-black text-slate-900 tracking-tight italic uppercase">Physical Signal <span class="text-slate-300 font-normal ml-2 text-sm">(kV / kA)</span></h3>
              </div>

              <div class="space-y-12">
                 <div class="space-y-6">
                    <div class="flex justify-between items-center pl-1">
                       <span class="text-[9px] font-bold text-slate-400 uppercase tracking-[0.2em] block">Converted Voltage</span>
                       <button @click="openModal('vPhys')" class="text-[9px] font-black text-rose-400 hover:text-rose-600 uppercase tracking-widest transition-colors flex items-center gap-2">
                          <i class="fa-solid fa-expand"></i> Expand
                       </button>
                    </div>
                    <div class="h-44 w-full"><canvas ref="vPhysCanvas"></canvas></div>
                 </div>
                 <div class="space-y-6">
                    <div class="flex justify-between items-center pl-1">
                       <span class="text-[9px] font-bold text-slate-400 uppercase tracking-[0.2em] block">Converted Current</span>
                       <button @click="openModal('iPhys')" class="text-[9px] font-black text-rose-400 hover:text-rose-600 uppercase tracking-widest transition-colors flex items-center gap-2">
                          <i class="fa-solid fa-expand"></i> Expand
                       </button>
                    </div>
                    <div class="h-44 w-full"><canvas ref="iPhysCanvas"></canvas></div>
                 </div>
              </div>
           </div>
        </div>

        <!-- FULL SCREEN MODAL -->
        <Teleport to="body">
          <Transition name="fade">
            <div v-if="activeModal" class="fixed inset-0 z-[1000] bg-slate-900/95 backdrop-blur-xl p-6 lg:p-12 flex flex-col no-print">
               <!-- Modal Header -->
               <div class="flex items-center justify-between mb-12">
                  <div class="space-y-2">
                     <h4 class="text-2xl font-black text-white italic uppercase tracking-tighter">
                        Signal Inspection
                     </h4>
                     <p class="text-[10px] font-bold text-slate-500 uppercase tracking-[0.3em]">Deep Analysis Stage &bull; {{ activeModalLabel }}</p>
                  </div>
                  <button @click="closeModal" class="w-14 h-14 rounded-full bg-white/10 text-white hover:bg-rose-500 transition-all flex items-center justify-center group active:scale-90">
                     <i class="fa-solid fa-xmark text-xl group-hover:rotate-90 transition-transform"></i>
                  </button>
               </div>

               <!-- Modal Content (Single High-Res Chart) -->
               <div class="flex-1 bg-white/5 rounded-[3rem] p-10 border border-white/10 flex flex-col min-h-0">
                   <div class="flex-1 min-h-0"><canvas ref="modalCanvas"></canvas></div>
               </div>
            </div>
          </Transition>
        </Teleport>

        <!-- SECTION 04: PROBABILITY DISTRIBUTION -->
        <div class="space-y-8">
           <div class="flex items-center justify-between border-b border-slate-100 pb-6">
              <div class="space-y-1">
                 <h3 class="text-xs font-black text-slate-900 uppercase tracking-[0.25em]">Probabilities</h3>
                 <p class="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Model prediction breakdown</p>
              </div>
              <i class="fa-solid fa-chart-column text-slate-200 text-xl"></i>
           </div>
           
           <div class="grid grid-cols-1 sm:grid-cols-2 gap-x-16 gap-y-8">
              <div v-for="(prob, label) in topMatrix" :key="label" class="group">
                 <div class="flex justify-between items-end mb-2.5 px-1 transition-all group-hover:translate-x-1 duration-300">
                    <span class="text-[11px] font-black text-slate-500 group-hover:text-slate-900 uppercase tracking-wider">{{ label }}</span>
                    <span class="text-[10px] font-bold text-slate-400 mono group-hover:text-indigo-600">{{ (prob * 100).toFixed(1) }}%</span>
                 </div>
                 <div class="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden border border-white">
                    <div 
                      class="h-full rounded-full transition-all duration-[2s] ease-out shadow-sm"
                      :class="prob > 0.5 ? (result.detection === 'Normal' ? 'bg-emerald-500' : 'bg-rose-500') : 'bg-slate-300'"
                      :style="{ width: (prob * 100) + '%' }"
                    ></div>
                 </div>
              </div>
           </div>
        </div>

        <!-- STRATEGIC ACTIONS -->
        <div class="flex flex-col sm:flex-row justify-between items-center gap-8 pt-10 no-print">
           <button @click="$emit('dismiss')" class="text-[11px] font-black text-slate-400 hover:text-rose-600 uppercase tracking-[0.3em] px-10 py-4 transition-all">
              Discard
           </button>
           <button 
              @click="downloadReport"
              class="w-full sm:w-auto px-16 py-6 bg-slate-900 text-white rounded-[2rem] transition-all duration-500 hover:bg-indigo-600 hover:shadow-2xl hover:shadow-indigo-200 active:scale-95 text-xs font-black uppercase tracking-[0.3em] flex items-center justify-center gap-4"
           >
              <i class="fa-solid fa-file-invoice text-lg"></i>
              Report
           </button>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({ 
  result: { type: Object, required: true },
  signals: { type: Array, required: true }
})
defineEmits(['dismiss', 'export'])

const vPuCanvas = ref(null)
const iPuCanvas = ref(null)
const vPhysCanvas = ref(null)
const iPhysCanvas = ref(null)
const modalCanvas = ref(null)

const activeModal = ref(null)

let charts = []
let modalChart = null

const activeModalLabel = computed(() => {
  const map = {
    'vPu': 'Voltage Profile (p.u.)',
    'iPu': 'Current Profile (p.u.)',
    'vPhys': 'Converted Voltage (kV)',
    'iPhys': 'Converted Current (kA)'
  }
  return map[activeModal.value] || ''
})

const openModal = (chartId) => {
  activeModal.value = chartId
  document.body.style.overflow = 'hidden'
  nextTick(() => {
    initModalChart(chartId)
  })
}

const closeModal = () => {
  if (modalChart) modalChart.destroy()
  modalChart = null
  activeModal.value = null
  document.body.style.overflow = ''
}

const initModalChart = (chartId) => {
  if (typeof Chart === 'undefined') return
  if (modalChart) modalChart.destroy()

  const labels = props.signals.map(r => (r[0] * 1000).toFixed(1))
  const isVoltage = chartId.startsWith('v')
  const isPu = chartId.endsWith('Pu')
  
  const base = isPu ? 1 : (isVoltage ? 200 : 1)
  const unit = isPu ? 'p.u.' : (isVoltage ? 'kV' : 'kA')
  
  const dataStart = isVoltage ? 1 : 4
  const datasetLabels = isVoltage ? ['Va', 'Vb', 'Vc'] : ['Ia', 'Ib', 'Ic']
  const colors = ['#60a5fa', '#f87171', '#4ade80']

  modalChart = new Chart(modalCanvas.value.getContext('2d'), {
    type: 'line',
    data: {
      labels,
      datasets: datasetLabels.map((label, i) => ({
        label,
        data: props.signals.map(r => r[dataStart + i]),
        borderColor: colors[i],
        borderWidth: 3,
        pointRadius: 0,
        tension: 0.2
      }))
    },
    options: { 
      responsive: true, maintainAspectRatio: false,
      plugins: { 
        legend: { display: true, labels: { color: '#fff', font: { weight: '800' } } } 
      },
      scales: {
        x: { 
          grid: { color: 'rgba(255,255,255,0.05)', drawTicks: false }, 
          ticks: { color: 'rgba(255,255,255,0.3)', font: { size: 10, weight: '700' } } 
        },
        y: { 
           grid: { color: 'rgba(255,255,255,0.05)', drawTicks: false }, 
           ticks: { 
             color: 'rgba(255,255,255,0.5)', 
             font: { size: 10, weight: '800' },
             callback: (val) => (val * base).toFixed(isPu ? 1 : 0) + ' ' + unit
           } 
        }
      }
    }
  })
}

const initCharts = () => {
  if (typeof Chart === 'undefined') return
  charts.forEach(c => c.destroy())
  charts = []

  const V_BASE = 200 
  const I_BASE = 1   
  const labels = props.signals.map(r => (r[0] * 1000).toFixed(1))
  
  const commonScales = (unit, base) => ({
    x: { 
      grid: { color: '#f8fafc', drawTicks: false }, 
      border: { display: false },
      ticks: { color: '#cbd5e1', font: { size: 9, weight: '700' }, maxRotation: 0, padding: 10 } 
    },
    y: { 
       grid: { color: '#f8fafc', drawTicks: false }, 
       border: { display: false },
       ticks: { 
         color: '#64748b', 
         font: { size: 9, weight: '800' },
         padding: 10,
         callback: (val) => (val * base).toFixed(unit === 'p.u.' ? 1 : 0) + (unit !== 'p.u.' ? ' ' + unit : '')
       } 
    }
  })

  const createSet = (vCanv, iCanv, unit, vB, iB) => {
    const vC = new Chart(vCanv.getContext('2d'), {
      type: 'line',
      data: {
        labels,
        datasets: [
          { label: 'Va', data: props.signals.map(r => r[1]), borderColor: '#0055aa', borderWidth: 2, pointRadius: 0, tension: 0.2 },
          { label: 'Vb', data: props.signals.map(r => r[2]), borderColor: '#ee0000', borderWidth: 2, pointRadius: 0, tension: 0.2 },
          { label: 'Vc', data: props.signals.map(r => r[3]), borderColor: '#00aa00', borderWidth: 2, pointRadius: 0, tension: 0.2 }
        ]
      },
      options: { 
        responsive: true, 
        maintainAspectRatio: false, 
        layout: { padding: { left: 0, right: 10, top: 10, bottom: 0 } },
        plugins: { legend: { display: false } }, 
        scales: commonScales(unit, vB) 
      }
    })

    const iC = new Chart(iCanv.getContext('2d'), {
      type: 'line',
      data: {
        labels,
        datasets: [
          { label: 'Ia', data: props.signals.map(r => r[4]), borderColor: '#0055aa', borderWidth: 2, pointRadius: 0, tension: 0.2 },
          { label: 'Ib', data: props.signals.map(r => r[5]), borderColor: '#ee0000', borderWidth: 2, pointRadius: 0, tension: 0.2 },
          { label: 'Ic', data: props.signals.map(r => r[6]), borderColor: '#00aa00', borderWidth: 2, pointRadius: 0, tension: 0.2 }
        ]
      },
      options: { 
        responsive: true, 
        maintainAspectRatio: false, 
        layout: { padding: { left: 0, right: 10, top: 10, bottom: 0 } },
        plugins: { legend: { display: false } }, 
        scales: commonScales(unit, iB) 
      }
    })
    charts.push(vC, iC)
  }

  if (vPuCanvas.value && iPuCanvas.value) createSet(vPuCanvas.value, iPuCanvas.value, 'p.u.', 1, 1)
  if (vPhysCanvas.value && iPhysCanvas.value) createSet(vPhysCanvas.value, iPhysCanvas.value, 'kV', V_BASE, I_BASE)
}

onMounted(() => {
  setTimeout(() => initCharts(), 100)
})

onUnmounted(() => {
  charts.forEach(c => c.destroy())
})

const downloadReport = () => {
  const timestamp = new Date().toLocaleString()
  const content = `
=========================================
FAULTGUARD AI - DIAGNOSTIC REPORT
=========================================
Date: ${timestamp}
-----------------------------------------
VERDICT:   ${props.result.detection.toUpperCase()}
CERTAINTY: ${(props.result.confidence * 100).toFixed(2)}%
TYPE:      ${props.result.classification}
LOCATION:  ${props.result.fault_location_km} KM
-----------------------------------------

Generated by 1D-CNN Fault Detection System
=========================================
`
  const blob = new Blob([content], { type: 'text/plain' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = `FaultGuard_Report_${props.result.classification.replace(/ /g, '_')}.txt`
  link.click()
  URL.revokeObjectURL(url)
}

const topMatrix = computed(() => {
  if (!props.result?.classification_detail) return {}
  return Object.entries(props.result.classification_detail)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 10)
    .reduce((obj, [key, val]) => ({ ...obj, [key]: val }), {})
})
</script>

<style scoped>
.mono { font-family: 'JetBrains Mono', monospace; }
</style>
