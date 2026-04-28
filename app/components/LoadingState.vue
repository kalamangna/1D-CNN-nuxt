<template>
  <div class="flex flex-col items-center justify-center py-24 space-y-8 animate-in fade-in zoom-in-95 duration-700">
    <div class="relative">
       <div class="absolute inset-0 bg-indigo-100 rounded-full blur-[40px] animate-pulse"></div>
       <div class="w-24 h-24 bg-white rounded-3xl border border-slate-100 flex items-center justify-center relative shadow-2xl">
          <i class="fa-solid fa-circle-notch animate-spin text-indigo-600 text-3xl"></i>
       </div>
    </div>
    <div class="text-center space-y-2">
       <h3 class="text-2xl font-bold text-slate-800 tracking-tight">{{ message }}</h3>
       <p class="text-xs font-bold text-slate-400 uppercase tracking-widest">{{ submessage }}</p>
    </div>
    <!-- Simple Progress Bar -->
    <div class="w-48 h-1 bg-slate-100 rounded-full overflow-hidden border border-slate-100">
       <div class="h-full bg-indigo-600 animate-[loading-mimic_2s_infinite]"></div>
    </div>
  </div>
</template>

<style scoped>
@keyframes loading-mimic {
  0% { transform: translateX(-100%); width: 20%; }
  50% { width: 50%; }
  100% { transform: translateX(400%); width: 20%; }
}
</style>

<script setup>
defineProps({ message: String, submessage: String })
</script>
