# 🚛📦 Fr8OrdR

**Enterprise Fleet-management and Logistics Command Center with shipment tracking, dispatch, route planning, document automation, maintenance scheduling, and driver performance telemetry.**

🏷️ Maintained in [qamotech/Fr8OrdR](https://github.com/qamotech/Fr8OrdR) · 🌐 Public repository  
🚀 **Live Web Application:** [https://qamotech.github.io/Fr8OrdR/](https://qamotech.github.io/Fr8OrdR/)

## ✨ What is here

- 🚚 **Fleet Command Center**: Real-time KPI telemetry, dispatch queues, live fleet status, and active load monitoring.
- 🗺️ **Interactive Route Planner**: 1-click route presets (Chicago → Dallas, Atlanta → Miami, Denver → Phoenix) with fuel and toll calculations.
- 📋 **Live Load Board**: One-click instant load booking and dispatch workflow with state tracking.
- 🎯 **Guided Onboarding Tour**: Zero-beacon, non-intrusive interactive walkthrough of core operational modules.
- 📄 **Digital Documents & Compliance**: Bill of Lading (BOL), Rate Confirmations, Proof of Delivery (POD), and automated invoicing.
- 👤 **Driver Performance & Scorecards**: Telemetry metrics, safety scoring, hours of service (HOS), and driver onboarding.
- ♿ **WCAG AA Compliance**: High-contrast modern dark palette engineered for dispatchers and fleet managers.
- 📦 **Zero-Config Deployment**: Single-file distributable bundle deployed instantly on GitHub Pages alongside Vite modular source code.

## 🧭 Try the project

Visit the live demo directly at **[https://qamotech.github.io/Fr8OrdR/](https://qamotech.github.io/Fr8OrdR/)**, or clone the repository to run locally with Vite.

## 🚀 Local setup

```sh
git clone https://github.com/qamotech/Fr8OrdR.git
cd Fr8OrdR
```

Use Node.js and npm compatible with the versions in `package.json`. Install dependencies locally, then launch the declared development command:

```sh
npm install
npm run dev
```

Open the address printed by the development server. The manifest is the source of truth for commands:

| Command | Declared operation |
|---|---|
| `npm run dev` | `vite` |
| `npm run build` | `vite build` |
| `npm run lint` | `oxlint` |
| `npm run preview` | `vite preview` |

Install/build scripts can execute code. Inspect project configuration and keep secrets in local configuration excluded from Git. No dependency installation or application build was performed for this documentation update.

## 🗂️ Source map

- 📄 [`GITHUB_INSTRUCTIONS.md`](GITHUB_INSTRUCTIONS.md)
- 📄 [`index.html`](index.html)
- 📄 [`package-lock.json`](package-lock.json)
- 📄 [`package.json`](package.json)
- 📄 [`vite.config.js`](vite.config.js)
- 📄 [`src`](src) — source directory
- 📄 [`public`](public) — source directory

## ⚙️ Configuration & data

The repository contains UI and demonstration workflows. Labels such as live telemetry, OCR, or optimization are not proof of a connected production provider. Root index.html is bundled while React source is also present; verify the intended entry before rebuilding.

Keep credentials, private exports, customer records, and personal information out of commits and screenshots. A local browser demo is not evidence of account security, reliable persistence, or connected external services. Preserve exports before changing storage keys or resetting an application.

## 🧪 Verification checklist

- 🔎 Confirm the entry file and asset paths above exist in your checkout.
- ▶️ Start the documented runtime and inspect browser or terminal errors.
- 🧭 Exercise the project-specific workflow described above using sample data.
- 📱 Check narrow and wide layouts when the project has a browser interface.
- 💾 Verify save/export and recovery behavior before trusting important work to it.
- 📝 Record the exact command, browser, operating system, and outcome of your checks.

This guide was prepared from repository files and manifests. It does not claim a fresh build, deployment, security audit, or full functional test of this project.

## 🤝 Contributions & useful reports

Keep changes focused and explain the user-visible result. Preserve existing assets and configuration unless a change requires updating them. Include reproduction steps, expected and actual behavior, and relevant screenshots with personal information removed. For UI work, include the viewport and browser; for runtime issues, include the command and error text.

## 🛠️ Maintenance priorities

- 📚 Keep this guide aligned with implemented behavior and current entry points.
- 🧪 Add or maintain checks for the core workflow before expanding features.
- ♿ Review labels, keyboard navigation, contrast, and responsive layout.
- 📦 Document external services, asset rights, and deployment prerequisites.

## 📜 Licensing & attribution

This documentation update does not grant a new software or asset license. Consult existing license files, source headers, package metadata, and original asset terms; resolve inconsistencies with the owner before redistribution. Third-party names and resources retain their own terms.

---

## 📚 Preserved earlier documentation

The material below is retained verbatim for history and project-specific context. Template instructions and older claims may differ from the source inventory above.

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and Oxlint's TypeScript related rules in your project.
