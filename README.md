# Learn AI: The Frontend Engineer's Guide to AI Mastery

> **A frontend-first AI learning platform** - Learn to use AI tools, add AI features to your apps, and build AI-powered products with JavaScript/TypeScript.

## 🚧 Project Status

**Currently under active development!** We're implementing a comprehensive learning platform following our [architecture roadmap](./architecture.md).

- ✅ **Available Now**: AI coding tools documentation (Cursor, Copilot, Claude CLI, Gemini CLI)
- 🚧 **In Progress**: Learning paths, tutorials, and practical examples
- 📋 **Roadmap**: See [todo.md](./todo.md) for detailed implementation plan

*Links marked with 🚧 below point to planned content - check back soon!*

## 1. Project Overview

This platform is an **AI learning resource specifically engineered for frontend developers**. Unlike most AI tutorials focused on Python and data science, we teach AI development through the lens of **React, Vue, Next.js, and modern JavaScript/TypeScript**.

Our **core philosophy**:
- ✅ **Frontend-First**: All examples use JavaScript/TypeScript, not Python
- ✅ **Actionable Only**: No ML theory you can't apply (no GPU training, no PyTorch)
- ✅ **Production-Ready**: From quickstart to deployment, with real-world patterns
- ✅ **Three Clear Paths**: Use AI Tools → Add AI Features → Build AI Products

We empower you to seamlessly integrate AI capabilities into your daily development workflow, dramatically enhancing both your efficiency and professional capabilities.

## 2. Why This Project is for You

As a frontend engineer, you are at the forefront of a new technological paradigm: **AI is no longer a niche specialization but a foundational skill**. However, most AI learning resources are tailored for data scientists or backend specialists, often overlooking the unique context and powerful skill set you already possess.

| The Problem with Traditional AI Learning | Our Solution: A Frontend-First Approach                                                                                                       |
| :--------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------- |
| **Academic Overload**                    | **High-ROI, Practical Learning**: We focus on the 20% of AI knowledge that delivers 80% of the practical results for application development. |
| **Python-Centric Examples**              | **JavaScript/TypeScript Native**: All examples use Node.js and TypeScript, fitting directly into your existing technology stack.              |
| **Abstract API Calls**                   | **Architecture & Integration Patterns**: We teach you how to **build** and architect AI features, not just consume them.                      |
| **Information Overwhelm**                | **Scenario-Driven Paths**: We provide clear, structured learning paths based on real-world frontend development scenarios.                    |

## 3. Quick Start

Launch your AI-enhanced development environment in minutes.

### ⚡️ Start Here: Explore AI Coding Tools
**Available now:** Learn about AI coding assistants
👉 **[AI Coding Tools Documentation](./docs/products/ai-coding/index.md)** - Cursor, Copilot, Claude CLI, and more



### 🛠️ Local Development (Docs Site)
To run this documentation locally:

```bash
# 1. Clone the repository
git clone https://github.com/zenheart/learn-ai.git
cd learn-ai

# 2. Install dependencies and run the documentation site
pnpm install
pnpm docs:dev
# Open http://localhost:5173 to explore the learning materials.
```

## 4. Learning Paths: Your Journey to AI Mastery

This guide is structured around **scenario-driven learning paths**. Choose the path that best aligns with your immediate goals.

### 🚧 Path 1: Use AI Tools (1-2 weeks)
**Goal**: Master AI coding assistants to code 2-3x faster
- Master Cursor, Copilot, Claude CLI
- Write effective prompts for code generation
- Debug faster with AI assistance
- **Status**: In development - [track progress](./todo.md#task-14-create-docspathsproductivitymd-path-1)

### 🚧 Path 2: Add AI Features (2-4 weeks)
**Goal**: Build AI-powered features like chatbots, search, and smart forms
- Integrate OpenAI/Claude/Gemini APIs into React apps
- Build streaming chat interfaces with Vercel AI SDK
- Implement RAG (Retrieval-Augmented Generation)
- Create AI agents that can use tools
- **Status**: Planned

### 🚧 Path 3: Build AI Products (4+ weeks)
**Goal**: Design, build, and deploy complete AI-powered applications
- Production deployment (Edge, Workers)
- Advanced RAG patterns (hybrid search, reranking)
- AI engineering (testing, monitoring, cost optimization)
- Browser-side AI (Transformers.js, WebGPU)
- **Status**: Planned

## 5. The AI Decision Framework for Frontend Engineers

Knowing _which_ AI technique to use is as important as knowing _how_ to use it.

| When your goal is to...                                                  | The best approach is...                  | Because...                                                                                                                                                                             |
| :----------------------------------------------------------------------- | :--------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Enhance AI with external, real-time, or private data**                 | **Retrieval-Augmented Generation (RAG)** | It grounds the AI in factual, up-to-date information without retraining. Ideal for Q&A over documents.                                                                                 |
| **Create an AI that can perform actions and use tools**                  | **Agents with MCP/Tool Calling**         | Allows AI to interact with APIs and databases, moving beyond simple text generation to task execution.                                                                                 |
| **Adapt the AI's style, tone, or format to a specific domain**           | **Prompt Engineering** (First Step)      | Always start here. Advanced prompting solves 90% of "style" issues cheaper than fine-tuning.                                                                                           |

## 6. Practical Projects & Examples

All examples use **JavaScript/TypeScript** and are runnable locally.

- 🚧 **AI Chatbot** - Streaming chat with OpenAI + React (planned)
- 🚧 **RAG Search** - Document Q&A with vector search (planned)
- 🚧 **Generative UI** - Dynamic form generation (planned)
- 🚧 **Full-Stack AI SaaS** - Complete production app (planned)
- ✅ **[MCP Lab](./examples/mcp-lab)** - Build your own AI tools with Model Context Protocol
- ✅ **[Ollama Node](./examples/ollama-node)** - Local LLM integration

## 7. Tech Stack

- **Documentation**: VitePress 1.6.4 + Vue 3
- **Presentations**: Slidev 0.49.0
- **AI SDKs**: Vercel AI SDK, OpenAI, Ollama
- **Package Manager**: pnpm 9.15.4

## 8. Contributing

We welcome contributions! Please read our [Contribution Guidelines](CONTRIBUTING.md).

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 9. License

ISC

---

**Made with passion for frontend engineers learning AI** 💻🤖