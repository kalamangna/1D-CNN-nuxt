<template>
  <div class="p-8 lg:p-12 space-y-12">
    <header>
      <h1 class="text-4xl font-black tracking-tighter text-slate-800 uppercase">System Settings</h1>
      <p class="text-[11px] font-black text-slate-400 uppercase tracking-[0.25em] mt-2">Neural Engine & API Configuration</p>
    </header>

    <div class="grid grid-cols-1 lg:grid-cols-12 gap-10">
       <div class="lg:col-span-8">
          <div class="bg-white rounded-[2.5rem] shadow-sm border border-slate-200 overflow-hidden divide-y divide-slate-100">
             <div class="p-10">
                <h3 class="text-xs font-black text-slate-900 uppercase tracking-widest mb-6 flex items-center gap-2">
                   <i class="fa-solid fa-server text-indigo-500"></i>
                   API Connectivity
                </h3>
                <div class="space-y-6">
                   <div class="flex items-center justify-between p-6 bg-slate-50 rounded-2xl border border-slate-100">
                      <div>
                         <p class="text-sm font-black text-slate-800">Inference Port</p>
                         <p class="text-xs font-bold text-slate-400 uppercase">Currently listening on 5001</p>
                      </div>
                      <span class="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-lg text-[9px] font-black uppercase tracking-widest">Active</span>
                   </div>
                </div>
             </div>
             
             <div class="p-10 opacity-40 grayscale pointer-events-none">
                <h3 class="text-xs font-black text-slate-900 uppercase tracking-widest mb-6">Security & Auth</h3>
                <p class="text-sm font-bold text-slate-400 uppercase tracking-widest">Advanced features restricted in Demo Mode</p>
             </div>
          </div>
       </div>
    </div>
  </div>
</template>
