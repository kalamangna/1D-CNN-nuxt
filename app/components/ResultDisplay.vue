<template>
  <div class="animate-in fade-in zoom-in-95 duration-700">
    <div class="relative bg-white border border-slate-200 rounded-[3rem] p-8 lg:p-16 shadow-2xl shadow-slate-200/50 overflow-hidden">
      
      <!-- Subtle Glow Background -->
      <div 
        :class="result.detection === 'Normal' ? 'bg-emerald-500/5' : 'bg-rose-500/5'"
        class="absolute -top-24 -right-24 w-96 h-96 blur-[120px] pointer-events-none rounded-full"
      ></div>

      <div class="relative z-10 space-y-12">
        
        <!-- SECTION 01: PRIMARY DIAGNOSIS -->
        <div class="flex flex-col lg:flex-row lg:items-end justify-between gap-12 border-b border-slate-100 pb-12">
          <div class="space-y-6 flex-1">
            <div class="flex items-center gap-3">
              <div :class="result.detection === 'Normal' ? 'bg-emerald-500' : 'bg-rose-500'" class="w-2.5 h-3 rounded-full animate-pulse shadow-lg"></div>
              <span class="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">System Status</span>
            </div>
            <div class="space-y-2">
              <h2 
                :class="result.detection === 'Normal' ? 'text-emerald-600' : 'text-rose-600'"
                class="text-4xl md:text-5xl lg:text-6xl font-[1000] tracking-tighter leading-none uppercase italic break-all"
              >
                {{ result.detection === 'Normal' ? 'NORMAL' : 'FAULT' }}
              </h2>
              <p class="text-sm font-bold text-slate-400 max-w-lg leading-relaxed">
                {{ result.detection === 'Normal' 
                    ? 'The AI model has determined that the system is operating within standard parameters. No anomalies detected in the provided signal window.' 
                    : `A fault condition has been identified as ${result.classification}. The anomaly originated at ${result.fault_location_km} KM from the monitoring station.` 
                }}
              </p>
            </div>
          </div>

          <div class="flex shrink-0">
             <div class="bg-slate-900 rounded-[2.5rem] p-8 px-10 text-white shadow-2xl relative overflow-hidden group">
                <div class="absolute -right-4 -top-4 w-24 h-24 bg-white/5 rounded-full blur-2xl group-hover:bg-indigo-500/20 transition-all duration-700"></div>
                <span class="text-[9px] font-black text-slate-500 uppercase tracking-widest block mb-2">Model Certainty</span>
                <p class="text-5xl font-black tracking-tighter mono relative z-10">
                   {{ (result.confidence * 100).toFixed(1) }}<span class="text-2xl text-slate-600 ml-1">%</span>
                </p>
             </div>
          </div>
        </div>

        <!-- SECTION 02: ANALYTICAL PARAMETERS -->
        <div 
          :class="{
            'lg:grid-cols-3': result.detection !== 'Normal',
            'lg:grid-cols-1 max-w-sm': result.detection === 'Normal'
          }"
          class="grid grid-cols-1 sm:grid-cols-2 gap-6"
        >
           <!-- Classification Card -->
           <div class="p-8 rounded-[2.5rem] bg-white border border-slate-200 shadow-sm flex items-center justify-between transition-all hover:shadow-xl hover:-translate-y-1 group">
              <div class="space-y-1">
                 <span class="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Classification</span>
                 <p class="text-xl font-black text-slate-900 tracking-tight uppercase italic">{{ result.classification }}</p>
              </div>
              <div class="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-all">
                 <i class="fa-solid fa-fingerprint text-xl opacity-20 group-hover:opacity-100"></i>
              </div>
           </div>

           <!-- Location Card -->
           <div v-if="result.detection !== 'Normal'" class="p-8 rounded-[2.5rem] bg-white border border-slate-200 shadow-sm flex items-center justify-between transition-all hover:shadow-xl hover:-translate-y-1 group">
              <div class="space-y-1">
                 <span class="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Fault Distance</span>
                 <p class="text-xl font-black text-slate-900 tracking-tight uppercase">
                    {{ result.fault_location_km !== 'N/A' ? result.fault_location_km : '--' }} 
                    <span class="text-lg text-slate-300 ml-1">KM</span>
                 </p>
              </div>
              <div class="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center group-hover:bg-rose-50 group-hover:text-rose-600 transition-all">
                 <i class="fa-solid fa-location-dot text-xl opacity-20 group-hover:opacity-100"></i>
              </div>
           </div>

           <!-- Inception Time Card -->
           <div v-if="result.detection !== 'Normal'" class="p-8 rounded-[2.5rem] bg-white border border-slate-200 shadow-sm flex items-center justify-between transition-all hover:shadow-xl hover:-translate-y-1 group sm:col-span-2 lg:col-span-1">
              <div class="space-y-1">
                 <span class="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Inception Time</span>
                 <p class="text-xl font-black text-slate-900 tracking-tight uppercase">
                    {{ result.fault_time_s !== 'N/A' ? (result.fault_time_s * 1000).toFixed(1) : '--' }}
                    <span class="text-lg text-slate-300 ml-1">MS</span>
                 </p>
              </div>
              <div class="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center group-hover:bg-amber-50 group-hover:text-amber-600 transition-all">
                 <i class="fa-solid fa-stopwatch text-xl opacity-20 group-hover:opacity-100"></i>
              </div>
           </div>
        </div>

        <!-- SECTION 03: VISUALIZATION HUB -->
        <div class="space-y-10">
           <div class="flex items-center justify-between">
              <div class="flex items-center gap-4">
                 <span class="w-2 h-2 bg-indigo-500 rounded-full"></span>
                 <h3 class="text-xs font-black text-slate-900 tracking-[0.2em] uppercase">Signal Analysis</h3>
              </div>
              <div class="flex gap-2">
                 <div class="flex items-center gap-2 px-3 py-1 bg-blue-50 text-[9px] font-bold text-blue-600 rounded-full border border-blue-100">
                    <span class="w-1.5 h-1.5 bg-blue-600 rounded-full"></span> PH-A
                 </div>
                 <div class="flex items-center gap-2 px-3 py-1 bg-red-50 text-[9px] font-bold text-red-600 rounded-full border border-red-100">
                    <span class="w-1.5 h-1.5 bg-red-600 rounded-full"></span> PH-B
                 </div>
                 <div class="flex items-center gap-2 px-3 py-1 bg-green-50 text-[9px] font-bold text-green-600 rounded-full border border-green-100">
                    <span class="w-1.5 h-1.5 bg-green-600 rounded-full"></span> PH-C
                 </div>
              </div>
           </div>

           <div class="grid grid-cols-1 gap-12">
              <!-- PER UNIT SET -->
              <div class="p-8 lg:p-12 bg-slate-50/50 rounded-[3rem] border border-slate-100 space-y-10">
                 <div class="flex justify-between items-center">
                    <div class="flex items-center gap-4">
                       <span class="w-1.5 h-6 bg-indigo-500 rounded-full"></span>
                       <h4 class="text-sm font-black text-slate-900 uppercase tracking-widest italic">Normalized Signal <span class="text-slate-400 font-normal ml-2 text-xs">(p.u.)</span></h4>
                    </div>
                    <div class="flex gap-4">
                       <button @click="openModal('vPu')" class="w-10 h-10 rounded-full bg-white border border-slate-200 text-slate-400 hover:text-indigo-600 transition-all flex items-center justify-center shadow-sm"><i class="fa-solid fa-bolt-lightning text-xs"></i></button>
                       <button @click="openModal('iPu')" class="w-10 h-10 rounded-full bg-white border border-slate-200 text-slate-400 hover:text-indigo-600 transition-all flex items-center justify-center shadow-sm"><i class="fa-solid fa-wave-square text-xs"></i></button>
                    </div>
                 </div>
                 <div class="grid grid-cols-1 gap-10">
                    <div class="h-64 w-full"><canvas ref="vPuCanvas"></canvas></div>
                    <div class="h-64 w-full border-t border-slate-200/50 pt-10"><canvas ref="iPuCanvas"></canvas></div>
                 </div>
              </div>

              <!-- PHYSICAL UNIT SET -->
              <div class="p-8 lg:p-12 bg-slate-50/50 rounded-[3rem] border border-slate-100 space-y-10">
                 <div class="flex justify-between items-center">
                    <div class="flex items-center gap-4">
                       <span class="w-1.5 h-6 bg-rose-500 rounded-full"></span>
                       <h4 class="text-sm font-black text-slate-900 uppercase tracking-widest italic">Physical Signal <span class="text-slate-400 font-normal ml-2 text-xs">(kV / kA)</span></h4>
                    </div>
                    <div class="flex gap-4">
                       <button @click="openModal('vPhys')" class="w-10 h-10 rounded-full bg-white border border-slate-200 text-slate-400 hover:text-rose-600 transition-all flex items-center justify-center shadow-sm"><i class="fa-solid fa-bolt-lightning text-xs"></i></button>
                       <button @click="openModal('iPhys')" class="w-10 h-10 rounded-full bg-white border border-slate-200 text-slate-400 hover:text-rose-600 transition-all flex items-center justify-center shadow-sm"><i class="fa-solid fa-wave-square text-xs"></i></button>
                    </div>
                 </div>
                 <div class="grid grid-cols-1 gap-10">
                    <div class="h-64 w-full"><canvas ref="vPhysCanvas"></canvas></div>
                    <div class="h-64 w-full border-t border-slate-200/50 pt-10"><canvas ref="iPhysCanvas"></canvas></div>
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
import { Chart, registerables } from 'chart.js'
Chart.register(...registerables)

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
    if (!vCanv || !iCanv) return

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
  // Wait for the transition animation to complete (approx 600ms-800ms)
  setTimeout(() => initCharts(), 800)
})

watch(() => props.signals, () => {
  nextTick(() => initCharts())
}, { deep: true })

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
