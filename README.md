# 1D-CNN Power System Fault Detector - Frontend

A high-performance industrial dashboard for visualizing and interacting with the 1D-CNN Fault Detection system. Built with Nuxt 3 and optimized for real-time diagnostic reporting.

## Features
- **Lab Section:** Interactive CSV analysis (200x7 matrix) with real-time AI inference.
- **Dual-Unit Visualization:** Separate charts for Per-Unit (p.u.) and Physical (kV/kA) signal analysis.
- **System Pipeline:** Detailed technical documentation of the 1D-CNN architecture.
- **Downloadable Reports:** Instant generation of diagnostic logs in text format.
- **PDF Artifacts:** Access to technical blueprints and user manuals directly from the UI.
- **Metrics Dashboard:** Real-time monitoring of model accuracy and confusion matrices.

## Tech Stack
- **Nuxt 3:** Modern Vue framework for robust routing and state management.
- **Tailwind CSS:** Professional industrial-grade styling.
- **Chart.js 4:** High-density time-series visualization.
- **PapaParse:** Precision CSV parsing.

## Setup & Installation

1. **Initialization:**
   ```bash
   npm install
   ```

2. **Environment:**
   Configure `NUXT_PUBLIC_API_BASE_URL` in `.env`.

3. **Development:**
   ```bash
   npm run dev
   ```

## Project Structure
- `app/pages/`: Modular routing for **Lab**, **Pipeline**, **Documentation**, and **Metrics**.
- `app/components/`: High-density UI components including `ResultDisplay` and `AnalyzeCard`.
- `public/docs/`: Static hosting for `pipeline.pdf` and `documentation.pdf`.
- `app/composables/`: API logic and unified state management.
