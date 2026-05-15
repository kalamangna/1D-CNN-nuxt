<template>
  <div class="min-h-screen bg-[#fafafa] p-8 lg:p-16 flex flex-col items-center">
    <!-- Header -->
    <header
      class="w-full max-w-5xl flex justify-between items-center mb-16 no-print"
    >
      <NuxtLink
        to="/"
        class="group flex items-center gap-3 px-5 py-2.5 bg-white border border-slate-200 rounded-full shadow-sm hover:shadow-md transition-all active:scale-95"
      >
        <i
          class="fa-solid fa-arrow-left text-[10px] text-slate-400 group-hover:text-indigo-600 transition-colors"
        ></i>
        <span
          class="text-[11px] font-bold text-slate-500 uppercase tracking-widest group-hover:text-slate-900 transition-colors"
          >Home</span
        >
      </NuxtLink>
      <BackendStatus />
    </header>

    <div class="w-full max-w-4xl">
      <div class="mb-16">
        <h1
          class="text-5xl font-[900] text-slate-900 uppercase tracking-tighter italic mb-4"
        >
          System <span class="text-indigo-600">Architecture</span>
        </h1>
        <p class="text-slate-400 font-bold uppercase tracking-widest text-xs mb-16">
          Technical pipeline and data transformation journey
        </p>
      </div>

      <!-- Timeline / Steps -->
      <div class="space-y-12 relative">
        <!-- Connecting Line -->
        <div
          class="absolute left-6 top-8 bottom-8 w-px bg-slate-200 hidden md:block"
        ></div>

        <div
          v-for="(step, index) in steps"
          :key="index"
          class="relative pl-0 md:pl-20 group"
        >
          <!-- Step Number Bubble -->
          <div
            class="absolute left-0 top-0 w-12 h-12 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center justify-center z-10 group-hover:border-indigo-500 transition-colors hidden md:flex"
          >
            <span class="mono text-sm font-bold text-slate-900">{{
              index + 1
            }}</span>
          </div>

          <div
            class="bg-white border border-slate-200 rounded-[2rem] p-8 shadow-sm group-hover:shadow-xl group-hover:shadow-indigo-500/5 transition-all duration-500 group-hover:-translate-y-1"
          >
            <div class="flex flex-col md:flex-row gap-8">
              <div class="flex-1 space-y-4">
                <div
                  class="inline-flex px-3 py-1 rounded-lg bg-indigo-50 text-indigo-600 text-[10px] font-black uppercase tracking-widest mb-2"
                >
                  {{ step.layer }}
                </div>
                <h3
                  class="text-2xl font-black text-slate-900 uppercase tracking-tight italic"
                >
                  {{ step.title }}
                </h3>
                <p class="text-slate-500 text-sm leading-relaxed font-medium">
                  {{ step.description }}
                </p>

                <!-- Code Snippet / Detail -->
                <div v-if="step.code" class="mt-6 p-4 bg-slate-900 rounded-2xl">
                  <pre
                    class="mono text-[11px] text-indigo-300 overflow-x-auto"
                  ><code>{{ step.code }}</code></pre>
                </div>
              </div>

              <!-- Icon / Visual -->
              <div
                class="w-24 h-24 rounded-3xl bg-slate-50 flex items-center justify-center shrink-0 order-first md:order-last border border-slate-100 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-500 shadow-inner"
              >
                <i :class="step.icon" class="text-3xl"></i>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Footer CTA -->
      <div class="mt-24 flex flex-col sm:flex-row items-center justify-center gap-6 pb-20 no-print">
        <a
          href="/docs/pipeline.pdf"
          download
          class="group inline-flex items-center gap-4 px-10 py-5 bg-white border border-slate-200 text-slate-600 rounded-full font-black uppercase tracking-[0.2em] text-[11px] shadow-xl hover:bg-slate-50 transition-all active:scale-95"
        >
          Download Architecture
          <i class="fa-solid fa-download text-indigo-500 group-hover:bounce"></i>
        </a>
        <NuxtLink
          to="/analysis"
          class="inline-flex items-center gap-4 px-10 py-5 bg-indigo-600 text-white rounded-full font-black uppercase tracking-[0.2em] text-[11px] shadow-2xl shadow-indigo-600/30 hover:scale-105 transition-all active:scale-95"
        >
          Start Analysis
          <i class="fa-solid fa-bolt-lightning"></i>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
const steps = [
  {
    layer: "Data Ingestion",
    title: "High-Fidelity Signal Capture",
    description:
      "Captures high-resolution 3-phase signals (Va, Vb, Vc, Ia, Ib, Ic) at a 10kHz sampling rate. Data is converted to Per-Unit (p.u.) values to ensure the model remains invariant to base voltage levels across different parts of the transmission network.",
    icon: "fa-solid fa-table",
    code: "Sampling: 10,000 Hz\nChannels: 7 (Time + 6 Signals)\nFormat: Normalized Per-Unit (p.u.)",
  },
  {
    layer: "Temporal Windowing",
    title: "Sliding Window Segmentation",
    description:
      "The continuous signal stream is segmented into temporal windows of 200 samples (20ms), which corresponds to one full fundamental cycle of a 50Hz system. This captures the complete transient profile required for accurate fault characterization.",
    icon: "fa-solid fa-chart-pie",
    code: "Window Size: 200 Samples (20ms)\nStride: 50 Samples (Overlapping)\nDomain: Time-Series Vector",
  },
  {
    layer: "Preprocessing",
    title: "Z-Score Normalization",
    description:
      "Every feature kanal is normalized using a pre-calculated StandardScaler artifact. This process removes DC offsets and ensures each signal channel has zero mean and unit variance, preventing gradient explosion during training.",
    icon: "fa-solid fa-broom",
    code: "Method: StandardScaler\nFormula: z = (x - u) / s\nArtifact: scaler.joblib",
  },
  {
    layer: "Deep Backbone",
    title: "1D-CNN Feature Extractor",
    description:
      "The shared feature extractor utilizes three consecutive convolutional blocks (64, 128, and 256 filters). Each block uses Batch Normalization and ReLU activation to learn spatial-temporal dependencies and phase-shift correlations.",
    icon: "fa-solid fa-microchip",
    code: "Architecture: 3x [Conv1D + BN + ReLU + MaxPool]\nKernels: 7, 5, 3\nGlobal Pooling: GlobalAveragePooling1D",
  },
  {
    layer: "Multi-Task Heads",
    title: "Simultaneous Inference Logic",
    description:
      "The model branches into three parallel task heads. Detection (Sigmoid) identifies the status using a 0.5 probability threshold, Type (Softmax) classifies the specific phase scenario, and Location (Rescaled Sigmoid) predicts the physical distance within the 5.0 km range.",
    icon: "fa-solid fa-brain",
    code: "Detection: V < 0.85 p.u. or I > 0.3 p.u.\nType: 11-Class Softmax\nLocation: 0.0 - 5.0 KM Regression",
  },
  {
    layer: "Resolution",
    title: "Engineering Unit Conversion",
    description:
      "Final AI predictions are mapped back to engineering units. The distance is computed via a sigmoid-scaled factor (0-5 KM) and current/voltage signals are converted to kA/kV for dashboard visualization.",
    icon: "fa-solid fa-tags",
    code: "Distance: Pred * 5.0 (KM)\nVoltage Base: 200 kV\nCurrent Base: 1 kA",
  }
];
</script>

<style scoped>
.mono {
  font-family: "JetBrains Mono", monospace;
}
</style>
