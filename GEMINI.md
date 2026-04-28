# Frontend Mandates

## Context Precedence
- This is the presentation layer for the 1D-CNN Power System Fault Detector.
- Design style: **Modern, Industrial-Futuristic** (high contrast, bold typography, status-driven colors).
- Primary interaction: CSV file upload -> Backend inference -> Result visualization.

## Engineering Standards
- Use **Vanilla CSS** where custom styling is needed beyond Tailwind utilities.
- Labels for fault data must be: **"Fault Position"** (%) and **"Physical Distance"** (km).
- The waveform chart MUST display all 6 channels:
    - **Voltages (Va, Vb, Vc):** Solid lines.
    - **Currents (Ia, Ib, Ic):** Dashed lines.
- Ensure all numbers are formatted consistently (e.g., confidence as %, distance as 2-decimal km).

## Operational Workflows
- When adding new pages, follow the existing layout pattern in `layouts/default.vue`.
- Any changes to `useApi.ts` must maintain compatibility with the Flask backend response schema.
