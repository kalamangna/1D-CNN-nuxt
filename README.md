# 1D-CNN Power System Fault Detector - Frontend

A modern, high-performance web interface for visualizing and interacting with the 1D-CNN Fault Detection system. Built with Nuxt 3 and Tailwind CSS.

## Features
- **Neural Analysis Stage:** Upload CSV waveform data (200x6) for instant classification.
- **Interactive Waveform Charts:** Visualizes 3-phase Voltage and Current disturbances using Chart.js.
- **Detailed Metrics:** View model accuracy, precision, recall, and confusion matrices.
- **Result Export:** Generate and download diagnostic reports.
- **Intuitive UX:** Smooth transitions, responsive design, and dark/light mode aesthetics.

## Tech Stack
- **Nuxt 3:** Vue.js framework for SSR and optimized performance.
- **Tailwind CSS:** For sleek, utility-first styling.
- **Chart.js:** Real-time signal visualization.
- **PapaParse:** Robust CSV data ingestion.
- **FontAwesome:** Rich iconography.

## Setup & Installation

1. **Install Dependencies:**
   ```bash
   npm install
   ```

2. **Development Server:**
   ```bash
   npm run dev
   ```
   Open `http://localhost:3000` in your browser.

3. **Build for Production:**
   ```bash
   npm run build
   ```

## Configuration
- API Connection: Configured in `app/composables/useApi.ts`.
- Default API URL: `http://localhost:5001`.

## Project Structure
- `app/pages/`: Main application routes (Analysis, Metrics, How it Works).
- `app/components/`: Reusable UI components (ResultDisplay, StatCard, etc.).
- `app/assets/css/`: Global styles and Tailwind configurations.
- `app/composables/`: Shared logic and API interaction hooks.
