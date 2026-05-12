# Portfolio OS

A premium engineering workspace portfolio built as a calm, spatial, UNIX-inspired operating environment.

The system is designed to feel:
- intellectually mature
- visually restrained
- technically deep
- product-oriented
- cinematic but calm

NOT:
- cyberpunk
- hacker aesthetic
- fake terminal simulator
- generic portfolio website

---

# Core Philosophy

The portfolio should feel like:
- a real operating environment
- premium engineering tooling
- a spatial productivity workspace
- a product built with long-term architectural thinking

The interaction philosophy is heavily inspired by:
- macOS spatiality
- Linear polish
- Arc Browser restraint
- modern UNIX workstation aesthetics
- cinematic interface systems

---

# Tech Stack

## Framework
- Next.js App Router
- React
- TypeScript

## Styling
- TailwindCSS v4
- Hybrid token-based CSS variable system

## State
- Zustand

## Motion
- Motion (Framer Motion successor)

## Window Resize
- re-resizable

## Icons
- Lucide Icons initially
- custom ultra-thin icon system later

---

# Design System

## Visual Direction

Current visual language:
- matte black workspace
- restrained gradients
- premium glass surfaces
- subtle lighting
- low-opacity borders
- layered depth
- editorial spacing
- cinematic calmness

NOT:
- neon
- overdone glow
- flashy gradients
- fake hacker effects

---

# Typography System

Typography philosophy:
- editorial
- cinematic
- premium
- restrained
- adaptive

Current setup:
- premium sans hierarchy
- responsive clamp typography
- handwritten accent typography
- fluid typography scaling

Typography adapts to:
- window size
- content density
- responsive layouts

NOT viewport-only responsiveness.

---

# Architecture

## Folder Structure

```txt
src/
│
├── app/
│
├── components/
│   ├── ui/
│   └── workspace/
│
├── store/
│
├── styles/
│
├── lib/
│
├── data/
│
└── types/
```

Architecture goals:
- minimal
- scalable
- modular
- understandable
- production-oriented

Avoid over-engineering.

---

# Current Implemented Systems

# Workspace Engine

Implemented:
- multi-window architecture
- draggable windows
- resizable windows
- z-index focus system
- centered spawning
- dynamic window creation
- close window system
- focus-on-click behavior

Status:
Stable foundation.

---

# Dock System

Implemented:
- floating dock
- hover scaling
- motion interpolation
- active indicators
- glass blur styling
- workspace-aware positioning

Status:
Good foundation.

Still needed:
- smoother proximity scaling
- inertia tuning
- dock magnification physics
- better interpolation

---

# Window System

Implemented:
- premium glass windows
- spatial depth
- smooth spawn animation
- smooth close animation
- inactive window dimming
- responsive typography
- resize handles
- motion transitions

Status:
Functional but needs refinement.

Still needed:
- resize polish
- edge constraints
- snap behavior
- maximize/minimize
- workspace boundaries
- momentum tuning

---

# Motion System

Implemented:
- smooth spring motion
- dock animation
- window spawn/exit transitions
- draggable inertia

Still needed:
- shared layout transitions
- velocity-aware movement
- motion hierarchy
- cursor-reactive motion
- hover field interactions
- advanced interpolation

---

# Visual Environment

Implemented:
- layered gradients
- matte-black atmosphere
- subtle depth
- restrained transparency

Still needed:
- animated ambient gradients
- procedural noise texture
- environmental movement
- reactive lighting
- parallax depth
- time/date environment
- Rainmeter-inspired ambient systems

---

# State Architecture

Implemented:
- Zustand workspace store
- focus management
- resize state
- window management
- z-index architecture

Still needed:
- persistence
- saved layouts
- workspace restoration
- dock persistence

---

# Current UI Systems

Implemented:
- floating dock
- draggable windows
- responsive typography
- glass panels
- layered workspace
- cinematic spacing
- adaptive typography scaling

