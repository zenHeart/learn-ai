# Learn AI - AI Learning Resource for Frontend Engineers

## Project Overview

An **AI learning resource platform** specifically designed for **frontend engineers**, helping developers quickly understand core AI concepts and integrate AI capabilities into their daily development workflow to improve efficiency and professionalism.

**Core Philosophy**: Combining theory with practice, codifying AI engineering best practices to help frontend engineers rapidly evolve from AI beginners to professional developers capable of efficiently building AI applications.

## Why This Project?

As a frontend engineer, you're facing a new reality: **AI is becoming a core skill**, not a nice-to-have. But most AI resources are built for data scientists or researchers, not for developers who ship user interfaces.

**The Problem**:

- AI tutorials are too academic - you need practical patterns, not math papers
- Most examples use Python - you work in JavaScript/TypeScript
- You want to BUILD features, not just call APIs
- You need to know WHAT to learn, not learn EVERYTHING

**What You'll Gain**:

- **High ROI Learning** - Focus on the 20% of AI knowledge that gives 80% of results
- **Frontend-First Examples** - Node.js, TypeScript, practical integration patterns
- **Ship-Ready Skills** - Build features like smart search, AI chat, code generation
- **Career Acceleration** - Stand out as an engineer who can harness AI effectively

**After completing this resource, you will**:

1. Understand how to choose between RAG, Fine-tuning, and Prompt Engineering
2. Build AI-powered features using MCP and Agent patterns
3. Use AI coding tools (Copilot, Cursor, Claude) like a pro
4. Integrate LLMs into your React/Vue/Node.js applications
5. Make informed architecture decisions for AI features

## Content Organization

The project is organized into three main sections:

### 📚 Tech Stack (`/tech`)

Core AI concepts and technologies - your foundation for understanding AI:

- **LLM** - Large Language Model fundamentals
- **Prompt Engineering** - Craft effective prompts (includes Copilot case studies)
- **Context** - Understanding context windows and management
- **MCP** - Model Context Protocol for tool integration
- **Agent** - Building autonomous AI agents
- **RAG** - Retrieval-Augmented Generation for knowledge bases
- **SFT** - Supervised Fine-Tuning techniques

### 🛠️ Products

Real-world AI tools and how to use them:

- **Tools** - Essential AI development tools (Ollama for local models)
- **AI Coding** - AI-powered coding assistants
  - Claude CLI - Command-line AI assistant
  - Copilot - GitHub's AI pair programmer
  - Cursor - AI-first code editor
  - Gemini CLI - Google's AI CLI tool
  - Other Tools - Additional AI coding utilities

### 🎓 Presentations (`/ppts`)

Interactive slide decks for structured learning:

- **Prompt Engineering Course** - Complete PE methodology
- **MCP Protocol** - Deep dive into Model Context Protocol

### 💻 Examples (`/examples`)

Hands-on code examples you can run locally (Node.js/TypeScript):

- **mcp-lab** - Complete MCP Server implementation with tool calling
- **ollama-node** - Run AI models locally without API costs

## Quick Start Commands

### Prerequisites

- Node.js 18+
- pnpm 9.15.4+

### Local Development

```bash
# 1. Install and run documentation site
pnpm install
pnpm docs:dev
# Open http://localhost:5173

# 2. Run interactive presentations
pnpm ppt:prompt  # Prompt Engineering course
pnpm ppt:mcp     # MCP Protocol deep-dive

# 3. Try code examples
cd examples/mcp-lab && npm install && npm start
cd examples/ollama-node && npm install && node index.js
```

## How to Get Started

### 🚀 Quick Start (5 minutes)

1. **Clone and run the docs**:

   ```bash
   git clone https://github.com/zenheart/learn-ai.git
   cd learn-ai
   pnpm install
   pnpm docs:dev
   ```

2. **Browse the Tech Stack section** - Start with LLM basics, then explore Prompt Engineering
3. **Try a presentation** - Run `pnpm ppt:prompt` for interactive learning

### 📖 High-ROI Learning Path for Frontend Engineers

#### Week 1: Quick Wins (Immediate Productivity Boost)

**Goal**: Start using AI tools to code faster TODAY

- **Products → AI Coding → Copilot/Cursor** - Set up AI pair programming (30 min)
- **Tech Stack → Prompt Engineering** - Learn to write effective prompts (1 hour)
- **Presentation: Prompt Engineering** - Master the RTF, COT, FSP patterns (45 min)

**Outcome**: 2-3x faster at writing boilerplate code, better at debugging

#### Week 2: Core Concepts (Build Mental Models)

**Goal**: Understand WHEN to use which AI technique

- **Tech Stack → LLM** - How LLMs actually work (demystify the magic)
- **Tech Stack → Context** - Why your prompts fail (context window limits)
- **Tech Stack → RAG vs SFT** - The decision tree for AI architecture

**Outcome**: Make informed decisions about AI features, avoid common pitfalls

#### Week 3: Build Real Features (Hands-on Implementation)

**Goal**: Ship your first AI-powered feature

- **Examples → MCP Lab** - Build a tool-calling AI server (2-3 hours)
- **Examples → Ollama Node** - Run LLMs locally in Node.js (1 hour)
- **Tech Stack → Agent** - Build autonomous AI workflows

**Outcome**: Working code you can adapt for production projects

#### Week 4: Advanced Patterns (Production-Ready Skills)

**Goal**: Architect robust AI features

- **Tech Stack → RAG** - Add a knowledge base to your AI (vector search)
- **Tech Stack → MCP Protocol** - Design tool integrations properly
- **Products → Claude CLI** - Use advanced AI workflows in terminal

**Outcome**: Ability to design and implement production AI features confidently

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
