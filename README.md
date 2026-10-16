# 🍨 Y16Scoops Creamery

> A modern, interactive, and gesture-driven 3D product showcase for an artisanal ice cream brand. Built with **React 19**, **Vite**, and **Framer Motion**, featuring physical spring animations, dynamic thematic color morphing, and a responsive mobile experience.

---

## ✨ Features

- **🍦 3D Depth-Layered Showcase**:
  - Ice cream tubs fan out and restack in 3D space relative to the active selection.
  - Active tub sits front and center upright, while past tubs tilt backward top-left and upcoming tubs tilt forward bottom-right.
  - Hardware-accelerated GPU transforms (`willChange: 'transform'`) ensure silky-smooth 60/120 FPS animations.

- **🎨 Dynamic Thematic Color Morphing**:
  - The entire page theme (background tint, headings, CTA buttons, and selector rings) fluidly adapts to match each flavor's palette with a smooth 0.8s transition.

- **⚡ Buttery-Smooth Gesture Navigation**:
  - **Mouse Wheel / Trackpad**: Immediate response with a sensitive 35px threshold and a 450ms cooldown lock to prevent accidental skipping.
  - **Mobile Touch Swipes**: Dual-axis touch support — swipe horizontally (left/right) or vertically (up/down) to change flavors.
  - **Keyboard Navigation**: Use `ArrowUp`, `ArrowDown`, `ArrowLeft`, `ArrowRight`, `PageUp`, `PageDown`, or `Space`.
  - **Interactive Flavor Discs**: Click any bottom circular disc to jump straight to that flavor with an animated glow and scale indicator.

- **📱 Fully Responsive (Mobile & Desktop)**:
  - **Desktop**: Expansive 3-column layout (Flavor Info | 3D Center Stage | Brand Tagline & Selector Discs).
  - **Mobile**: Seamless vertical stack using CSS media queries (Header → Flavor Name & CTA → Centered Tub Stage → Bottom Flavor Discs).
  - Tub dimensions adapt automatically (`240px` mobile vs `300px` desktop) to prevent clipping on small viewports.

- **🔄 Bi-Directional Secondary Section ("More Coming Soon")**:
  - When reaching past the last flavor, the page smoothly slides up into a secondary section.
  - Return to the main flavors at any time by scrolling up, swiping down, pressing the up arrow, or tapping the **Back to Flavours** button.

---

## 🍓 The Flavors

| Flavor | Accent Color | Background | Description |
| :--- | :---: | :---: | :--- |
| **Vanilla Bean** | `#7B2D5A` | `#faf6f6` | Pure Madagascar vanilla beans slow-steeped in cream with floral undertones. |
| **Mango Tango** | `#e85d04` | `#fde9c5` | Sun-ripened Alphonso mangoes churned with vibrant tropical sweetness. |
| **Chocolate Crème** | `#3B1A0A` | `#e8d5c4` | Rich Belgian dark chocolate folded into thick, velvety cream. |
| **Strawberry Fields** | `#7B1A35` | `#f9d6df` | Fresh-picked strawberries swirled into a bright, fruity scoop. |
| **Pistachio Bliss** | `#2A4D1A` | `#d8ecd0` | Roasted Sicilian pistachios ground into a lush, nutty green cream. |

---

## 🛠️ Tech Stack

- **Frontend Library**: [React 19](https://react.dev/)
- **Animation Engine**: [Framer Motion](https://www.framer.com/motion/)
- **Build Tool**: [Vite 8](https://vite.dev/)
- **Styling**: Vanilla CSS (CSS Media Queries) + [TailwindCSS v4](https://tailwindcss.com/)
- **Typography**: Playfair Display, Inter, and Shrikhand (via Google Fonts)

---

## 🚀 Getting Started

### Prerequisites

Ensure you have **Node.js** (v18 or newer) installed on your system.

### Installation

1. Clone or navigate to the repository directory:
   ```bash
   cd y16Scoops
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Running Locally

Start the Vite development server:
```bash
npm run dev
```

Open your browser at `http://localhost:5173` (or the port shown in your terminal).

### Building for Production

Compile and bundle the project:
```bash
npm run build
```

Preview the production build locally:
```bash
npm run preview
```

---

## 📂 Project Structure

```
y16Scoops/
├── public/
│   └── favicon.svg
├── src/
│   ├── assets/                 # High-resolution PNG flavor tub assets
│   │   ├── chocolateFlavor.png
│   │   ├── mangoFlavour.png
│   │   ├── pistaFlavor.png
│   │   ├── strawberryFlavour.png
│   │   └── vanillaFlavour.png
│   ├── App.jsx                 # Core component: state machine, 3D tubs, gesture engine
│   ├── index.css               # Design system tokens, responsive CSS media queries
│   └── main.jsx                # React application entry point
├── index.html                  # HTML template with Google Fonts
├── info.txt                    # Deep-dive logic & math-free architectural breakdown
├── package.json                # Project dependencies and npm scripts
├── vite.config.js              # Vite configuration
└── README.md                   # Project documentation
```

---

## 🧠 Architectural Overview

### 1. The 3D Stacking Formula (`delta`)
Every tub calculates its offset relative to the active index:
$$\text{delta} = \text{index} - \text{activeIndex}$$

- **`delta === 0` (Active)**: Centered, scale `1.1` (desktop) or `1.0` (mobile), rotation `0°`, top z-index `20`.
- **`delta < 0` (Past)**: Offsets top-left, tilts backward (`-14°` to `-18°`), scales down, stacks behind.
- **`delta > 0` (Upcoming)**: Offsets bottom-right, tilts forward (`+12°` to `+14°`), scales down, stacks behind.

### 2. Spring Physics
Instead of linear durations, tub transitions use physical springs (`stiffness: 260`, `damping: 26`, `mass: 0.8`), producing natural deceleration and responsive weight.

### 3. Non-Blocking Gestures
Product tubs use `pointer-events: none` so mouse cursor position and touch contacts pass cleanly through to the gesture listeners without dead zones.

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
