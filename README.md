# 🍨 Y16Scoops Creamery

> A modern, interactive, and gesture-driven 3D product showcase for an artisanal ice cream brand. Built with **React 19**, **Vite**, and **Framer Motion**, featuring physical spring animations, dynamic thematic color morphing, and a responsive mobile experience.

---
## ✨ Live Demo
 https://y16Scoops.vercel.app

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

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
