<template>
  <div class="min-h-screen p-8 lg:p-12 bg-[#fafafa] relative overflow-hidden">
    
    <!-- Floating Header -->
    <header class="max-w-6xl mx-auto flex justify-between items-center mb-16 no-print">
       <NuxtLink to="/" class="group flex items-center gap-3 px-5 py-2.5 bg-white border border-slate-200 rounded-full shadow-sm hover:shadow-md transition-all active:scale-95">
          <i class="fa-solid fa-arrow-left text-[10px] text-slate-400 group-hover:text-indigo-600"></i>
          <span class="text-[11px] font-bold text-slate-500 uppercase tracking-widest group-hover:text-slate-900">Home</span>
       </NuxtLink>
       <BackendStatus />
    </header>

    <div class="max-w-6xl mx-auto space-y-12 animate-in fade-in zoom-in-95 duration-700">
      
      <!-- Page Title -->
      <div class="text-center space-y-4">
         <h1 class="text-5xl font-black tracking-tighter text-slate-900 uppercase">Metrics</h1>
         <p class="text-slate-400 font-bold uppercase tracking-[0.3em] text-xs leading-relaxed">
            AI Model Performance
         </p>
      </div>

      <!-- Stat Grid -->
      <div v-if="metrics" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 lg:gap-6">
         <div v-for="(obj, key) in metricCards" :key="key" class="bg-white rounded-3xl p-6 lg:p-8 border border-slate-200 shadow-xl shadow-slate-200/40">
            <p class="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3 whitespace-nowrap">{{ key }}</p>
            <p class="text-3xl lg:text-4xl font-black text-slate-900 tracking-tighter">
               {{ obj.unit === '%' ? (obj.val * 100).toFixed(1) : obj.val.toFixed(2) }}<span class="text-lg lg:text-xl text-slate-300 font-bold ml-1">{{ obj.unit }}</span>
            </p>
         </div>
      </div>

      <!-- Test Set Breakdown -->
      <section v-if="metrics" class="bg-white rounded-[3rem] border border-slate-200 shadow-2xl overflow-hidden animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">
         <div class="px-10 py-8 border-b border-slate-100 bg-slate-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
               <h3 class="text-xs font-black text-slate-900 uppercase tracking-[0.2em] mb-1">Test Set Analysis</h3>
               <p class="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Detailed breakdown of the 15% unseen data ({{ metrics.total_samples }} samples)</p>
            </div>
            <div class="px-5 py-2 bg-slate-900 text-white rounded-full text-[10px] font-black uppercase tracking-widest">
               Total Samples: {{ metrics.total_samples }}
            </div>
         </div>
         
         <div class="p-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
            <!-- TP -->
            <div class="space-y-4">
               <div class="flex items-center gap-3">
                  <div class="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100">
                     <i class="fa-solid fa-check-double text-xs"></i>
                  </div>
                  <span class="text-[10px] font-black text-slate-400 uppercase tracking-widest">True Positives</span>
               </div>
               <div class="space-y-1">
                  <p class="text-4xl font-black text-slate-900 tracking-tighter">{{ metrics.cm.tp }}</p>
                  <p class="text-[10px] text-slate-400 font-bold uppercase leading-relaxed">Correctly identified faults</p>
               </div>
            </div>

            <!-- TN -->
            <div class="space-y-4">
               <div class="flex items-center gap-3">
                  <div class="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100">
                     <i class="fa-solid fa-shield-halved text-xs"></i>
                  </div>
                  <span class="text-[10px] font-black text-slate-400 uppercase tracking-widest">True Negatives</span>
               </div>
               <div class="space-y-1">
                  <p class="text-4xl font-black text-slate-900 tracking-tighter">{{ metrics.cm.tn }}</p>
                  <p class="text-[10px] text-slate-400 font-bold uppercase leading-relaxed">Correctly identified normal states</p>
               </div>
            </div>

            <!-- FP -->
            <div class="space-y-4">
               <div class="flex items-center gap-3">
                  <div class="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center border border-amber-100">
                     <i class="fa-solid fa-bell-slash text-xs"></i>
                  </div>
                  <span class="text-[10px] font-black text-slate-400 uppercase tracking-widest">False Positives</span>
               </div>
               <div class="space-y-1">
                  <p class="text-4xl font-black text-slate-900 tracking-tighter">{{ metrics.cm.fp }}</p>
                  <p class="text-[10px] text-slate-400 font-bold uppercase leading-relaxed">Normal states mistaken as faults</p>
               </div>
            </div>

            <!-- FN -->
            <div class="space-y-4">
               <div class="flex items-center gap-3">
                  <div class="w-8 h-8 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center border border-rose-100">
                     <i class="fa-solid fa-radiation text-xs"></i>
                  </div>
                  <span class="text-[10px] font-black text-slate-400 uppercase tracking-widest">False Negatives</span>
               </div>
               <div class="space-y-1">
                  <p class="text-4xl font-black text-slate-900 tracking-tighter">{{ metrics.cm.fn }}</p>
                  <p class="text-[10px] text-slate-400 font-bold uppercase leading-relaxed">Missed critical faults</p>
               </div>
            </div>
         </div>
      </section>

      <!-- Main Visuals -->
      <div class="space-y-10">
         
         <!-- Top Row: Confusion Matrices -->
         <div class="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <!-- Binary Confusion Matrix (PNG) -->
            <section class="bg-white rounded-[3rem] border border-slate-200 shadow-2xl overflow-hidden">
               <div class="px-10 py-6 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
                  <h3 class="text-xs font-bold text-slate-900 uppercase tracking-widest">Binary Confusion Matrix</h3>
                  <i class="fa-solid fa-toggle-on text-slate-300"></i>
               </div>
               <div class="p-8 space-y-4">
                  <img 
                    src="/results/binary_confusion_matrix.png" 
                    alt="Binary Confusion Matrix" 
                    class="w-full h-auto rounded-2xl border border-slate-100 shadow-sm cursor-zoom-in hover:scale-[1.02] transition-transform duration-500"
                    @click="openImage('/results/binary_confusion_matrix.png')"
                  >
                  <p class="text-[11px] text-slate-500 leading-relaxed font-medium">Visualization of the model's overall performance in distinguishing between Normal and Fault conditions.</p>
               </div>
            </section>

            <!-- Multi-Class Confusion Matrix (PNG) -->
            <section class="bg-white rounded-[3rem] border border-slate-200 shadow-2xl overflow-hidden">
               <div class="px-10 py-6 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
                  <h3 class="text-xs font-bold text-slate-900 uppercase tracking-widest">Classification Matrix</h3>
                  <i class="fa-solid fa-braille text-slate-300"></i>
               </div>
               <div class="p-8 space-y-4">
                  <img 
                    src="/results/confusion_matrix.png" 
                    alt="Multi-Class Confusion Matrix" 
                    class="w-full h-auto rounded-2xl border border-slate-100 shadow-sm cursor-zoom-in hover:scale-[1.02] transition-transform duration-500"
                    @click="openImage('/results/confusion_matrix.png')"
                  >
                  <p class="text-[11px] text-slate-500 leading-relaxed font-medium">Detailed prediction accuracy for each specific fault type (e.g., A-G, B-C, 3PH).</p>
               </div>
            </section>
         </div>

         <!-- Bottom Row: Training Curves & Context -->
         <div class="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <!-- Training Curves (PNG) -->
            <section class="bg-white rounded-[3rem] border border-slate-200 shadow-2xl overflow-hidden">
               <div class="px-10 py-6 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
                  <h3 class="text-xs font-bold text-slate-900 uppercase tracking-widest">Training Curves</h3>
                  <i class="fa-solid fa-chart-line text-slate-300"></i>
               </div>
               <div class="p-8 space-y-4">
                  <img 
                    src="/results/training_curves.png" 
                    alt="Training Curves" 
                    class="w-full h-auto rounded-2xl border border-slate-100 shadow-sm cursor-zoom-in hover:scale-[1.02] transition-transform duration-500"
                    @click="openImage('/results/training_curves.png')"
                  >
                  <p class="text-[11px] text-slate-500 leading-relaxed font-medium">Comparison graphs of Loss and Accuracy between Training and Validation data to monitor model stability and convergence.</p>
               </div>
            </section>

            <!-- Metric Explanation -->
            <section class="bg-slate-900 rounded-[3rem] p-10 lg:p-12 text-white shadow-2xl relative overflow-hidden">
               <div class="absolute -right-20 -bottom-20 w-64 h-64 bg-indigo-500/10 rounded-full blur-[80px]"></div>
               
               <h3 class="text-xs font-bold text-indigo-400 uppercase tracking-widest mb-10">Context</h3>
               
               <div class="space-y-10 relative z-10">
                  <div class="space-y-3 border-l-2 border-emerald-500/30 pl-6">
                     <h4 class="text-sm font-bold text-emerald-400 uppercase tracking-widest">Why Recall Matters</h4>
                     <p class="text-slate-400 text-sm leading-relaxed italic">
                        "Missing a real fault is critical. We prioritize catching every fault to prevent hardware failure."
                     </p>
                  </div>

                  <div class="space-y-6">
                     <div class="flex gap-6 group transition-all">
                        <div class="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-all">
                           <i class="fa-solid fa-bell-slash text-rose-400"></i>
                        </div>
                        <div>
                           <h5 class="text-sm font-bold uppercase tracking-tight mb-1">False Alarms (FP)</h5>
                           <p class="text-xs text-slate-500 leading-relaxed max-w-xs">AI predicts a fault, but the system is Normal. Causes unnecessary checks.</p>
                        </div>
                     </div>

                     <div class="flex gap-6 group transition-all">
                        <div class="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-all">
                           <i class="fa-solid fa-radiation text-rose-500"></i>
                        </div>
                        <div>
                           <h5 class="text-sm font-bold uppercase tracking-tight mb-1 text-rose-400 underline decoration-rose-500/30 underline-offset-4">Missed Faults (FN)</h5>
                           <p class="text-xs text-slate-500 leading-relaxed max-w-xs">A real fault is missed. Can lead to severe damage.</p>
                        </div>
                     </div>
                  </div>
               </div>
            </section>
         </div>

      </div>
    </div>

    <!-- Full Screen Image Modal -->
    <Teleport to="body">
      <Transition name="fade">
        <div v-if="selectedImage" class="fixed inset-0 z-[1000] bg-slate-900/95 backdrop-blur-2xl p-6 lg:p-20 flex items-center justify-center no-print cursor-zoom-out" @click="closeImage">
           <img 
            :src="selectedImage" 
            class="max-w-full max-h-full rounded-[2rem] shadow-2xl animate-in zoom-in-95 duration-300" 
            @click.stop
           >
           <button @click="closeImage" class="absolute top-10 right-10 w-14 h-14 rounded-full bg-white/10 text-white hover:bg-rose-500 transition-all flex items-center justify-center group">
              <i class="fa-solid fa-xmark text-xl group-hover:rotate-90 transition-transform"></i>
           </button>
        </div>
      </Transition>
    </Teleport>

  </div>
</template>

<script setup>
const { getMetrics, API_BASE_URL } = useApi()
const metrics = ref(null)
const selectedImage = ref(null)

const openImage = (url) => {
  selectedImage.value = url
  document.body.style.overflow = 'hidden'
}

const closeImage = () => {
  selectedImage.value = null
  document.body.style.overflow = ''
}

onMounted(async () => {
  try {
    metrics.value = await getMetrics()
  } catch (e) {
    console.error('Failed to load metrics')
  }
})

const metricCards = computed(() => {
  if (!metrics.value) return {}
  return {
    "Detection Acc.": { val: metrics.value.accuracy, unit: '%' },
    "Class. Acc.": { val: metrics.value.classification_accuracy, unit: '%' },
    "Precision": { val: metrics.value.precision, unit: '%' },
    "Recall": { val: metrics.value.recall, unit: '%' },
    "F1-Score": { val: metrics.value.f1_score, unit: '%' },
    "Dist. Error": { val: metrics.value.location_rmse, unit: 'KM' }
  }
})
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
