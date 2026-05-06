<template>
  <Teleport to="body">
    <Transition name="fade">
      <div v-if="isOpen" class="fixed inset-0 z-[1000] bg-slate-900/95 backdrop-blur-xl p-6 lg:p-12 flex flex-col no-print">
         
         <!-- Modal Header -->
         <div class="flex items-center justify-between mb-12">
            <div class="space-y-2">
               <h4 class="text-2xl font-black text-white italic uppercase tracking-tighter">
                  {{ title }}
               </h4>
               <p class="text-[10px] font-bold text-slate-500 uppercase tracking-[0.3em]">{{ subtitle }}</p>
            </div>
            <button @click="$emit('close')" class="w-14 h-14 rounded-full bg-white/10 text-white hover:bg-rose-500 transition-all flex items-center justify-center group active:scale-90">
               <i class="fa-solid fa-xmark text-xl group-hover:rotate-90 transition-transform"></i>
            </button>
         </div>

         <!-- Modal Content Area -->
         <div class="flex-1 bg-white/5 rounded-[3rem] p-10 border border-white/10 flex flex-col min-h-0">
             <div class="flex-1 min-h-0">
                <slot></slot>
             </div>
         </div>

      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
defineProps({
  isOpen: Boolean,
  title: String,
  subtitle: { type: String, default: 'Deep Analysis Stage' }
})

defineEmits(['close'])
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.4s ease, transform 0.4s cubic-bezier(0.22, 1, 0.36, 1);
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
  transform: scale(1.05);
}
</style>
