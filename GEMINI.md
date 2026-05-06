# Frontend Mandates

## Context Precedence
- Presentation layer for the 1D-CNN Power System Fault Detector.
- Design: **Modern Industrial** (Dark/Light contrast, clean grids).
- Navigation: Single-stage home with **Lab**, **Pipeline**, **Documentation**, and **Metrics** access.

## Engineering Standards
- **Data Shape:** Exactly **200 rows** x **7 columns** (Time at index 0).
- **Visualization:**
    - Dual sets: **Set 01 (p.u.)** and **Set 02 (kV / kA)**.
    - Colors: Phase A (Blue `#0055aa`), Phase B (Red `#ee0000`), Phase C (Green `#00aa00`).
    - Voltage: Solid lines | Current: Solid lines (displayed in separate charts).
- **Formatters:** Certainty as %, Location as KM, Time as ms.

## Operational Workflows
- **API:** Use `useApi` composable for all calls.
- **Artifacts:** Serve PDF documentation from `/docs/pipeline.pdf` and `/docs/documentation.pdf`.
- **Result Logic:** Always show **Location** regardless of verdict (Normal/Fault).
- **Simplification:** Use clean UI labels (Verdict, Certainty, Type, Location).
