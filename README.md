# Loopmind Landing Page Starter

Minimal Next.js 15 foundation for building animated, high-performance landing pages. Pre-configured with GSAP, Framer Motion, Lenis smooth scroll, and Tailwind CSS v4 using Loopmind brand tokens.

## Quick Start

```bash
# Clone this starter into a new client directory
cp -r landing-pages/starter landing-pages/client-name

# Install dependencies
cd landing-pages/client-name
npm install

# Start dev server
npm run dev
```

## Stack

- **Next.js 15** (App Router, static export by default)
- **Tailwind CSS v4** with Loopmind brand tokens
- **GSAP + ScrollTrigger** for scroll-driven animations
- **Lenis** for buttery smooth scroll
- **Framer Motion** for component-level animations
- **Outfit + Space Grotesk** via next/font/google

## Motion Components

### `<Reveal>`
Fade + slide element into view on scroll.

```tsx
import { Reveal } from "@/components/motion/reveal";

<Reveal direction="up" delay={0.2} duration={0.6} once>
  <h2>Section Title</h2>
</Reveal>
```

Props: `direction` (up/down/left/right), `delay`, `duration`, `once`, `className`

### `<StaggerContainer>` + `<StaggerItem>`
Stagger children entrance sequentially.

```tsx
import { StaggerContainer, StaggerItem } from "@/components/motion/stagger-container";

<StaggerContainer staggerDelay={0.1}>
  <StaggerItem><Card /></StaggerItem>
  <StaggerItem><Card /></StaggerItem>
  <StaggerItem><Card /></StaggerItem>
</StaggerContainer>
```

Props (container): `staggerDelay`, `direction`, `once`, `className`

### `<Parallax>`
Move element at different scroll speed for depth effect.

```tsx
import { Parallax } from "@/components/motion/parallax";

<Parallax speed={0.5}>
  <img src="/bg-element.svg" alt="" />
</Parallax>
```

Props: `speed` (0.1-2.0, where 1 = normal scroll speed), `className`

## Brand Tokens (CSS Variables)

```css
--color-accent: #E42208       /* Loopmind red */
--color-accent-deep: #400101  /* Deep red */
--color-surface: #0a0a0a      /* Background */
--color-surface-elevated: #141414
--color-text-primary: #fafafa
--color-text-secondary: #a1a1aa
```

Also available as Tailwind utilities: `bg-accent`, `text-accent`, `bg-surface`, etc.

## Deployment

### Cloudflare Pages (default)
```bash
npm run build
# Deploy the `out/` directory to Cloudflare Pages
```

### Vercel
Remove `output: 'export'` and `images: { unoptimized: true }` from `next.config.ts`, then deploy via Vercel CLI or Git integration.

## Accessibility

- All motion respects `prefers-reduced-motion` automatically
- Lenis smooth scroll is disabled for users who prefer reduced motion
- Framer Motion components render without animation for reduced-motion users
