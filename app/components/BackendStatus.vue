<template>
  <div 
    class="flex items-center gap-3 px-4 py-1.5 rounded-full border transition-colors duration-500 bg-white"
    :class="isOnline ? 'border-emerald-100' : 'border-rose-100'"
  >
    <div 
      class="w-1.5 h-1.5 rounded-full"
      :class="[isOnline ? 'bg-emerald-500 animate-pulse' : 'bg-rose-500']"
    ></div>
    <span 
      class="text-[10px] font-bold uppercase tracking-widest"
      :class="isOnline ? 'text-emerald-600' : 'text-rose-600'"
    >
      {{ isOnline ? 'Neural Link Online' : 'Neural Link Offline' }}
    </span>
  </div>
</template>

<script setup>
const { isOnline } = useBackendStatus()
</script>
