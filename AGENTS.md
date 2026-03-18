# AGENTS.md

This file guides AI coding agents (Claude Code, Cursor, Gemini CLI, etc.) when working in this repository. Think of it as a **README for agents**: a predictable place for build steps, conventions, and instructions that help agents work effectively.

## Setup commands

- **Install dependencies (root):** `pnpm install`  
  Use **pnpm only** at the project root. Do not run `npm install` in the root—it can cause version mismatches.

- **Docs dev server:** `pnpm docs:dev`  
- **Docs build:** `pnpm docs:build`  
- **Docs preview:** `pnpm docs:preview`

- **PPT development (from root):**
  - Vibe Coding: `pnpm ppt:vibe`
  - Prompt: `pnpm ppt:prompt`
  - MCP: `pnpm ppt:mcp`
  - SKILL: `pnpm ppt:skill`
  - AGENT: `pnpm ppt:agent`
  - Build all PPTs: `pnpm ppt:build`

- **Examples (Vibe Coding demos):**  
  `cd ppts/vibe-coding/examples && npm install` then run e.g. `npm run demo:2.1`, `npm run demo:4.1`, etc. See `ppts/vibe-coding/examples/CLAUDE.md` for the full list.

- **MCP server example:** `cd examples/mcp-lab && npm install && npm start`  
- **Ollama example:** `cd examples/ollama-node && node api.js`

## Project overview

**Learn AI** is an educational platform for frontend engineers to learn AI concepts and integrate them into their workflows.

| Component        | Location   | Tech                          |
|-----------------|------------|-------------------------------|
| Documentation   | `/docs`    | VitePress 1.6.x + Vue 3       |
| Presentations   | `/ppts`    | Slidev 0.52.x (Seriph theme)  |
| Examples        | `/examples`, `ppts/vibe-coding/examples` | Node.js, TypeScript (ESM) |

PPT packages under `ppts/*` are independent Slidev projects, each with its own `package.json`; they use **npm** inside those directories. The root repo uses **pnpm** and `"type": "module"`.

## Code style

- **Language:** All repository content (docs, code comments, commit messages, file content) must be in **English only**.
- **Modules:** ES modules only (`import`/`export`). Root has `"type": "module"`; no `require()`.
- **Package manager:** pnpm at root; npm only inside `ppts/*` and example subprojects where they are standalone.

## Build and deployment

- **CI workflow:** `.github/workflows/deploy.yml` (runs on push to `master`).
- **Steps:** `pnpm install` → `pnpm docs:build` → `pnpm ppt:build` → copy `docs/.vitepress/dist` and each `ppts/*/dist` into `final_dist/` → deploy to gh-pages.
- **Base paths (critical):**
  - VitePress: `base: '/learn-ai/'` in `docs/.vitepress/config.mjs`.
  - Each PPT: `slidev build --base /learn-ai/ppts/<name>/` (e.g. `vibe-coding`, `prompt`, `mcp`, `skill`, `agent`).  
  Wrong base paths break CSS/JS on GitHub Pages.

**Deployed URLs:**

- Docs: `https://blog.zenheart.site/learn-ai/`
- PPTs: `https://blog.zenheart.site/learn-ai/ppts/vibe-coding/`, `.../prompt-context/`, `.../mcp/`, `.../skill/`, `.../agent/`

## Development workflows

### Adding documentation

1. Add `.md` files under the right `docs/` section (`tech/`, `integration/`, `products/`, etc.).
2. **Manually** update the sidebar in `docs/.vitepress/config.mjs`—sidebar is explicit, not auto-generated. Use nested `items` for hierarchy.
3. Verify with `pnpm docs:dev` at http://localhost:5173.

### Adding or editing presentation slides

- Entry points: `ppts/vibe-coding/slides.md`, `ppts/prompt-context/slides.md`, `ppts/mcp/slides.md`, `ppts/skill/slides.md`, `ppts/agent/slides.md`.
- Edit the corresponding slide modules or include new ones in the main `slides.md`.

## Testing and validation

- Root repo has no `pnpm test` script. For **Vibe Coding examples**, run the demos (e.g. `npm run demo:2.1`, `npm run demo:4.2`) from `ppts/vibe-coding/examples` to validate.
- After changing docs or cross-links, run `pnpm docs:build` to catch build errors. VitePress ignores `/learn-ai/ppts/` in dead-link checks (PPTs are built separately); verify PPT links manually after deployment if needed.

## Security and environment

- Do not add or commit secrets or API keys. Use environment variables or `.env` (and keep `.env` out of version control).
- Dependencies: install only with **pnpm** at root to respect lockfile and `packageManager`; use npm only inside `ppts/*` and example dirs where those are standalone projects.

## PR and commit guidelines

- Use **English** for all commit messages and PR titles/descriptions.
- Before committing, run `pnpm docs:build` and `pnpm ppt:build` from the root to ensure the site and all PPTs build successfully.

## Nested AGENTS.md / CLAUDE.md

- **Root:** This file applies to the whole repo.
- **Subprojects:** `ppts/vibe-coding/examples/` has its own `CLAUDE.md` with demo commands and structure. For work limited to that directory, agents can use the nearest guidance (nested file takes precedence for that subtree).
