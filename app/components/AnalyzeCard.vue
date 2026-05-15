<template>
  <div class="bg-white rounded-[2.5rem] border border-slate-200 shadow-2xl shadow-slate-200/50 overflow-hidden transition-all duration-500">
    <div class="px-10 py-7 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
      <div class="flex items-center gap-4">
        <div class="w-9 h-9 bg-slate-900 rounded-xl flex items-center justify-center text-white shadow-lg">
          <i class="fa-solid fa-microscope text-sm"></i>
        </div>
        <div>
          <span class="text-[10px] font-bold text-slate-400 uppercase tracking-widest block leading-none mb-1">Module 01</span>
          <h2 class="text-sm font-bold text-slate-800 uppercase tracking-tight">{{ title }}</h2>
        </div>
      </div>
      <div v-if="hasData" class="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-100 text-[9px] font-bold text-emerald-600 uppercase tracking-widest">
         <div class="w-1 h-1 rounded-full bg-emerald-500 animate-pulse"></div>
         Ready
      </div>
    </div>

    <div class="p-10 lg:p-14 space-y-8">
      <div 
        class="relative border-2 border-dashed border-slate-200 rounded-[2.5rem] p-16 transition-all duration-500 hover:border-indigo-400 group cursor-pointer bg-slate-50/30 hover:bg-white overflow-hidden"
        :class="{'border-indigo-400 bg-indigo-50/20': hasData}"
        @click="$emit('triggerFile')"
      >
        <div class="text-center relative z-10">
          <div class="mx-auto h-20 w-20 bg-white rounded-3xl shadow-xl shadow-slate-200/40 border border-slate-100 flex items-center justify-center mb-6 group-hover:-translate-y-1 transition-all">
            <i v-if="!hasData" class="fa-solid fa-cloud-arrow-up text-3xl text-slate-300 group-hover:text-indigo-500 transition-colors"></i>
            <i v-else class="fa-solid fa-check text-3xl text-emerald-500"></i>
          </div>
          <h3 class="text-xl font-bold text-slate-800 tracking-tight leading-tight">{{ fileName || 'CSV Input' }}</h3>
          <p class="text-xs text-slate-400 font-bold uppercase tracking-widest mt-2 opacity-60">200x7 Samples Matrix</p>
        </div>
      </div>

      <div class="flex flex-col sm:flex-row gap-4">
        <button 
          @click="$emit('analyze')" 
          :disabled="!hasData"
          class="w-full bg-slate-900 hover:bg-indigo-600 disabled:bg-slate-50 disabled:text-slate-300 text-white font-bold py-5 rounded-2xl transition-all shadow-xl shadow-slate-200 active:scale-[0.95] text-xs uppercase tracking-widest flex items-center justify-center gap-4"
        >
          <i class="fa-solid fa-bolt-lightning"></i>
          Analyze
        </button>
        
        <div v-if="!hasData" class="w-full flex gap-2">
          <button 
            @click="$emit('loadTest', 'normal')" 
            class="flex-1 bg-white border border-slate-200 hover:border-emerald-400 text-slate-500 hover:text-emerald-600 font-bold py-5 rounded-2xl transition-all shadow-sm active:scale-[0.95] text-[10px] uppercase tracking-widest flex flex-col items-center justify-center gap-2 group"
          >
            <i class="fa-solid fa-shield-halved text-sm group-hover:scale-110 transition-transform"></i>
            Normal Data
          </button>
          <button 
            @click="$emit('loadTest', 'fault')" 
            class="flex-1 bg-white border border-slate-200 hover:border-rose-400 text-slate-500 hover:text-rose-600 font-bold py-5 rounded-2xl transition-all shadow-sm active:scale-[0.95] text-[10px] uppercase tracking-widest flex flex-col items-center justify-center gap-2 group"
          >
            <i class="fa-solid fa-radiation text-sm group-hover:scale-110 transition-transform"></i>
            Fault Data
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({ title: String, hasData: Boolean, fileName: String })
defineEmits(['triggerFile', 'analyze', 'loadTest'])
</script>
