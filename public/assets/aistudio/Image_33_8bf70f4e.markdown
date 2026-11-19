---
name: Luminous Scholar
colors:
  surface: '#faf8ff'
  surface-dim: '#d2d9f4'
  surface-bright: '#faf8ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f3ff'
  surface-container: '#eaedff'
  surface-container-high: '#e2e7ff'
  surface-container-highest: '#dae2fd'
  on-surface: '#131b2e'
  on-surface-variant: '#3e4a3d'
  inverse-surface: '#283044'
  inverse-on-surface: '#eef0ff'
  outline: '#6e7a6c'
  outline-variant: '#bdcaba'
  surface-tint: '#006e2c'
  primary: '#006e2c'
  on-primary: '#ffffff'
  primary-container: '#30b155'
  on-primary-container: '#003c15'
  inverse-primary: '#63df7c'
  secondary: '#516600'
  on-secondary: '#ffffff'
  secondary-container: '#d0eb78'
  on-secondary-container: '#556a00'
  tertiary: '#6f5c36'
  on-tertiary: '#ffffff'
  tertiary-container: '#b0986d'
  on-tertiary-container: '#41300f'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#80fc96'
  primary-fixed-dim: '#63df7c'
  on-primary-fixed: '#002108'
  on-primary-fixed-variant: '#00531f'
  secondary-fixed: '#d2ee7b'
  secondary-fixed-dim: '#b7d162'
  on-secondary-fixed: '#171e00'
  on-secondary-fixed-variant: '#3d4d00'
  tertiary-fixed: '#fbdfaf'
  tertiary-fixed-dim: '#ddc395'
  on-tertiary-fixed: '#261900'
  on-tertiary-fixed-variant: '#564421'
  background: '#faf8ff'
  on-background: '#131b2e'
  surface-variant: '#dae2fd'
typography:
  display-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 3rem
    fontWeight: '800'
    lineHeight: 3.5rem
    letterSpacing: -0.03em
  display-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 2.25rem
    fontWeight: '800'
    lineHeight: 2.75rem
    letterSpacing: -0.025em
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 2rem
    fontWeight: '700'
    lineHeight: 2.5rem
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 1.75rem
    fontWeight: '700'
    lineHeight: 2.25rem
    letterSpacing: -0.015em
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 1.5rem
    fontWeight: '600'
    lineHeight: 2rem
    letterSpacing: -0.015em
  title-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 1.125rem
    fontWeight: '600'
    lineHeight: 1.625rem
    letterSpacing: -0.01em
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 1rem
    fontWeight: '400'
    lineHeight: 1.5rem
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 0.875rem
    fontWeight: '400'
    lineHeight: 1.375rem
  label-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 0.875rem
    fontWeight: '600'
    lineHeight: 1.25rem
    letterSpacing: 0.01em
  label-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 0.75rem
    fontWeight: '500'
    lineHeight: 1rem
    letterSpacing: 0.02em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1.5rem
  gutter-mobile: 1rem
  margin: 2rem
  margin-mobile: 1.25rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
---

## Brand & Style

This design system establishes an intelligent, clean, and optimistic environment for next-generation education management. Engineered for administrative precision and pedagogical clarity, the aesthetic balances modern enterprise reliability with organic, vibrant vitality.

The visual direction pairs pure white surfaces and soft cream foundations with energetic botanical greens. The atmosphere is structured yet inviting: layered cards with hairline borders, hyper-subtle diffuse elevation, and focused crystalline elements that eliminate visual friction for students, educators, and institutional operators.

## Colors

The palette leverages a calibrated progression of verdant tones paired with warm light bases and disciplined slate values.

- **Primary Canvas & Surfaces:** Pure White (`#FFFFFF`) forms the foundational card plane, complemented by subtle off-canvas panels tinted with Warm Cream (`#FFFDF8` to `#FFE3B3`).
- **Brand Spectrum:** Active accents transition across Lime Green (`#C2DD6C`), Fresh Green (`#79CE67`), and foundational Emerald Green (`#30B155`). Linear gradients flow at an angle of 135deg from `#C2DD6C` through `#79CE67` into `#30B155` for high-impact action triggers.
- **Typography & Content:** High-clarity Slate 900 (`#0F172A`) for primary hierarchy and Slate 800 (`#1E293B`) for body readability. Secondary descriptions sit comfortably in Slate 500 (`#64748B`).
- **Structural Lines:** Deliberate, soft borders defined at Slate 200 (`#E2E8F0`) maintain spatial boundaries without visual weight.

## Typography

The type architecture standardizes on **Plus Jakarta Sans**, offering geometric precision paired with humanized terminals. 

- Large scale headings rely on tight negative tracking (`-0.02em` to `-0.03em`) to produce authoritative, confident presence on auth panels and portal entryways.
- Body levels maintain standard neutral tracking for high legibility across dense dashboard elements and authentication prompts.
- Labels and microcopy use deliberate weight contrast (`600` semi-bold and `500` medium) with slight positive tracking to ensure critical statuses and field descriptions are immediately parsed.

## Layout & Spacing

This design system uses an adaptable 12-column responsive fluid grid structured around an 8pt mathematical rhythm.

