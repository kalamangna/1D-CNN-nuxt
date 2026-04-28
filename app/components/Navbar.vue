<template>
  <header class="h-20 bg-white/80 backdrop-blur-xl border-b border-slate-200/60 px-6 sm:px-10 flex items-center justify-between sticky top-0 z-40 no-print">
    <div class="flex items-center gap-4 sm:gap-6">
      <button @click="$emit('openMenu')" class="lg:hidden w-11 h-11 bg-slate-100 rounded-xl flex items-center justify-center text-slate-600 hover:bg-indigo-50 hover:text-indigo-600 transition-all">
         <i class="fa-solid fa-bars-staggered text-lg"></i>
      </button>
      
      <h1 class="text-xs sm:text-sm font-black text-slate-800 tracking-widest uppercase flex items-center gap-2 sm:gap-3 truncate">
        <span class="hidden sm:inline-block w-1.5 h-1.5 rounded-full bg-indigo-600"></span>
        {{ title }}
      </h1>
    </div>

    <div class="flex items-center gap-4 sm:gap-8">
      <div class="hidden md:flex flex-col items-end">
         <span class="text-xs font-black text-slate-900 uppercase tracking-tighter">Diagnostic Lead</span>
         <span 
          class="text-[10px] font-bold uppercase tracking-widest flex items-center gap-1.5 transition-colors duration-500"
          :class="isOnline ? 'text-emerald-500' : 'text-rose-500'"
         >
           <span class="w-1 h-1 rounded-full animate-pulse" :class="isOnline ? 'bg-emerald-500' : 'bg-rose-500'"></span>
           {{ isOnline ? 'System Online' : 'System Offline' }}
         </span>
      </div>
      <div class="relative group">
         <div class="w-10 h-10 sm:w-12 h-12 rounded-2xl bg-slate-900 border-2 border-white shadow-xl shadow-slate-200 overflow-hidden flex items-center justify-center cursor-pointer transition-transform group-hover:scale-105 duration-300">
           <img src="https://ui-avatars.com/api/?name=F+G&background=1e293b&color=fff&bold=true" alt="User" class="w-full h-full object-cover opacity-90">
         </div>
         <div 
          class="absolute -top-1 -right-1 w-3.5 h-3.5 sm:w-4 h-4 border-2 border-white rounded-full transition-colors duration-500"
          :class="isOnline ? 'bg-emerald-500' : 'bg-rose-500'"
         ></div>
      </div>
    </div>
  </header>
</template>

<script setup>
defineProps({
  title: String
})

const { isOnline } = useBackendStatus()

defineEmits(['openMenu'])
</script>
