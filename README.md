# Nandeeswaran B | Data Science & AI Portfolio

A world-class, premium, recruiter-focused personal portfolio website built for **Nandeeswaran B** (B.Tech Artificial Intelligence and Data Science student at SNS College of Engineering). 

This portfolio features a modern full-screen **vertical slide-deck layout** with state-driven glassmorphism navigation, dynamic canvas particles, and custom interactive data visualizations.

---

## 🚀 Live Demo & Repository
* **GitHub Repository**: [https://github.com/Nandeeswaran-b/nandeeswaran-portfolio](https://github.com/Nandeeswaran-b/nandeeswaran-portfolio)

---

## 🛠️ Technology Stack
* **Framework**: [Next.js 15](https://nextjs.org/) (React 19)
* **Language**: [TypeScript](https://www.typescriptlang.org/)
* **Styling**: [Tailwind CSS](https://tailwindcss.com/)
* **Animations**: [Framer Motion](https://www.framer.com/motion/)
* **Icons**: [Lucide React](https://lucide.dev/)

---

## ✨ Key Features
1. **Vertical Slide-Deck Layout**: Replaces standard scrolling with premium `100vh` slides translated smoothly via Framer Motion spring physics.
2. **Zero-Scroll Hash Routing**: URL hashes (`#home`, `#about`, `#skills`, etc.) sync with slides programmatically, keeping viewport scroll positions locked at `(0, 0)`.
3. **Dynamic Canvas Particle Backdrop**: A responsive background canvas with floating nodes that interact with the user's cursor.
4. **Interactive SVG Radar Chart**: Custom-built SVG radar matrix visualization comparing core technical competency scores.
5. **Unified Experience Timeline**: Switchable tab filters to toggle between "All Timeline", "Work Experience", and "Education History" in a clean vertical track.
6. **Case Study Drawers**: Interactive slide-out drawer panels detailing project challenges, methodology, and business impact metrics.
7. **Credential Verification Lightbox**: Clickable certification cards that zoom into verified digital credentials directly on screen.
8. **Responsive Inner Overflow**: Scrollable containers inside slides ensure no content is clipped on smaller viewports.

---

## 📁 Repository Structure
```text
nandeeswaran-portfolio/
├── frontend/             # Next.js 15 application codebase
│   ├── src/
│   │   ├── app/         # Page routing and global styles
│   │   ├── components/  # Modular interactive UI sections
│   │   └── lib/         # Academic data registries and static stores
│   ├── package.json
│   └── tailwind.config.js
├── database/             # Relational schema backups
│   └── schema.sql
├── run_dev.ps1           # Development helper startup script
├── run_build.ps1          # Production build validation script
└── .gitignore
```

---

## 💻 Local Development Setup

To run the application locally, navigate to the `frontend` directory and execute:

### 1. Install Dependencies
```bash
cd frontend
npm install
```

### 2. Start the Development Server
```bash
npm run dev
```
Open **[http://localhost:3000](http://localhost:3000)** in your browser.

---

## 📦 Production Static Build
To compile and test the optimized production build:
```bash
cd frontend
npm run build
```
The static files will be exported to the `.next` directory, ready to be deployed on **Vercel** or other cloud hosting providers.