- **Canvas & Grids:** Desktop experiences employ a 12-column layout framed with a `2rem` safe outer margin and `1.5rem` gutters. Tablet adjusts to an 8-column system with `1.25rem` gutters, while mobile operates on a single-column or 4-column flow with `1rem` gutters.
- **Login Layout Configuration:** Centered auth shells are contained within a rigid max-width of `440px` (or a split-panel screen reaching max `1120px` split equally into an art board and an action container).
- **Internal Component Spacing:** Element clustering follows strict vertical cadence. Field labels sit `0.5rem` (`space-sm`) above inputs; adjacent inputs break with `1rem` (`space-md`); major logical segments separate with `1.5rem` (`space-lg`) to `2.5rem` (`space-xl`).

## Elevation & Depth

Spatial layering relies on a compound strategy of micro-diffuse shadows, semi-translucent backdrops, and crisp perimeter borders.

- **Flat Canvas:** The default backdrop sits at level 0, using off-white or a faint multi-stop radial wash of cream and fresh lime at 3% opacity.
- **Surface Elevation (Cards & Panels):** Auth modules and card components incorporate a dual-layer shadow:
  - Base contact: `0px 1px 3px rgba(15, 23, 42, 0.04)`
  - Ambient dispersion: `0px 20px 40px -12px rgba(15, 23, 42, 0.07)`
- **Glassmorphic Accents:** Secondary floating banners and contextual notifications utilize frosted glass layering: `rgba(255, 255, 255, 0.82)` background, `backdrop-filter: blur(12px)`, backed by a `1px` border of `rgba(255, 255, 255, 0.6)`.
- **Structural Outlines:** Every card elevation retains a baseline `1px` solid outline of `#E2E8F0` to preserve boundary fidelity against high-brightness displays.

## Shapes

The design system adopts a refined, accessible geometry focused on `rounded-xl` structures for interactable elements.

- **Interactive Controls (Inputs, Selects, Buttons):** Standardize strictly on `rounded-xl` (`1.5rem` / `24px` border radius in this system's scale tokens) to present approachable, modern tactile touchpoints.
- **Containers & Surfaces:** Main credential cards and visual hero containers scale to `rounded-xl` (up to `1.5rem` / `24px`), establishing a cohesive perimeter contour.
- **Micro Elements (Chips, Badges):** Retain a pill-shape profile (`9999px`) to distinguish categorical tags and notification counters from standard input geometry.

## Components

### Buttons
- **Primary Action (Vibrant Gradient):** Built with an angled linear gradient (`135deg, #C2DD6C 0%, #79CE67 52%, #30B155 100%`). High-contrast Slate 900 (`#0F172A`) or Pure White (`#FFFFFF`) text with `font-weight: 600`. Outer radius is fixed at `rounded-xl`. Resting shadow: `0px 8px 20px -4px rgba(48, 177, 85, 0.35)`. On hover, scale shifts subtly to `1.01` with increased saturation and bloom: `0px 12px 24px -4px rgba(48, 177, 85, 0.45)`.
- **Secondary / Outline:** Background of `#FFFFFF`, bordered with `1.5px solid #E2E8F0`, text colored `#1E293B`. Hover transitions surface to `rgba(255, 227, 179, 0.15)` with border shifting to `#30B155`.
- **Ghost:** Zero border, `#1E293B` text, background hovering to `rgba(15, 23, 42, 0.04)`.

### Input Fields
- **Container Structure:** Standard height of `48px` to `52px` utilizing `rounded-xl` (`1.5rem`).
- **Base State:** Background `#FFFFFF`, border `1px solid #E2E8F0`, placeholder text `#94A3B8`.
- **Active / Focus State:** Smooth transition to an inner ring and border shift to `#30B155` accompanied by an ambient emerald glow: `box-shadow: 0 0 0 4px rgba(48, 177, 85, 0.12)`.
- **Trailing / Leading Icons:** Sized to `20px` in `#64748B`, shifting to `#30B155` during active input focus.

### Checkboxes & Radio Controls
- **Geometry:** Checkboxes use `rounded-md` (`0.375rem`), radios use full circle (`rounded-full`).
- **States:** Inactive borders sit at `1.5px solid #CBD5E1`. Checked state initiates a solid `#30B155` fill featuring a crisp white stroke icon, with an elevation glow of `0 0 0 3px rgba(48, 177, 85, 0.15)`.

### Cards & Login Shell
- **Structure:** Crisp white background `#FFFFFF`, bordered completely with `1px solid #E2E8F0`.
- **Padding:** Mobile auth cards utilize `1.5rem` internal padding; desktop cards use `2.5rem`.
- **Elevation:** Layered with ambient diffuse shadows (`0 20px 40px -12px rgba(15, 23, 42, 0.07)`).

### Contextual Chips & Indicators
- **Role Pills (Student, Faculty, Admin):** Background `#FFFDF8`, bordered with `1px solid #FFE3B3`, text in `#0F172A` at `label-sm`.
- **AI Status Indicators:** Frosted surface with a pulsating `8px` dot fueled by `#30B155` indicating active platform connectivity.