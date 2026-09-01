---
title: Resource Library
description: "A problem-first research index: symptom → pyramid chapter → in-chapter resource library and the next question; external knowledge owners (Learn LLM / evals / sites-epub), general tools, and official spec snapshots."
domain: tech
tags: [resources, index, research]
navOrder: 95
topicId: resources
layer: resource
status: canonical
nodeType: resource
owner: learn-ai
lastVerified: "2026-09-01"
listed: true
---

# Resource Library

**What this is**: a research index, not a link list. Usage: arrive with a **problem** → locate the mainline chapter in the first table → take the leveled reading route from that chapter's "Resource Library" section → use the "next question" column to decide where to go after reading. For external knowledge, check ownership in the second table first so you never search in the wrong site.

## 1. Find resources by problem

| Symptom / problem | Where to go first (layer · chapter) | In-chapter library | Next question after reading |
| --- | --- | --- | --- |
| Don't know where to start; problem domain unclear | L0 · [Tech map](/tech/) | see the chapter's "Resource Library" section | Which rung is my need on? → [Complexity decision ladder](/tech/00-orientation/complexity-ladder) |
| Unstable answers; output won't parse | L1 · [Structured output](/tech/01-contracts/structured-output) | same | Parsing is stable but content is off? → L3 grounding |
| Prompts are weak; roles and instructions confused | L1 · [Prompt engineering](/tech/01-contracts/prompt) | same | Is one prompt enough, or do I need project-level context? → [Context engineering](/tech/01-contracts/context) |
| The model doesn't know my repo's conventions | L1 · [Context engineering](/tech/01-contracts/context) | same | Context won't fit or costs too much? → [Cost & performance](/tech/05-operations/cost-performance) |
| Answers stable but not productized (API calls, streaming, sessions) | L2 · [Model API contract](/tech/02-integration/model-api), [Streaming](/tech/02-integration/streaming), [Session & state](/tech/02-integration/session-state) | same | Want generative UI? → [Generative UI](/tech/02-integration/ui) |
| Answers lack private or fresh facts | L3 · [RAG](/tech/03-grounding/rag), [Embeddings & retrieval](/tech/03-grounding/embeddings-retrieval) | same | Retrieval quality maxed out? → [Advanced retrieval](/tech/03-grounding/advanced-retrieval) |
| Need to act (call systems, mutate data) | L4 · [Tool execution](/tech/04-action/tool-execution) (contract: L1 [Tool calling](/tech/01-contracts/tool-calling)) | same | Multi-step, recoverable, needs approval? → [Agent runtime](/tech/04-action/agent-runtime/) |
| Need an autonomous helper loop | L4 · [Agent runtime](/tech/04-action/agent-runtime/) | same | Context/memory management out of control? → [State & memory](/tech/04-action/agent-runtime/state-memory) |
| Collaboration across host / org / agent boundaries | L4 · [Protocol map](/tech/04-action/protocols/) | same | Which protocol? → enter the MCP / A2A / ACP / AG-UI chapters by connection direction |
| Feature works but can't be proven or operated | L5 · [Testing](/tech/05-operations/testing), [Observability](/tech/05-operations/observability) | same | Need release gates and evaluation evidence? → [Evaluation (bridge)](/tech/05-operations/evaluation) |
| High token cost, high latency | L5 · [Cost & performance](/tech/05-operations/cost-performance) | same | Optimize to the end — smaller/edge models? → [Browser & edge inference](/tech/02-integration/browser-edge) |
| Time to ship with rollback | L5 · [Deployment & release](/tech/05-operations/deployment) | same | Who watches it in production? → [Observability](/tech/05-operations/observability) |
| Permissions, injection, data safety | L5 · [Security](/tech/05-operations/security) | same | Alignment-level misbehavior? → external owner Learn LLM |
| Want to move model weights (fine-tune/align) | Appendix · [Model lifecycle bridges](/tech/appendices/model-lifecycle/) | see each bridge's "deep derivations" section | Derivations & implementation → Learn LLM |

Each chapter's "Resource Library" section provides a four-level reading route (Beginner → Builder → Operator → Researcher); resources carry source and retrievedAt markers.

## 2. External knowledge owners

The full cross-repo division is in [Site boundaries & ownership](/tech/00-orientation/site-boundaries); this table is the retrieval-oriented quick view (retrievedAt: 2026-09-01):

