<template>
  <div 
    v-if="isOpen" 
    class="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[60] lg:hidden no-print"
    @click="$emit('close')"
  ></div>

  <aside 
    class="w-72 bg-slate-900 flex flex-col fixed inset-y-0 left-0 z-[70] no-print shadow-2xl transition-transform duration-300 lg:translate-x-0"
    :class="[isOpen ? 'translate-x-0' : '-translate-x-full']"
  >
    <!-- Logo Section -->
    <div class="p-8 pb-12">
      <div class="flex items-center justify-between lg:justify-start gap-4">
        <div class="flex items-center gap-4 group cursor-pointer">
          <div class="w-12 h-12 bg-indigo-500 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-indigo-500/30 group-hover:rotate-12 transition-transform duration-500">
            <i class="fa-solid fa-bolt-lightning text-xl"></i>
          </div>
          <div>
            <span class="text-xl font-black tracking-tight text-white block leading-tight uppercase">FaultGuard</span>
            <span class="text-[10px] font-bold text-slate-500 uppercase tracking-widest leading-none">Neural Suite</span>
          </div>
        </div>
        <button @click="$emit('close')" class="lg:hidden text-slate-400 hover:text-white">
          <i class="fa-solid fa-xmark text-xl"></i>
        </button>
      </div>
    </div>

    <!-- Navigation -->
    <nav class="flex-1 px-6 space-y-2">
      <NuxtLink v-for="item in menuItems" :key="item.label" :to="item.to" 
        @click="$emit('close')"
        class="flex items-center gap-4 px-5 py-4 text-[11px] font-black transition-all rounded-[1.25rem] group uppercase tracking-[0.15em]"
        :class="[route.path === item.to 
          ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-600/20' 
          : 'text-slate-400 hover:text-white hover:bg-white/5']"
      >
        <i :class="[item.icon, route.path === item.to ? 'text-white' : 'group-hover:text-indigo-400 transition-colors']" class="w-6 text-center text-lg"></i>
        {{ item.label }}
      </NuxtLink>
    </nav>
  </aside>
</template>

<script setup>
defineProps({
  isOpen: Boolean,
  menuItems: Array
})

defineEmits(['close'])
const route = useRoute()
</script>
