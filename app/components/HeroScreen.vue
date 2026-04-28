<template>
  <div class="fixed inset-0 overflow-hidden bg-white flex flex-col items-center justify-center p-6 text-center">
    <!-- Clean Minimalist Background -->
    <div class="absolute inset-0 z-0">
      <div class="absolute top-1/4 left-1/4 w-[60vw] h-[60vw] bg-indigo-50 rounded-full blur-[120px]"></div>
      <!-- Simplified background pattern to avoid CSS parser issues -->
      <div class="absolute inset-0 opacity-40 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:40px_40px]"></div>
    </div>

    <!-- Content Stage -->
    <div class="relative z-10 max-w-5xl space-y-10 animate-in fade-in zoom-in-95 duration-1000">
      <div class="inline-flex items-center gap-3 px-5 py-1.5 rounded-full bg-slate-100 border border-slate-200 mb-4 shadow-sm">
        <div class="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse"></div>
        <span class="text-[10px] font-bold text-slate-500 uppercase tracking-widest leading-none">{{ tag }}</span>
      </div>

      <div class="space-y-6">
        <h1 class="text-6xl lg:text-[7.5rem] font-[900] tracking-tighter text-slate-900 leading-[0.85] uppercase italic">
          {{ titleLine1 }} <br />
          <span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-indigo-500">{{ titleHighlight }}</span> <br />
          {{ titleLine2 }}
        </h1>
        <p class="text-xl lg:text-2xl text-slate-400 font-semibold max-w-3xl mx-auto leading-relaxed tracking-tight">
          {{ subtitle }}
        </p>
      </div>

      <div class="pt-10">
        <NuxtLink 
          :to="ctaLink" 
          class="group relative inline-flex items-center gap-6 px-14 py-6 bg-slate-900 text-white rounded-full transition-all duration-500 hover:scale-105 hover:bg-indigo-600 hover:shadow-[0_20px_50px_rgba(79,70,229,0.3)] active:scale-95 shadow-xl"
        >
          <span class="text-sm font-bold uppercase tracking-[0.3em]">{{ ctaText }}</span>
          <div class="w-9 h-9 bg-white/10 rounded-full flex items-center justify-center text-white transition-transform group-hover:translate-x-1 duration-300">
            <i class="fa-solid fa-arrow-right-long"></i>
          </div>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  tag: { type: String, default: '' },
  titleLine1: { type: String, default: '' },
  titleHighlight: { type: String, default: '' },
  titleLine2: { type: String, default: '' },
  subtitle: { type: String, default: '' },
  ctaText: { type: String, default: '' },
  ctaLink: { type: String, default: '' }
})
</script>
