# AGENTS.md

This file provides guidance to AI agents (Claude Code, Gemini CLI, etc.) when working with code in this repository.

## Language Policy

**IMPORTANT**: All content in this repository must be written in **English only**.

When working with this repository:

- Write all documentation in English
- Write all code comments in English
- Write all commit messages in English
- Write all file content in English
- Use English for all communication and explanations

This ensures consistency and makes the project accessible to the global developer community.

## Project Overview

**Learn AI** is a comprehensive educational platform designed to bridge the gap between frontend development and Artificial Intelligence. It empowers frontend engineers to master AI concepts and integrate them into their workflows.

**Core Components:**

- **Documentation Site:** Built with VitePress (`/docs`).
- **Interactive Presentations:** Built with Slidev (`/ppts`), covering Prompt Engineering and MCP.
- **Practical Examples:** Node.js/TypeScript implementations of MCP servers and local LLM usage (`/examples`).

## Technology Stack

- **Documentation:** VitePress 1.6.4 + Vue 3
- **Presentations:** Slidev 0.49.0
- **Runtime:** Node.js (ES Modules)
- **Package Manager:**
  - `pnpm` (Root) - Enforced via `packageManager` field.
  - `npm` (within `ppts/*` directories) - Independent build processes.

## Essential Commands

### Documentation Development (VitePress)

Run these commands from the project root:

```bash
# Start docs dev server
pnpm docs:dev

# Build docs to docs/.vitepress/dist
pnpm docs:build

# Preview built docs
pnpm docs:preview
```

### Presentation Development (Slidev)

Presentations are independent packages located in `ppts/`.

```bash
# Develop Prompt Engineering Course
pnpm ppt:prompt

# Develop MCP Protocol Deep Dive
pnpm ppt:mcp

# Build presentations (from within ppts/prompt or ppts/mcp)
cd ppts/prompt && npm run build  # Outputs to ppts/prompt/dist
cd ppts/mcp && npm run build     # Outputs to ppts/mcp/dist
```

### MCP Server Example

```bash
# Run the tutorial MCP server
cd examples/mcp-lab
npm install
npm start

# Or use as binary (after npm install)
mcp-lab-server
```

**Ollama Node Example (`examples/ollama-node`):**

```bash
cd examples/ollama-node
node api.js
```

## Architecture

### Multi-Component Build System

The project uses a **unified deployment architecture** where three independent components are built separately then merged:

1. **VitePress Documentation** (`/docs`) - Main documentation site
2. **Prompt Engineering PPT** (`/ppts/prompt`) - Slidev presentation with independent package.json
3. **MCP Protocol PPT** (`/ppts/mcp`) - Slidev presentation with independent package.json

**Critical Build Detail**: Each presentation has its own `package.json` and runs `slidev build --base /learn-ai/ppts/[name]/` to ensure correct path resolution when deployed.

### GitHub Actions Deployment Pipeline

Workflow location: `.github/workflows/deploy.yml`

**Deployment Steps**:

1. Build VitePress docs → `docs/.vitepress/dist`
2. Build each PPT independently → `ppts/*/dist`
3. Merge all into `final_dist/`:
    - Copy docs → `final_dist/`
    - Copy prompt PPT → `final_dist/ppts/prompt/`
    - Copy MCP PPT → `final_dist/ppts/mcp/`
4. Add `.nojekyll` to prevent GitHub Pages Jekyll processing
5. Deploy `final_dist/` to gh-pages branch

**Deployed URLs**:

- Docs: `https://blog.zenheart.site/learn-ai/`
- Prompt PPT: `https://blog.zenheart.site/learn-ai/ppts/prompt/`
- MCP PPT: `https://blog.zenheart.site/learn-ai/ppts/mcp/`

### Content Organization Philosophy

```bash
docs/
├── tech/                    # Core AI technical concepts
│   ├── index.md            # Tech stack overview
│   ├── LLM.md              # Large Language Model fundamentals
│   ├── context.md          # Context window management
│   ├── prompt/             # Prompt engineering techniques
│   │   ├── agents-doc.md   # Agent documentation
│   │   └── cases/          # Real-world prompt cases
│   ├── agent/              # Agent architecture
│   │   ├── index.md        # Agent patterns (ReAct, Plan-Execute, Tool-Use)
│   │   ├── skills.md       # Agent skills/capabilities
│   │   └── hooks.md        # Agent hooks
│   ├── MCP.md              # Model Context Protocol
│   ├── RAG.md              # Retrieval-Augmented Generation
│   ├── embeddings.md       # Vector databases & embeddings
│   └── SFT.md              # Supervised Fine-Tuning
└── products/               # AI tools and applications
    ├── ai-coding/          # AI-powered coding assistants
    │   ├── cursor.md
    │   ├── copilot.md
    │   ├── claude-cli.md
    │   ├── gemini-cli.md
    │   └── othertools.md
    └── tools/
        └── ollama.md       # Local LLM setup

ppts/
├── prompt/                 # Prompt Engineering course
│   ├── slides.md          # Main entry point
│   ├── 01.prepare.md      # Prerequisites
│   ├── 02.PE.md           # PE overview
│   ├── 03.skill.md        # Techniques summary
│   ├── 04.case.md         # Practical cases
│   └── 05.QA.md           # Q&A
└── mcp/                    # MCP Protocol deep-dive
    └── slides.md          # Main entry point

examples/
├── mcp-lab/               # Tutorial-grade MCP server
│   └── src/index.js      # Server implementation with add/read_file_summary tools
└── ollama-node/          # Local LLM integration
    └── api.js            # Basic Ollama API usage example
```

## Development Workflows

### Adding Documentation

1. Create `.md` file in appropriate `docs/` subdirectory (`tech/` or `products/`)
2. Update `docs/.vitepress/config.js` sidebar configuration manually:
    - Sidebar structure is explicitly defined in the config, not auto-generated
    - Add new entries under the appropriate section (`Tech Stack` or `Products`)
    - Use nested `items` arrays for hierarchical navigation
3. Test locally with `pnpm docs:dev` at <http://localhost:5173>
4. Commit - deployment is automatic via GitHub Actions to gh-pages branch

### Adding Presentation Slides

**Prompt Engineering PPT**:

- Main entry: `ppts/prompt/slides.md`
- Modular structure: Includes `01.prepare.md`, `02.PE.md`, etc.
- Theme: Seriph

**MCP PPT**:

- Main entry: `ppts/mcp/slides.md`
- Theme: Seriph

To add slides, edit the modular `.md` files or update `slides.md` to include new modules.

## Important Implementation Notes

### Path Resolution

All builds must use correct `--base` flags:

- VitePress: `base: '/learn-ai/'` in config
- Prompt PPT: `slidev build --base /learn-ai/ppts/prompt/`
- MCP PPT: `slidev build --base /learn-ai/ppts/mcp/`

Incorrect base paths will break CSS/JS loading on GitHub Pages.

### Dead Link Checking

VitePress dead link checker ignores `/learn-ai/ppts/` paths because PPTs are built externally. When adding cross-references between docs and PPTs, verify links manually after deployment.

### ES Module Configuration

Root `package.json` has `"type": "module"`. All JavaScript files use ES module syntax (`import`/`export`, not `require`).

### Package Manager Enforcement

Use `pnpm` exclusively for root dependencies. Running `npm install` in the root may cause version mismatches.

**Exception**: The PPT subdirectories (`ppts/prompt/`, `ppts/mcp/`) use `npm` directly as they are independent Slidev projects. This is intentional and required by the build process.
