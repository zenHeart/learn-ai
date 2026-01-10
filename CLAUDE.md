# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

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

This is an AI learning resource platform combining VitePress documentation, Slidev presentations, and practical examples focused on AI development, Prompt Engineering, and MCP (Model Context Protocol) education.

**Technology Stack**: VitePress 1.6.4, Slidev 0.49.0, Vue 3, Node.js ES Modules
**Package Manager**: pnpm 9.15.4

## Essential Commands

### Documentation Development

```bash
# Start docs dev server (VitePress)
pnpm docs:dev

# Build docs to docs/.vitepress/dist
pnpm docs:build

# Preview built docs
pnpm docs:preview
```

### Presentation Development

```bash
# Develop Prompt Engineering PPT
pnpm ppt:prompt

# Develop MCP Protocol PPT
pnpm ppt:mcp

# Build presentations (from within ppts/prompt or ppts/mcp)
cd ppts/prompt && npm run build  # Outputs to ppts/prompt/dist
cd ppts/mcp && npm run build     # Outputs to ppts/mcp/dist
```

### MCP Server Example

```bash
# Run the tutorial MCP server
cd examples/mcp-lab
npm start

# Or use as binary (after npm install)
mcp-lab-server
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

### VitePress Configuration

Config location: `docs/.vitepress/config.js`

**Key Settings**:

- `base: '/learn-ai/'` - Required for GitHub Pages deployment
- `ignoreDeadLinks: [/^\/learn-ai\/ppts\//]` - PPTs built externally, links verified post-deployment
- Sidebar manually configured with explicit navigation structure

**Navigation Structure**:

- **Tech Stack** (`/tech/`) - Core AI concepts and technical deep-dives:
  - LLM fundamentals
  - Context Management (LLM context window handling)
  - Prompt Engineering (with case studies like Copilot)
  - Agent architecture (MCP protocol, Skills, Hooks)
  - RAG (Retrieval-Augmented Generation)
  - Vector Databases & Embeddings (semantic search, vector storage)
  - SFT (Supervised Fine-Tuning)
- **Products** (`/products/`) - Real-world AI tools and applications:
  - AI Coding tools (Cursor, Copilot, Claude CLI, Gemini CLI)
  - Development tools (Ollama for local LLMs)

### Content Organization Philosophy

```
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

### MCP Server Implementation Pattern

The `examples/mcp-lab` demonstrates standard MCP architecture:

```javascript
// Server setup with stdio transport
const server = new Server({ name: "...", version: "..." }, { capabilities: {...} });
const transport = new StdioServerTransport();
await server.connect(transport);

// Tool registration (ListToolsRequestSchema)
server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: [/* tool definitions with JSON schemas */]
}));

// Tool execution (CallToolRequestSchema)
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  // Validate params with Zod
  // Execute tool logic
  // Return { content: [{ type: "text", text: result }] }
});
```

**Educational Tools Implemented**:

- `add` - Basic arithmetic (demonstrates parameter validation)
- `read_file_summary` - File system interaction (demonstrates async operations and error handling)

## Development Workflows

### Adding Documentation

1. Create `.md` file in appropriate `docs/` subdirectory (`tech/` or `products/`)
2. Update `docs/.vitepress/config.js` sidebar configuration manually:
   - Sidebar structure is explicitly defined in the config, not auto-generated
   - Add new entries under the appropriate section (`Tech Stack` or `Products`)
   - Use nested `items` arrays for hierarchical navigation
3. Test locally with `pnpm docs:dev` at http://localhost:5173
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

### Testing Full Build Locally

```bash
# Build all components
pnpm docs:build
cd ppts/prompt && npm install && npm run build && cd ../..
cd ppts/mcp && npm install && npm run build && cd ../..

# Manually replicate GitHub Actions merge step
mkdir -p final_dist
cp -r docs/.vitepress/dist/* final_dist/
mkdir -p final_dist/ppts/prompt
cp -r ppts/prompt/dist/* final_dist/ppts/prompt/
mkdir -p final_dist/ppts/mcp
cp -r ppts/mcp/dist/* final_dist/ppts/mcp/
touch final_dist/.nojekyll

# Preview merged result (requires http server)
npx http-server final_dist -p 8080 -o
```

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

Use `pnpm` exclusively for root dependencies - enforced by `packageManager` field. Running `npm install` may cause version mismatches.

**Exception**: The PPT subdirectories (`ppts/prompt/`, `ppts/mcp/`) use `npm` directly as they are independent Slidev projects. This is intentional and required by the build process.

### Examples Architecture

- **`mcp-lab/`**: Educational MCP server demonstrating the Model Context Protocol SDK
  - Uses `@modelcontextprotocol/sdk` for server/transport
  - Implements tool registration (ListToolsRequestSchema) and execution (CallToolRequestSchema)
  - Zod schemas for parameter validation
  - Can be run as `npm start` or used as binary `mcp-lab-server`

- **`ollama-node/`**: Minimal example showing local LLM usage with Ollama
  - Demonstrates basic `ollama.chat()` API usage
  - Requires Ollama installed and running locally
  - Example uses deepseek-r1:8b model
