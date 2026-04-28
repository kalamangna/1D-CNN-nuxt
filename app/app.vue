<script setup>
const { startPolling, stopPolling } = useBackendStatus()

onMounted(() => {
  startPolling(5000) // Poll every 5 seconds
})

onUnmounted(() => {
  stopPolling()
})
</script>

<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800;900&family=JetBrains+Mono:wght@500;700&display=swap');

:root {
  --brand-indigo: #4f46e5;
  --brand-rose: #f43f5e;
  --brand-emerald: #10b981;
}

body {
  @apply bg-white text-slate-900 antialiased overflow-x-hidden selection:bg-indigo-100 selection:text-indigo-700;
  font-family: 'Inter', sans-serif;
}

.mono {
  font-family: 'JetBrains Mono', monospace;
}

/* Page Transitions */
.page-enter-active, .page-leave-active { transition: all 0.4s ease; }
.page-enter-from, .page-leave-to { opacity: 0; transform: translateY(5px); }

/* Scrollbar */
::-webkit-scrollbar { width: 5px; }
::-webkit-scrollbar-track { @apply bg-transparent; }
::-webkit-scrollbar-thumb { @apply bg-slate-200 rounded-full hover:bg-slate-300; }
</style>
