# GEMINI.md

## Project Overview

**Learn AI** is a comprehensive educational platform designed to bridge the gap between frontend development and Artificial Intelligence. It empowers frontend engineers to master AI concepts and integrate them into their workflows.

**Core Components:**
*   **Documentation Site:** Built with VitePress (`/docs`).
*   **Interactive Presentations:** Built with Slidev (`/ppts`), covering Prompt Engineering and MCP.
*   **Practical Examples:** Node.js/TypeScript implementations of MCP servers and local LLM usage (`/examples`).

**Technology Stack:**
*   **Documentation:** VitePress 1.6.4 + Vue 3
*   **Presentations:** Slidev 0.49.0
*   **Runtime:** Node.js (ES Modules)
*   **Package Manager:** `pnpm` (Root), `npm` (within `ppts/*` directories)

## Building and Running

### Prerequisites
*   Node.js 18+
*   pnpm 9.15.4+

### Documentation (VitePress)

Run these commands from the project root:

```bash
# Start development server
pnpm docs:dev

# Build for production
pnpm docs:build

# Preview production build
pnpm docs:preview
```

### Presentations (Slidev)

Presentations are independent packages located in `ppts/`.

```bash
# Develop Prompt Engineering Course
pnpm ppt:prompt

# Develop MCP Protocol Deep Dive
pnpm ppt:mcp
```

### Examples

**MCP Lab (`examples/mcp-lab`):**
A tutorial Model Context Protocol server.

```bash
cd examples/mcp-lab
npm install
npm start
```

**Ollama Node (`examples/ollama-node`):**
Local LLM integration example.

```bash
cd examples/ollama-node
node api.js
```

## Development Conventions

### Language Policy
**Strictly English.** All documentation, comments, commit messages, and communication must be in English.

### Package Management
*   **Root:** Use `pnpm`. The project enforces `pnpm` via the `packageManager` field.
*   **Sub-projects (`ppts/*`):** Use `npm`. These are independent directories with their own `package.json` files and build processes.

### Architecture & Deployment
The project uses a **unified deployment strategy**:
1.  **VitePress** builds to `docs/.vitepress/dist`.
2.  **Slidev** presentations build to their respective `dist` folders within `ppts/`.
3.  **Deployment** involves merging these builds into a single structure where presentations are served under `/learn-ai/ppts/`.

**Important:**
*   VitePress `base` is set to `/learn-ai/`.
*   Slidev builds must use `--base /learn-ai/ppts/[name]/` to ensure assets load correctly on GitHub Pages.

### File Structure
*   `docs/`: Content for the documentation site.
    *   `tech/`: Core AI concepts (LLM, RAG, MCP).
    *   `products/`: Tools and applications (Cursor, Copilot, Ollama).
*   `ppts/`: Slidev presentation projects.
*   `examples/`: Runnable code examples.
*   `.github/workflows/`: CI/CD configuration.
