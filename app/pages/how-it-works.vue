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
          >Main Stage</span
        >
      </NuxtLink>
      <BackendStatus />
    </header>

    <div class="w-full max-w-4xl">
      <div class="mb-16">
        <h1
          class="text-5xl font-[900] text-slate-900 uppercase tracking-tighter italic mb-4"
        >
          Neural <span class="text-indigo-600">Pipeline</span>
        </h1>
        <p class="text-slate-400 font-bold uppercase tracking-widest text-xs">
          Architectural Logic & Data Transformation Journey
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
      <div class="mt-24 text-center pb-20">
        <NuxtLink
          to="/analysis"
          class="inline-flex items-center gap-4 px-10 py-5 bg-indigo-600 text-white rounded-full font-black uppercase tracking-[0.2em] text-[11px] shadow-2xl shadow-indigo-600/30 hover:scale-105 transition-all active:scale-95"
        >
          Proceed to Processing Lab
          <i class="fa-solid fa-microchip"></i>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
const steps = [
  {
    layer: "Ingestion Layer",
    title: "Raw Signal Capture",
    description:
      "Data originates from 3-phase power system monitors capturing Voltage (Va, Vb, Vc) and Current (Ia, Ib, Ic) in p.u. (per unit) format across multiple disturbance scenarios.",
    icon: "fa-solid fa-table",
    code: "dataset.csv -> [t(s), Va, Vb, Vc, Ia, Ib, Ic, Label]",
  },
  {
    layer: "Preprocessing Engine",
    title: "Feature Scaling",
    description:
      "Raw signals are normalized using a pre-trained StandardScaler. This ensures all 6 signal channels share a uniform mean and variance, preventing bias during the convolution phase.",
    icon: "fa-solid fa-broom-wide",
    code: "scaler = joblib.load('scaler.joblib')\nsignals_scaled = scaler.transform(raw_data)",
  },
  {
    layer: "Neural Structuring",
    title: "Tensor Transformation",
    description:
      "The 2D signal matrix is reshaped into a 3D Tensor compatible with 1D-CNN batch processing. This creates a temporal window of 200 time-steps across 6 parallel channels.",
    icon: "fa-solid fa-window-restore",
    code: "Shape: (1, 200, 6) # [Batch, Steps, Features]",
  },
  {
    layer: "AI Core",
    title: "1D-CNN Classification",
    description:
      "A deep 1D Convolutional Neural Network extracts temporal features. The final layer utilizes a Softmax activation to compute probabilities across 11 classes (Normal + 10 Fault types).",
    icon: "fa-solid fa-brain",
    code: 'layers.Dense(11, activation="softmax")\nmodel.predict(input_tensor)',
  },
  {
    layer: "Logic Engine",
    title: "Distance Calculation",
    description:
      "The backend parses the predicted label to calculate physical distance. Since the system is based on a 5km transmission line, the fault location is derived from the predicted percentage.",
    icon: "fa-solid fa-calculator",
    code: "location_km = (percentage / 100.0) * 5.0\n# e.g., 25% of 5km = 1.25km",
  },
  {
    layer: "Presentation Layer",
    title: "Neural Mapping",
    description:
      "The Nuxt frontend renders the prediction matrix, visualizing temporal disturbances through interactive charts and high-level diagnostic reports for system engineers.",
    icon: "fa-solid fa-display",
  },
];
</script>

<style scoped>
.mono {
  font-family: "JetBrains Mono", monospace;
}
</style>
