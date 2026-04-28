<template>
  <div class="bg-white rounded-xl p-5 border border-slate-200/60 shadow-[0_2px_4px_rgba(0,0,0,0.02)] hover:shadow-[0_8px_20px_rgba(0,0,0,0.04)] transition-all duration-300">
    <div class="flex items-center gap-3 mb-3">
      <div :class="[bg, 'bg-opacity-10']" class="w-8 h-8 rounded-lg flex items-center justify-center">
        <i :class="[icon, bg.replace('bg-', 'text-')]" class="text-[14px]"></i>
      </div>
      <p class="text-[11px] font-bold text-slate-400 uppercase tracking-widest">{{ label }}</p>
    </div>
    <div class="flex items-baseline gap-2">
      <p class="text-2xl font-bold text-slate-900 tracking-tight">{{ value }}</p>
      <span class="text-[10px] font-bold text-emerald-500 uppercase tracking-tighter bg-emerald-50 px-1.5 py-0.5 rounded-md">Live</span>
    </div>
  </div>
</template>

<script setup>
defineProps({
  label: String,
  value: [String, Number],
  icon: String,
  bg: String
})
</script>
