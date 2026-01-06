# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

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
- Sidebar auto-generated from config structure

**Navigation Structure**:
- AI Develop - Introduction to building AI applications
- Tech Stack - Agent, RAG, SFT, Workflow technical deep-dives
- Use Cases - AI Coding tools (Copilot, Cursor, Gemini CLI)
- Prompts - Reusable prompt templates

### Content Organization Philosophy

```
docs/
├── ai-develop/    # "How to build" - RAG, interceptors, prompt methods
├── tech/          # Technical concepts (Agent, RAG, SFT, Workflow)
├── use-case/      # Real-world tool usage guides
└── prompts/       # Reusable prompt templates

ppts/
├── prompt/        # Modular slides (01.prepare.md, 02.PE.md, etc.)
└── mcp/           # MCP protocol presentation

examples/
├── mcp-lab/       # Tutorial-grade MCP server implementation
└── ollama-node/   # Local LLM integration example
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

1. Create `.md` file in appropriate `docs/` subdirectory
2. Update `docs/.vitepress/config.js` sidebar configuration
3. Test locally with `pnpm docs:dev`
4. Commit - deployment is automatic via GitHub Actions

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

Use `pnpm` exclusively - enforced by `packageManager` field. Running `npm install` may cause version mismatches.
