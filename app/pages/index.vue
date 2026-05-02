<template>
  <div class="relative min-h-screen bg-white">
    <!-- Top Meta Controls (Floating) -->
    <header class="absolute top-10 right-10 z-20 no-print flex gap-4">
      <NuxtLink to="/documentation" class="group flex items-center gap-3 px-6 py-3 bg-white border border-slate-200 rounded-full shadow-xl hover:scale-105 transition-all active:scale-95 text-slate-600 hover:text-indigo-600">
          <i class="fa-solid fa-file-invoice text-[11px] text-rose-500"></i>
          <span class="text-[11px] font-black uppercase tracking-[0.2em]">Documentation</span>
       </NuxtLink>
      <NuxtLink to="/how-it-works" class="group flex items-center gap-3 px-6 py-3 bg-white border border-slate-200 rounded-full shadow-xl hover:scale-105 transition-all active:scale-95 text-slate-600 hover:text-indigo-600">
          <i class="fa-solid fa-microchip text-[11px] text-indigo-500"></i>
          <span class="text-[11px] font-black uppercase tracking-[0.2em]">Pipeline</span>
       </NuxtLink>
      <NuxtLink to="/metrics" class="group flex items-center gap-3 px-6 py-3 bg-slate-900 border border-slate-800 rounded-full shadow-2xl hover:scale-105 transition-all active:scale-95">
          <i class="fa-solid fa-chart-simple text-[11px] text-indigo-400 group-hover:text-indigo-300 transition-colors"></i>
          <span class="text-[11px] font-black text-white uppercase tracking-[0.2em]">Metrics</span>
       </NuxtLink>
    </header>

    <HeroScreen 
      tag="AI Fault Detector"
      titleLine1="AI-Based"
      titleHighlight="Fault Detection"
      titleLine2="System"
      subtitle="High-precision 1D-CNN for real-time power system disturbances."
      ctaText="Analyze"
      ctaLink="/analysis"
    />
  </div>
</template>

<script setup>
// Using default single-stage layout
</script>
