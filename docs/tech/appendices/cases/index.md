---
title: Case Studies
description: "Index of real-world AI adoption cases: SLS log assistant, golden dataset generation, and AI testing practice entries, tagged by the pyramid layer each one answers."
domain: tech
tags: [tech, cases, index]
navOrder: 74
topicId: cases-index
layer: appendix
status: case
nodeType: evidence
owner: learn-ai
lastVerified: "2026-09-01"
listed: true
---

# Case Studies

**What this is**: real-world AI adoption cases and postmortems, cited as evidence by mainline chapters. Numbers and conclusions in each case belong to the original source credited at the top of the page. Read "which question does it answer" first, then take what matches your layer.

Note: the case bodies below are Chinese-language digests of external sources (they originate from the ZH content tree).

## Cases on this (EN) side

| Case | Domain | Question it answers | Mainline layer |
| --- | --- | --- | --- |
| [SLS log analysis assistant](./sls-log-analysis-assistant) | Log ops | How Feishu Aily + SLS MCP auto-generate log analysis reports | L4 |
| [TestHub testing platform](./testhub-platform) | Testing | Platform shape of an AI testing product (source unfetchable, entry only) | L5 |
| [Alibaba AI testing](./alibaba-ai-testing) | Testing | Alibaba's AI testing practice (source unfetchable, entry only) | L5 |
| [Meituan AI testing](./meituan-ai-testing) | Testing | Meituan's AI testing practice (video source, entry only) | L5 |
| [Golden dataset generation](./golden-dataset-generation) | Eval data | How to build eval datasets covering real and boundary cases | L5 |

## Cases on the ZH side (ZH only)

| Case | Domain | Question it answers | Mainline layer |
| --- | --- | --- | --- |
| [Dewu: Claude Code Spec Coding](/zh/tech/appendices/cases/dewu-ai-implementation) | AI coding | How a spec system removes AI-coding uncertainty; where AI capability ends | L1 · L4 |
| [Building Semantic Search](/zh/tech/appendices/cases/building-semantic-search) | Retrieval | Chunking, incremental indexing and vector retrieval on a content site | L3 |
| [Alibaba incident-review agent](/zh/tech/appendices/cases/alibaba-incident-review-agent) | Agent eng | Multi-Agent + memory management + evaluation in production postmortems | L4 · L5 |
| [AIOps general agent exploration](/zh/tech/appendices/cases/aiops-agent-exploration) | DevOps agent | Cloud-ifying IDE-bound AI with Prompt + ReAct + Docker sandbox | L4 |

## Reading advice

- Match cases to the layer you are studying on the mainline; do not read this area sequentially.
- Effect numbers in cases are **single-case evidence**, not extrapolable benchmarks; for comparison methodology see [Evaluation (bridge)](../../05-operations/evaluation).
