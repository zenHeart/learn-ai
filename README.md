# Learn AI - AI Learning Resource for Frontend Engineers

## Project Overview

An **AI learning resource platform** specifically designed for **frontend engineers**, helping developers quickly understand core AI concepts and integrate AI capabilities into their daily development workflow to improve efficiency and professionalism.

**Core Philosophy**: Combining theory with practice, codifying AI engineering best practices to help frontend engineers rapidly evolve from AI beginners to professional developers capable of efficiently building AI applications.


## Why This Project?

As a frontend engineer, you might face these challenges:

- Too many AI concepts, don't know where to start
- Want to use AI to improve work efficiency, but don't know how
- Online tutorials are too theoretical, lack practical code examples
- Unsure how to integrate AI into existing frontend projects

This project provides:

- **Systematic Learning Path** - From basic concepts to practical applications
- **Codified Best Practices** - Real, runnable code examples
- **Frontend Perspective** - Focused on AI capabilities frontend engineers need most
- **Theory + Practice** - Every concept comes with real-world use cases

## Project Structure

```text
learn-ai/
├── docs/                    # Documentation site (VitePress)
│   ├── ai-develop/         # AI application development methodology
│   ├── tech/               # Technical deep-dives
│   │   ├── Agent.md        # Agent architecture patterns
│   │   ├── RAG.md          # Retrieval-Augmented Generation
│   │   ├── SFT.md          # Supervised Fine-Tuning
│   │   ├── Workflow.md     # AI Workflow patterns
│   │   ├── LLM.md          # Large Language Model basics
│   │   ├── MCP.md          # Model Context Protocol
│   │   └── prompt/         # Prompt Engineering
│   └── use-case/           # Real-world AI tool cases
│       └── (Copilot, Cursor, Gemini CLI, etc.)
│
├── ppts/                    # Presentations (Slidev)
│   ├── prompt/             # Prompt Engineering course
│   └── mcp/                # MCP Protocol explained
│
└── examples/                # Practical code examples
    ├── mcp-lab/            # MCP Server implementation
    └── ollama-node/        # Local LLM integration
```

## Quick Start

### Prerequisites

- Node.js 18+
- pnpm 9.15.4+

### Run Documentation Locally

```bash
# Install dependencies
pnpm install

# Start docs dev server
pnpm docs:dev

# Visit http://localhost:5173
```

### View Presentations

```bash
# Prompt Engineering course
pnpm ppt:prompt

# MCP Protocol explained
pnpm ppt:mcp
```

### Run Code Examples

```bash
# MCP Server example
cd examples/mcp-lab
npm install
npm start

# Ollama local model example
cd examples/ollama-node
npm install
node index.js
```

## Learning Path

### Step 1: Understand AI Fundamentals

1. Read [Tech Overview](docs/tech/index.md) - Learn RAG vs Fine-tuning
2. Study [LLM Basics](docs/tech/LLM.md) - Large Language Model principles
3. Watch [Prompt Engineering PPT](ppts/prompt/) - Master prompt engineering

### Step 2: Master Core Technologies

1. **RAG** ([docs/tech/RAG.md](docs/tech/RAG.md)) - Mount external knowledge bases to AI
2. **Agent** ([docs/tech/Agent.md](docs/tech/Agent.md)) - Build autonomous AI agents
3. **Workflow** ([docs/tech/Workflow.md](docs/tech/Workflow.md)) - Design complex AI flows
4. **MCP** ([docs/tech/MCP.md](docs/tech/MCP.md)) - Model Context Protocol

### Step 3: Hands-on Practice

1. Run [MCP Lab](examples/mcp-lab/) - Implement a complete MCP Server
2. Learn [AI Development Methods](docs/ai-develop/) - RTF, COT, FSP techniques
3. Explore [Use Cases](docs/use-case/) - Learn to use Copilot, Cursor, etc.

### Step 4: Enhance Workflow Efficiency

1. Apply Prompt Engineering to optimize daily prompts
2. Use AI Coding tools to accelerate development
3. Integrate AI capabilities (RAG, Agent, Workflow) into projects

## Online Access

- Documentation: [https://blog.zenheart.site/learn-ai/](https://blog.zenheart.site/learn-ai/)
- Prompt Engineering Course: [https://blog.zenheart.site/learn-ai/ppts/prompt/](https://blog.zenheart.site/learn-ai/ppts/prompt/)
- MCP Protocol: [https://blog.zenheart.site/learn-ai/ppts/mcp/](https://blog.zenheart.site/learn-ai/ppts/mcp/)

## Tech Stack

- **Documentation**: VitePress 1.6.4 + Vue 3
- **Presentations**: Slidev 0.49.0
- **AI SDKs**: OpenAI, Ollama
- **Package Manager**: pnpm 9.15.4

## Contributing

Issues and Pull Requests are welcome!

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

ISC

---

**Made with passion for frontend engineers learning AI** 💻🤖