| Owner | Scope | canonical URL | When to go |
| --- | --- | --- | --- |
| **Learn LLM** | Model internals, training math (SFT/DPO/LoRA derivations), low-level RAG/Agent theory, multimodal and quantization mechanics | https://llm.zenheart.site/ | When you need the "why" derivation, internals, or math; the deep target of every bridge page in this repo |
| **evals** | Evaluation methods, benchmarks, judges, Golden Dataset, release evidence and CI integration | https://evals.zenheart.site/ | When you need evidence for release decisions, eval-set construction, or release-gate wiring |
| **sites-epub** | Vendor docs/blog captures and offline EPUB indexing | https://epub.zenheart.site/ | When you need vendor originals, offline reading, or version detail checks |
| **learn-ai** (this site) | Cross-technology mainline, five-part teaching, decision trees, minimal fixtures, debugging/production experience | https://ai.zenheart.site/ | When you need the engineering-decision view and end-to-end exercises |

Dynamic site numbers (chapter counts, pricing, availability) are not statically copied here — only URLs and retrievedAt; the target site is authoritative at visit time.

## 3. General tools and community

A curated set of general tools and services, grouped by purpose (vendor commands and parameters belong to sites-epub / vendor docs; this section only answers "when to choose it"):

**UI component libraries** (L2 interaction):

- [Shadcn UI](https://ui.shadcn.com/) — copy/paste React components; the default starting point for chat interfaces
- [Vercel AI SDK UI](https://sdk.vercel.ai/docs/guides/ui) — official headless hooks: streaming render, message state, generative-UI companion
- [NextUI](https://nextui.org/) — beautiful, fast React components; general UI supplement

**AI libraries (TypeScript)** (L2/L3 orchestration):

- [LangChain.js](https://js.langchain.com/) — chain/agent orchestration, broadest ecosystem
- [LlamaIndex.ts](https://ts.llamaindex.ai/) — RAG and data ingestion focus
- [Transformers.js](https://huggingface.co/docs/transformers.js) — in-browser ML (pairs with L2 [edge inference](/tech/02-integration/browser-edge))

**Vector databases** (L3 retrieval):

- [Supabase (pgvector)](https://supabase.com/vector) — lowest-complexity option when you already run Postgres
- [Pinecone](https://www.pinecone.io/) — specialized serverless vector DB
- [Upstash Vector](https://upstash.com/vector) — edge-deployment friendly

**Learning**:

- [DeepLearning.AI](https://www.deeplearning.ai/) — concept-heavy systematic courses
- [Vercel AI SDK docs](https://sdk.vercel.ai/docs) — among the best practical docs
- [Hugging Face course](https://huggingface.co/course) — understanding model internals (complements Learn LLM)

**Community**:

- [Vercel Community](https://github.com/vercel/ai/discussions) — AI SDK issues and direction
- [LangChain Discord](https://discord.gg/langchain) — orchestration-framework ecosystem
- [/r/LocalLLaMA](https://www.reddit.com/r/LocalLLaMA/) — densest hub for running local models

## 4. Official spec snapshots

Canonical spec addresses cited by the protocol chapters (the SSOT targets of this repo's protocol content; retrievedAt: 2026-09-01, version claims follow the spec originals):

| Topic | canonical URL |
| --- | --- |
| Agent Skills | https://agentskills.io/specification |
| Agent Plugins | https://agent-plugins.org/specification |
| MCP | https://modelcontextprotocol.io/specification/latest |
| A2A | https://a2a-protocol.org/v1.0.0/specification/ |
| Agent Client Protocol | https://agentclientprotocol.com/ |
| AG-UI | https://docs.ag-ui.com/introduction |
| A2UI / MCP Apps | https://a2ui.org/ ｜ https://modelcontextprotocol.io/extensions/apps/overview |
| ARD / MCP Registry | https://agenticresourcediscovery.org/spec/ ｜ https://github.com/modelcontextprotocol/registry |
| JSON Schema / OpenAPI / JSON-RPC | https://json-schema.org/specification ｜ https://spec.openapis.org/oas/ ｜ https://www.json-rpc.org/specification |
| OAuth 2.1 (**draft — never cite as final**) / OIDC / AuthZEN | https://datatracker.ietf.org/doc/rfc9700/ ｜ https://openid.net/specs/openid-connect-core-1_0.html ｜ https://openid.net/specs/authorization-api-1_0.html |

Each protocol chapter's "spec vs locally tested" columns take these addresses as the spec-side source; if a spec updates after the snapshot date, update the chapter's specVersion first, then this table.

## Appendix

Non-mainline content (training bridges, cases, course notes, methodology archive) lives in the [appendix area](/tech/appendices/) and does not participate in this index's problem-driven order.
