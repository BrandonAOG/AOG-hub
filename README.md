# AOG Forms Hub — README

```markdown
# ⚡ AOG Field Operations Hub

A single-page launch portal for the **Always On Generators** field team.
Provides a central, branded dashboard linking all field form modules —
accessible from any phone, tablet, or laptop with zero installation.

> **Live Site:** https://brandonaog.github.io/AOG-estimate/ ← update URL

---

## 📸 Preview

```
┌─────────────────────────────────────────┐
│         ALWAYS ON GENERATORS            │
│      // Power When You Need It //       │
│                                         │
│  ● System Online   ● 5 Forms Active     │
│  ● Field Ready     ● Sync Enabled       │
│                                         │
│  ┌─────────────┐  ┌─────────────┐      │
│  │ 🔧 Install  │  │ 📋 Estimate │      │
│  └─────────────┘  └─────────────┘      │
│  ┌─────────────┐  ┌─────────────┐      │
│  │ ⚙ Maintain  │  │ 📍 Site Visit│      │
│  └─────────────┘  └─────────────┘      │
│         ┌──────────────────┐            │
│         │ ✏️  Sketch Pad   │            │
│         └──────────────────┘            │
└─────────────────────────────────────────┘
```

---

## 🗂 Form Modules

| Card | Links To | Purpose |
|---|---|---|
| 🔧 **Install Forms** | `/Installforms/` | New generator installation paperwork & checklists |
| 📋 **Estimate Forms** | `/Generator-estimate-form/` | Quote & pricing forms for new estimates |
| ⚙️ **Maintenance Forms** | `/Maintenance/` | Service logs, PMs & repair documentation |
| 📍 **Site Visit Forms** | `/Site-visit/` | On-site inspection & assessment forms |
| ✏️ **Sketch Pad** | `/Sketchpad/` | Freehand diagrams, site sketches & field drawings |

---

## 🚀 Quick Start

1. Clone or download the repository
2. Open `index.html` in any modern browser — **no server required**
3. Cards link directly to each live form module

```bash
git clone https://github.com/BrandonAOG/<repo-name>.git
cd <repo-name>
open index.html    # macOS
# or just double-click index.html on Windows / Android file manager
```

---

## ⚙️ Configuration

### Updating Form URLs

All links are defined in one place at the bottom of `index.html`:

```js
const FORM_URLS = {
  'install':     'https://brandonaog.github.io/Installforms/',
  'estimate':    'https://brandonaog.github.io/Generator-estimate-form/',
  'maintenance': 'https://brandonaog.github.io/Maintenance/',
  'site-visits': 'https://brandonaog.github.io/Site-visit/',
  'sketch-pad':  'https://brandonaog.github.io/Sketchpad/'
};
```

Replace any value with your target URL. If a URL is set to `'#'`
the card will show a configuration alert instead of navigating.

### Adding a New Form Card

1. Add a new entry to `FORM_URLS`:
```js
'service-call': 'https://brandonaog.github.io/ServiceCall/'
```

2. Copy any existing `.form-card` block in the HTML and update:
   - `data-form="service-call"` on the `<a>` tag
   - The SVG icon path
   - `.form-title` text
   - `.form-desc` text

### Company Logo
Loaded from GitHub raw URL — replace with your own hosted image or a
`base64` data URI for full offline support:

```html
<img src="https://raw.githubusercontent.com/BrandonAOG/AOG-Logo/main/logo.png">
```

---

## 🗂 File Structure

```
AOG-hub/
├── index.html      ← Entire application (single self-contained file)
└── README.md       ← This file
```

> Intentionally one file — can be bookmarked, saved to homescreen,
> or opened from a phone's Files app with no internet required
> (after first load).

---

## 🛠 Tech Stack

| Layer | Detail |
|---|---|
| Fonts | Google Fonts — Orbitron · Share Tech Mono · Exo 2 |
| Icons | Inline SVG (Feather Icons style) |
| Animations | Pure CSS keyframes |
| Navigation | Vanilla JS URL routing via `data-form` attributes |
| Framework | **None** — Vanilla HTML / CSS / JS |
| Hosting | GitHub Pages |

---

## ✨ UI Features

| Feature | Detail |
|---|---|
| Animated background | Gradient shift + moving grid overlay |
| Glow effects | Radial ambient light on yellow/orange/blue |
| Card hover | Lift + border glow + scan-line strip + arrow reveal |
| Corner brackets | CSS `::before` / `::after` decorators on each card |
| Entrance animation | Cards stagger-fade in on page load (100ms offset each) |
| Status bar | Four animated pulse dots (green / yellow / orange / blue) |
| Clip-path corners | Beveled card corners via `clip-path: polygon()` |
| Responsive | 2-column grid → 1-column at ≤ 700px |
| 5th card centering | Auto spans full width and centers at max 580px |

---

## 📱 Device Notes

| Platform | Behavior |
|---|---|
| Desktop | Full grid, hover effects active |
| Tablet | 2-column grid, touch-friendly tap targets |
| Mobile ≤ 700px | Single-column stacked layout |
| iOS Home Screen | Add to homescreen → full-screen app feel |
| Offline | Works after first load if cached by browser |

---

## 🔗 Related Repositories

| Repo | Description |
|---|---|
| `AOG-Logo` | Company logo assets |
| `Installforms` | Generator installation form module |
| `Generator-estimate-form` | Estimate & quote form module |
| `Maintenance` | Maintenance & service log module |
| `Site-visit` | Site visit & inspection module |
| `Sketchpad` | Freehand field drawing tool |

---

## 📄 License

Internal business tool — © Always On Generators.  
Not licensed for redistribution.

---

## 👤 Author

**Brandon** — Always On Generators  
GitHub: [@BrandonAOG](https://github.com/BrandonAOG)
```

---

### Optional badges to paste at the top

```markdown
![HTML](https://img.shields.io/badge/HTML-Single--File-orange?style=flat-square&logo=html5)
![Vanilla JS](https://img.shields.io/badge/JS-Vanilla-yellow?style=flat-square&logo=javascript)
![GitHub Pages](https://img.shields.io/badge/Hosted-GitHub%20Pages-blue?style=flat-square&logo=github)
![No Framework](https://img.shields.io/badge/Framework-None-lightgrey?style=flat-square)
![Mobile Ready](https://img.shields.io/badge/Mobile-Ready-green?style=flat-square&logo=apple)
```
