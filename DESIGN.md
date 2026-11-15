---
version: alpha
name: Fire Atlas
description: A cartographic field notebook for exploring global fire activity.
colors:
  canvas: "#E7EFF1"
  surface: "#F8FBFC"
  header: "#103B4A"
  ink: "#102F3B"
  muted: "#506772"
  accent: "#A8401C"
  link: "#0B6474"
  rule: "#BED0D5"
typography:
  sans:
    fontFamily: "Space Grotesk Variable, Space Grotesk, system-ui, sans-serif"
  mono:
    fontFamily: "IBM Plex Mono, ui-monospace, monospace"
rounded:
  DEFAULT: "10px"
  logo: "12px"
  badge: "999px"
spacing:
  gap: "16px"
  page-max: "1100px"
components:
  button: {}
  card: {}
  map: {}
  navigation: {}
---

# Fire Atlas Design System

## Overview

### Creative North Star

A working atlas: mapped evidence, clear instrument labels, and one orange signal for action. The grid and flame mark is the visual signature. It is not a map pin or a live-fire warning symbol.

### Product context and register

- **Audience and primary job:** People comparing fire activity across places and years, with a clear account of uncertainty and satellite changes.
- **Market and locale:** Global English-language scientific explorer. No country-specific workflow is assumed.
- **Usage scene:** Desktop map exploration with a usable narrow-screen analysis view; historical records must remain legible offline.
- **Register:** Product UI across Explore, 2012 switch, Validation, and Method.
- **Restraint:** Charts, legends, uncertainty, and map colour meanings carry scientific information and should not become decorative.
- **Brand boundaries:** Keep NASA marks out of the interface and make the atlas's independent identity clear.
- **Token ownership:** `web/src/theme/tokens.css` is the runtime source of truth. This document records its roles. `web/src/theme/useTheme.js` reads the tokens for canvas and map rendering; `web/src/styles/layout.css` uses them for layout.

## Colors

The screen canvas is mineral blue gray, with near-white panels and a deep blue map-instrument header. Orange is reserved for the brand mark, selection, and active actions. Teal identifies links and keyboard focus. Scientific fire ramps, month classes, recent detections, and no-data hatching remain separate semantic scales in `tokens.css`.

## Typography

Space Grotesk handles navigation, prose, and strong page headings. IBM Plex Mono handles coordinates, dates, and numeric readouts. Both fonts are bundled for offline use. Labels use sentence case; numeric values remain tabular.

## Layout

Explore uses a map and analysis split on wide screens. Navigation shows text alongside icons instead of relying on hover. At narrow widths the map and analysis stack, with persistent labels under the icons. Content pages use a maximum width of 1100px.

## Elevation & Depth

The header uses a restrained shadow to separate it from the map. Panels use borders and tonal differences. Menus and overlays retain their existing elevation so their interactive layer is clear.

## Shapes

Controls and cards use the 10px radius token. The logo tile is 12px, and small status badges remain pills. Map cells and charts retain their original geometry.

## Components

### Foundational visual states

Interactive controls keep visible focus, selected, disabled, and busy treatments. Warnings pair colour with text. Loading and failure messages stay in the page's existing status regions.

### Buttons and actions

The dark action button is primary; the orange state marks a selected or active action. Ghost actions remain bordered. The brand lockup remains a home-and-refresh button.

### Navigation and data display

The dark header contains the mark, name, record status, and four labeled destinations. The current destination has a light field and orange underline. Evidence cards retain their qualifiers beside the values.

### Forms and overlays

The existing native selects, search behavior, map overlays, and keyboard controls remain canonical. The redesign does not change their data or navigation contracts.

### Iconography

The four existing line icons identify destinations. Text labels remain visible. The new SVG mark uses a map grid and an orange flame with a light core.

### Motion

Only existing short state transitions remain. `prefers-reduced-motion` removes them.

### Content and data visualization

Hotspots are gridded detections, not separate fires. No-data remains distinct from zero. The method and validation pages retain uncertainty notes, source credits, and the NASA independence statement.
