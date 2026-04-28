<template>
  <div class="animate-in fade-in zoom-in-95 duration-700">
    <div class="relative overflow-hidden bg-white border border-slate-200 rounded-[2.5rem] p-8 lg:p-12 shadow-2xl shadow-slate-200/50">
      
      <!-- Subtle Ambient Glow -->
      <div 
        :class="result.status === 'Normal' ? 'bg-emerald-500/5' : 'bg-rose-500/5'"
        class="absolute -inset-10 z-0 blur-[100px] pointer-events-none"
      ></div>

      <div class="relative z-10 space-y-12">
        
        <!-- Top Section: Status and Certainty -->
        <div class="flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div class="space-y-2">
            <div class="flex items-center gap-3">
              <div :class="result.status === 'Normal' ? 'bg-emerald-500' : 'bg-rose-500'" class="w-2 h-2 rounded-full animate-pulse shadow-[0_0_10px_rgba(0,0,0,0.1)]"></div>
              <span class="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Neural Verdict</span>
            </div>
            <h2 
              :class="result.status === 'Normal' ? 'text-emerald-600' : 'text-rose-600'"
              class="text-5xl lg:text-7xl font-[900] tracking-tighter leading-none uppercase italic"
            >
              {{ result.status === 'Normal' ? 'NORMAL' : 'FAULT' }}
            </h2>
          </div>

          <div class="bg-slate-50 border border-slate-100 rounded-3xl p-6 px-8 text-center md:text-right min-w-[200px]">
             <span class="text-[9px] font-bold text-slate-400 uppercase tracking-widest block mb-1">Confidence Score</span>
             <p class="text-4xl lg:text-5xl font-black text-slate-900 tracking-tighter mono">
                {{ (result.confidence * 100).toFixed(1) }}<span class="text-xl text-slate-300 ml-1">%</span>
             </p>
          </div>
        </div>

        <!-- Metric Details Row -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
           <div class="p-6 rounded-2xl bg-slate-50/50 border border-slate-100 flex items-center justify-between transition-all hover:bg-white hover:shadow-xl hover:shadow-slate-100/50 group">
              <div>
                 <span class="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1 block">Fault Signature</span>
                 <p class="text-2xl font-black text-slate-800 tracking-tight uppercase">{{ result.status === 'Normal' ? 'NONE' : result.fault_type }}</p>
              </div>
              <i class="fa-solid fa-fingerprint text-slate-200 text-2xl group-hover:text-indigo-500 transition-colors"></i>
           </div>
           <div class="p-6 rounded-2xl bg-slate-50/50 border border-slate-100 flex items-center justify-between transition-all hover:bg-white hover:shadow-xl hover:shadow-slate-100/50 group">
              <div>
                 <span class="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1 block">Fault Position</span>
                 <p class="text-2xl font-black text-slate-800 tracking-tight uppercase">{{ result.status === 'Normal' ? '0%' : result.fault_severity }}</p>
              </div>
              <i class="fa-solid fa-gauge-high text-slate-200 text-2xl group-hover:text-rose-500 transition-colors"></i>
           </div>
           <div class="p-6 rounded-2xl bg-slate-50/50 border border-slate-100 flex items-center justify-between transition-all hover:bg-white hover:shadow-xl hover:shadow-slate-100/50 group">
              <div>
                 <span class="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1 block">Physical Distance</span>
                 <p class="text-2xl font-black text-slate-800 tracking-tight uppercase">{{ result.status === 'Normal' ? '0.00 km' : result.fault_location_km + ' km' }}</p>
              </div>
              <i class="fa-solid fa-location-dot text-slate-200 text-2xl group-hover:text-amber-500 transition-colors"></i>
           </div>
        </div>

        <!-- Waveform Visualization (Moved to Result Card) -->
        <div class="space-y-6">
           <div class="flex items-center justify-between border-b border-slate-100 pb-4">
              <h3 class="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Analyzed Phase Signature</h3>
              <div class="flex flex-wrap gap-x-4 gap-y-2">
                 <div class="flex items-center gap-2"><div class="w-1.5 h-1.5 rounded-full bg-indigo-500"></div><span class="text-[9px] font-black text-slate-400 uppercase">Va</span></div>
                 <div class="flex items-center gap-2"><div class="w-1.5 h-1.5 rounded-full bg-emerald-500"></div><span class="text-[9px] font-black text-slate-400 uppercase">Vb</span></div>
                 <div class="flex items-center gap-2"><div class="w-1.5 h-1.5 rounded-full bg-rose-500"></div><span class="text-[9px] font-black text-slate-400 uppercase">Vc</span></div>
                 <div class="flex items-center gap-2 border-l border-slate-100 pl-4"><div class="w-1.5 h-1.5 rounded-full bg-indigo-300"></div><span class="text-[9px] font-black text-slate-400 uppercase">Ia</span></div>
                 <div class="flex items-center gap-2"><div class="w-1.5 h-1.5 rounded-full bg-emerald-300"></div><span class="text-[9px] font-black text-slate-400 uppercase">Ib</span></div>
                 <div class="flex items-center gap-2"><div class="w-1.5 h-1.5 rounded-full bg-rose-300"></div><span class="text-[9px] font-black text-slate-400 uppercase">Ic</span></div>
              </div>
           </div>
           <div class="h-56 w-full px-2">
              <canvas ref="chartCanvas"></canvas>
           </div>
        </div>

        <!-- Fine-grained Analysis (Probability Matrix) -->
        <div class="space-y-6">
           <div class="flex items-center justify-between border-b border-slate-100 pb-4">
              <h3 class="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Neural Probability Distribution</h3>
              <span class="text-[9px] font-bold text-slate-300 uppercase italic">Detailed Inference</span>
           </div>
           
           <div class="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-6">
              <div v-for="(prob, label) in topMatrix" :key="label" class="group">
                 <div class="flex justify-between items-end mb-2 px-1 transition-all group-hover:translate-x-1 duration-300">
                    <span class="text-[11px] font-bold text-slate-500 group-hover:text-slate-900 uppercase tracking-wider">{{ label }}</span>
                    <span class="text-[10px] font-bold text-slate-400 mono group-hover:text-indigo-600">{{ (prob * 100).toFixed(1) }}%</span>
                 </div>
                 <div class="w-full bg-slate-50 h-1 rounded-full overflow-hidden border border-slate-100">
                    <div 
                      class="h-full rounded-full transition-all duration-[1.5s] ease-out"
                      :class="prob > 0.5 ? (result.status === 'Normal' ? 'bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.4)]' : 'bg-rose-500 shadow-[0_0_10px_rgba(244,63,94,0.4)]') : 'bg-slate-200'"
                      :style="{ width: (prob * 100) + '%' }"
                    ></div>
                 </div>
              </div>
           </div>
        </div>

        <!-- Strategic Actions -->
        <div class="flex flex-col sm:flex-row justify-between items-center gap-6 pt-6 no-print">
           <button @click="$emit('dismiss')" class="order-2 sm:order-1 text-[11px] font-bold text-slate-400 hover:text-rose-600 uppercase tracking-widest px-6 py-2 transition-all">
              Discard Result
           </button>
           <button @click="$emit('export')" class="order-1 sm:order-2 w-full sm:w-auto px-10 py-4 bg-slate-900 text-white rounded-2xl transition-all duration-500 hover:bg-indigo-600 hover:shadow-2xl hover:shadow-indigo-200 active:scale-95 text-xs font-bold uppercase tracking-[0.2em]">
              Download Report
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

