# Learn AI — Custom VitePress Theme

Extends the VitePress default theme. All visual identity lives in **design
tokens**, so re-theming the whole site is a single-file edit.

## Layout

```
theme/
├── index.js              # entry — extends DefaultTheme, registers components/styles
├── styles/
│   ├── index.css         # ordered @import aggregator (add new modules here)
│   ├── vars.css          # ⭐ SINGLE SOURCE OF TRUTH — brand tokens + VitePress overrides
│   ├── components.css     # site-wide refinements (links, code, tables, focus rings)
│   ├── home.css           # home-layout-only polish (hero, feature cards)
│   └── mermaid.css        # diagram styling (inherits the brand tokens)
├── components/            # global Vue components (LearningPath, AIToolsGallery, ToolCard)
├── layouts/               # custom page layouts (ai-tools)
└── data/                  # static data for components
```

## Re-theming (configurability)

Edit **only** the Layer-1 block in [`styles/vars.css`](styles/vars.css):

- `--la-brand-light-*` / `--la-brand-dark-*` — the brand ramp (dark→light, 1→3).
  `-1` is link/text colour (keep ≥ 4.5:1 on its background); `-3` is the solid
  button fill.
- `--la-brand-rgb` — RGB form of the `-3` fill; drives soft fills and glows.
- `--la-accent-from` / `--la-accent-to` — hero-wordmark gradient endpoints.

Everything else (VitePress `--vp-c-brand-*`, buttons, hero, callouts, mermaid,
the `LearningPath` timeline accent) derives from those tokens automatically.

Three ready-to-paste alternate palettes (**Violet**, **Emerald**, **Sunset**)
sit at the bottom of `vars.css` — copy one over the Layer-1 block to switch
brands in seconds.

The current brand is **blue** (`#3b82f6`), matching the slate-and-blue palette
used across the Slidev PPTs.

## Adding a style module

Create the file under `styles/`, then add an `@import` to `styles/index.css`
in the right order (tokens first, page-specific last).