Still placeholder:
- about content
- projects
- experience
- terminal content

---

# Terminal Philosophy

The terminal should feel like:
- premium engineering tooling
- refined UNIX workstation
- modern development environment

NOT:
- fake hacking simulator
- matrix effects
- cringe terminal roleplay

Planned commands:
- whoami
- projects
- skills
- contact
- resume
- experience
- stack
- architecture
- clear
- help

Later:
- autocomplete
- command history
- workspace integration
- AI-assisted tooling

---

# Content Philosophy

The portfolio follows layered information architecture.

## Layer 1
Recruiter readability.

Quick understanding:
- what it is
- what it solves
- impact
- stack snapshot

## Layer 2
Technical curiosity.

Engineering storytelling:
- architecture decisions
- scaling logic
- tradeoffs
- design thinking

## Layer 3
Deep engineering.

Expandable:
- infra diagrams
- optimization systems
- pipelines
- caching
- architecture maps
- benchmarks

Goal:
Communicate production-grade engineering ability without feeling like thesis documentation.

---

# NOT IMPLEMENTED YET

## Terminal Engine
- command parser
- command registry
- history system
- prompt engine
- keyboard navigation
- realistic terminal interactions

## Workspace Systems
- command palette
- spotlight search
- keyboard shortcuts
- snapping
- desktop icons
- app switching

## Project Architecture
- real projects
- case study system
- technical deep-dives
- cinematic previews
- architecture diagrams

## Ambient Systems
- moving gradients
- procedural noise
- subtle environmental motion
- reactive lighting

## Responsiveness
- mobile adaptation
- tablet workspace logic
- touch optimization

## Optimization
- lazy loading
- motion optimization
- GPU acceleration tuning
- resize throttling

## Accessibility
- keyboard navigation
- focus rings
- reduced motion support
- semantic improvements

---

# Current MVP Status

## Completed
- workspace architecture
- multi-window system
- draggable windows
- resizable windows
- dock system
- motion foundation
- typography foundation
- glass visual system
- focus system
- z-index management
- close/open window system

## Current Priority
Build actual portfolio intelligence.

Next:
- terminal system
- real content
- project architecture
- engineering storytelling
- case-study engine

---

# Immediate Next Tasks

## Phase 1
1. Resize polish
2. Dock physics refinement
3. Terminal window
4. Command engine
5. Real about content
6. Project architecture
7. Experience system

## Phase 2
1. Ambient environment
2. Workspace persistence
3. Keyboard navigation
4. Spotlight search
5. Motion refinement

## Phase 3
1. Mobile adaptation
2. Performance optimization
3. Accessibility
4. Advanced spatial systems
5. Production deployment polish

---

# Important Constraints

DO NOT:
- add unnecessary abstractions
- create massive folder complexity
- use cyberpunk visuals
- add fake terminal gimmicks
- overuse glow effects
- clutter layouts

ALWAYS:
- maintain restraint
- prioritize polish
- think product-first
- preserve calmness
- preserve readability
- build scalable systems
- optimize interaction feel
- prefer spatial clarity over spectacle

## Performance + Motion Constraints

The entire workspace must feel native at high refresh rates (120Hz / 144Hz / 165Hz+).

All interactions should prioritize:
- frame stability
- motion smoothness
- GPU-accelerated transforms
- low input latency
- minimal layout thrashing
- efficient rendering paths

ALWAYS:
- animate with transform + opacity only whenever possible
- avoid expensive repaint-heavy effects
- use motion values instead of unnecessary React state updates
- throttle resize computations
- minimize blur layers stacking
- avoid unnecessary re-renders
- prefer translate3d() / GPU compositing paths
- optimize for sustained smoothness under multiple open windows

The workspace should feel:
- physically responsive
- immediate
- fluid under pressure
- native-like on high refresh-rate monitors

NOT:
- sluggish
- floaty
- delayed
- animation-heavy for no reason
- over-smoothed