const chartCanvas = ref(null)
let chartInstance = null

const initChart = () => {
  if (typeof Chart === 'undefined' || !chartCanvas.value) return
  if (chartInstance) chartInstance.destroy()

  const ctx = chartCanvas.value.getContext('2d')
  chartInstance = new Chart(ctx, {
    type: 'line',
    data: {
      labels: Array.from({ length: 200 }, (_, i) => i),
      datasets: [
        { label: 'Va', data: props.signals.map(r => r[0]), borderColor: '#6366f1', borderWidth: 2, pointRadius: 0, tension: 0.4 },
        { label: 'Vb', data: props.signals.map(r => r[1]), borderColor: '#10b981', borderWidth: 2, pointRadius: 0, tension: 0.4 },
        { label: 'Vc', data: props.signals.map(r => r[2]), borderColor: '#f43f5e', borderWidth: 2, pointRadius: 0, tension: 0.4 }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: { 
        x: { display: false }, 
        y: { 
          grid: { color: 'rgba(241, 245, 249, 0.8)' },
          ticks: { color: '#cbd5e1', font: { size: 9, weight: 'bold' } }
        } 
      }
    }
  })
}

onMounted(() => {
  initChart()
})

onUnmounted(() => {
  if (chartInstance) chartInstance.destroy()
})

const topMatrix = computed(() => {
  if (!props.result?.classification_detail) return {}
  const rawEntries = Object.entries(props.result.classification_detail)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 6)
  
  return Object.fromEntries(
    rawEntries.map(([label, prob]) => {
      const formattedLabel = label.replace('_', ' at ') + (label.includes('_') ? '%' : '')
      return [formattedLabel, prob]
    })
  )
})
</script>
