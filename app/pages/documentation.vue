<template>
  <div class="min-h-screen bg-white p-8 lg:p-16">
    <header class="max-w-5xl mx-auto flex justify-between items-center mb-20 no-print">
       <NuxtLink to="/" class="group flex items-center gap-3 px-5 py-2.5 bg-slate-50 border border-slate-200 rounded-full hover:shadow-md transition-all active:scale-95">
          <i class="fa-solid fa-arrow-left text-[10px] text-slate-400 group-hover:text-indigo-600"></i>
          <span class="text-[11px] font-bold text-slate-500 uppercase tracking-widest group-hover:text-slate-900">Home</span>
       </NuxtLink>
       <BackendStatus />
    </header>

    <main class="max-w-4xl mx-auto space-y-20 pb-32">
       <div class="space-y-6">
          <h1 class="text-6xl font-[1000] tracking-tighter uppercase italic text-slate-900">System <span class="text-indigo-600 font-black">Documentation</span></h1>
          <p class="text-slate-400 font-bold uppercase tracking-[0.25em] text-xs">General user guide and operational manual</p>
       </div>

       <div class="grid grid-cols-1 md:grid-cols-2 gap-12">
          <section class="space-y-6">
             <h3 class="text-xs font-black uppercase tracking-[0.4em] text-indigo-500">How to use</h3>
             <ul class="space-y-6">
                <li class="flex gap-4">
                   <span class="w-6 h-6 rounded-lg bg-indigo-50 flex items-center justify-center text-[10px] font-black text-indigo-600 shrink-0">1</span>
                   <p class="text-sm text-slate-600 leading-relaxed font-medium">Prepare your input signal in <strong>CSV format</strong> with 7 specific columns: Time, Va, Vb, Vc, Ia, Ib, and Ic (p.u. format preferred).</p>
                </li>
                <li class="flex gap-4">
                   <span class="w-6 h-6 rounded-lg bg-indigo-50 flex items-center justify-center text-[10px] font-black text-indigo-600 shrink-0">2</span>
                   <p class="text-sm text-slate-600 leading-relaxed font-medium">Go to <strong>Lab</strong> section to upload your file. You can also use <strong>Normal Data</strong> or <strong>Fault Data</strong> buttons to generate calibrated synthetic signals for testing.</p>
                </li>
                <li class="flex gap-4">
                   <span class="w-6 h-6 rounded-lg bg-indigo-50 flex items-center justify-center text-[10px] font-black text-indigo-600 shrink-0">3</span>
                   <p class="text-sm text-slate-600 leading-relaxed font-medium">Analyze the results. The system will provide a <strong>Verdict</strong>, <strong>Classification Type</strong>, <strong>Precise Location (KM)</strong>, and <strong>Fault Inception Time (MS)</strong>.</p>
                </li>
             </ul>
          </section>

          <section class="space-y-6 p-10 bg-slate-900 rounded-[2.5rem] text-white shadow-2xl relative overflow-hidden">
             <div class="absolute -right-10 -bottom-10 w-40 h-40 bg-indigo-500/10 rounded-full blur-[60px]"></div>
             <h3 class="text-xs font-black uppercase tracking-[0.4em] text-indigo-400">Important</h3>
             <p class="text-sm text-slate-400 leading-relaxed italic">"Always ensure your signal sampling rate is 10kHz for optimal 1D-CNN accuracy. Higher or lower rates might affect location precision."</p>
             <div class="pt-6">
                <a href="/docs/documentation.pdf" download class="w-full py-4 bg-white text-slate-900 rounded-2xl flex items-center justify-center gap-3 text-[10px] font-black uppercase tracking-widest hover:bg-indigo-500 hover:text-white transition-all active:scale-95">
                   <i class="fa-solid fa-download"></i> Download User Guide
                </a>
             </div>
          </section>
       </div>
    </main>
  </div>
</template>
