---
title: Protocol Watchlist
description: A collection of observation cards for agent protocols that have not yet met the canonical-chapter bar — three groups covering discovery/directory, payments/commerce, and web/interaction; each card records owner, canonical URL, status, and gaps, plus the promotion threshold and the discovery≠trust≠authorization rule.
domain: tech
tags: [tech, action, protocols, watchlist, landscape]
navOrder: 76
topicId: protocol-watchlist
layer: "7"
status: watchlist
nodeType: resource
owner: learn-ai
externalOwners: []
prerequisites: [protocol-map]
next: []
specVersion: "Multi-protocol observation cards (each carries status and retrievedAt; unified sweep 2026-09-01)"
lastVerified: "2026-09-01"
bilingualParity: exact
listed: true
---

> **Group**: Interoperability ｜ **Previous group exit**: build a traceable retrieval chain with an update path ｜ **This group exit**: on encountering any listed protocol, immediately state what it solves, who owns it, and which threshold it is missing
> **Prerequisites**: [Protocol Map](index.md) ｜ **Next**: protocols meeting the threshold get promoted to standalone canonical chapters

## 1. Overview

**BLUF**: the agent protocol ecosystem ships faster than any tutorial can revision. This page is an **observation-card collection**, not a tutorial: each card answers "full name, owner, canonical URL, status, boundary, and why it is not canonical yet". The cards sit in three groups — discovery and directory, payments and commerce, interaction and web.

**Structure declaration (simplified five-part)**: this page's status is watchlist; the full "Usage / Principles / Development" sections are omitted and replaced by observation cards — reason: these candidates generally lack publicly versioned specification maturity and a runnable zero-key fixture; the Resource Library section is kept. Card facts are as of 2026-09-01.

### Promotion threshold (when a card becomes a canonical chapter)

All five must hold before promotion from the watchlist:

1. **A publicly versioned specification** (versioned URL or a formal standards track), citable at field level.
2. **An independent problem boundary**: no overlap with the existing canonical chapters (MCP / A2A / ACP / AG-UI / A2UI-MCP Apps), with a clear "this solves what others do not".
3. **A runnable fixture**: zero API keys, deterministic, reproducible from a clean checkout.
4. **A documented security model**: authn/authz/injection defenses described at spec level, not blog-slogan level.
5. **A verifiable maintenance path**: governance body, change process, and deprecation policy that can be checked.

### Three iron rules

- **discovery ≠ trust ≠ authorization**: discovery mechanisms (ARD, registries, directories, ANS) only answer "can I find it"; identity trust lives in the signature/identity layer (JWS on A2A Cards, DID, ANS's PKI designs); permission to act lives in the authorization layer (OAuth, permission models). No layer substitutes for another.
- **Same name ≠ same thing**: ACP alone has at least four meanings ([Agent Client Protocol](acp-agent-client.md) / the historical IBM ACP / AGNTCY's Agent Connect Protocol / OpenClaw's private one); ADL and OAP each have multiple same-name competitors (see cards). Always cite full name + canonical URL.
- **Snapshots expire**: IETF Internet-Drafts expire in six months; Candidate/Proposal statuses change at will. Every claim here carries a retrievedAt — recheck before citing.

## 2. Observation cards: discovery and directory

### ARD — Agentic Resource Discovery

- **Full name/owner**: Agentic Resource Discovery Specification; authors Junjie Bu (Google), R.V. Guha (Microsoft), Shaun Smith (Hugging Face).
- **canonical**: https://agenticresourcediscovery.org/spec/
- **Status**: v0.91, Status: Proposal, self-dated August 26, 2026 (retrievedAt 2026-09-01).
- **Boundary**: describing/discovering/searching "agentic resources" (MCP tools, A2A agents, skills, and other callable services) across federated networks; entries are JSON-LD nodes; optional `/explore` and `GET /agents` methods plus a URN naming appendix.
- **Why on the watchlist**: Proposal status, a v0.x version line, an unfinished trust/signature story for entries; no standalone fixture.

### MCP Registry

- **Full name/owner**: Model Context Protocol Registry; the modelcontextprotocol organization (GitHub).
- **canonical**: https://github.com/modelcontextprotocol/registry
- **Status**: active repo, "a community driven registry service for Model Context Protocol (MCP) servers" (retrievedAt 2026-09-01).
- **Boundary**: the community registry for MCP servers — it solves the distribution problem of "where do I find a trustworthy server", not the server protocol itself.
- **Why on the watchlist**: a registry is a service/infrastructure, not a protocol contract; the promotion path is into the discovery section of the [MCP](mcp.md) chapter, not a standalone chapter.

### AGNTCY (OASF / DIR / SLIM + identity and observability)

- **Full name/owner**: AGNTCY (the "Internet of Agents" open-source stack); Linux Foundation via LF Projects, initiated by Outshift (Cisco's incubation arm).
- **canonical**: https://www.agntcy.org/
- **Status**: active, multi-language SDKs (Go/Python/.NET/Java/Kotlin and more), Apache-2.0 (retrievedAt 2026-09-01).
- **Boundary**: **DIR** (Agent Directory Service) — federated agent discovery across frameworks/protocols/registries; **SLIM** — secure network-level messaging between agents; **OASF** — a versioned schema framework for agent/skill descriptions (with skill/domain taxonomies); plus Identity (W3C verifiable-credential badges) and Observability components. Acronym expansions defer to official docs (the homepage does not expand them; unverified).
- **Why on the watchlist**: heavy overlap with existing canonicals (description schema vs Agent Card; discovery vs ARD/Registry; messaging vs A2A bindings); an independent problem boundary is yet to be argued.

### The DNS-AID / ANS family (IETF draft cluster)

- **Full name/owner**: several individually submitted IETF Internet-Drafts, not affiliated with each other.
- **canonical** (all under https://datatracker.ietf.org/, retrievedAt 2026-09-01, all "work in progress"):
  - **AID**: `draft-nemethi-aid-agent-identity-discovery` — a `_agent.<domain>` TXT record as a protocol-agnostic bootstrap (v1.2).
  - **ANS**: `draft-narajala-ans` (a DNS-style directory + PKI) and `draft-narajala-courtney-ansv2` (domain-anchored identity + ACME + a transparency log; Bronze/Silver/Gold tiers).
  - **DN-ANR**: `draft-cui-dns-native-agent-naming-resolution` — FQDNs as Agent IDs, resolved via SVCB/HTTPS RRs + DNSSEC.
  - **AGTP ANS**: `draft-hood-agtp-discovery` — a DISCOVER method plus a governed name service.
- **Boundary**: a shared thesis, "DNS for agents" — naming, resolution, endpoint verification; all explicitly disclaim semantic discovery and authorization.
- **Why on the watchlist**: all are individual drafts that expire in six months, none in a WG/RFC track yet; several competitors occupy the same slot — wait for convergence.

### ADL / OAP (agent definition and packaging, a same-name contention zone)

- **ADL**:
  - **canonical**: https://datatracker.ietf.org/doc/html/draft-nederveld-adl-02 (individual submission with Standards-Track intent; `application/adl+json`; a "passport" model; claims conversion into A2A Agent Cards and MCP configurations). retrievedAt 2026-09-01.
  - The community has at least two same-name efforts (inference-gateway's ADL and nextmoca's ADL, both self-described "OpenAPI for AI Agents") — same name, different schemas.
- **OAP**:
  - **canonical A**: http://openagentprotocol.eu/ (seven planes: identity/discovery/invocation/commercial/governance/accountability/coordination; `/.well-known/oap-tool.json`; 37 RFC-process drafts). retrievedAt 2026-09-01.
  - **canonical B**: https://github.com/open-agentic-protocol/ (white paper v0.2; an OAPverse registry concept).
- **Boundary**: **definition/manifest formats** for agents (static description), not communication protocols.
- **Why on the watchlist**: multiple same-name drafts/white papers; the relationship to the A2A Agent Card — "generates it" or "replaces it" — has not converged; no independent runtime.

### ANP — Agent Network Protocol

- **Full name/owner**: Agent Network Protocol; a community project (agentnetworkprotocol.com), plus an IETF-side `draft-song-anp-*` draft suite (AIP/AITP/ANS/ADP — P2P datagrams + agent:// URIs + DHT/GossipSub).
- **canonical**: https://www.anp-protocol.com/ and https://datatracker.ietf.org/ (for the drafts)
- **Status**: the community site is active (bilingual zh/en); the IETF suite is individual drafts (all retrievedAt 2026-09-01).
- **Boundary**: a three-layer stack of decentralized identity (W3C DID, `did:wba`) + meta-protocol negotiation + application protocols, aimed at "an internet of billions of agents".
- **Why on the watchlist**: a路线 contest with A2A's centralized HTTP model rather than a complement; production adoption unverified; the relationship between the two tracks (community site vs IETF drafts) needs watching.

### AHP — Agent Host Protocol

- **Full name/owner**: Agent Host Protocol; Microsoft (a GitHub Pages spec site).
- **canonical**: https://microsoft.github.io/agent-host-protocol/specification/overview
- **Status**: **DRAFT** (self-labeled; breaking changes expected) (retrievedAt 2026-09-01).
- **Boundary**: JSON-RPC 2.0, transport-agnostic, SemVer version negotiation, channeled messages/commands/notifications/actions; the `x-` prefix is reserved for implementation extensions.
- **Why on the watchlist**: DRAFT with breaking changes imminent; how the "host-agent" boundary differs from ACP's editor-agent boundary is unclear.

## 3. Observation cards: payments and commerce

### UCP — Universal Commerce Protocol

- **Full name/owner**: Universal Commerce Protocol; an industry coalition (the site lists Google, Shopify, Microsoft, OpenAI, Stripe, Walmart, Booking, and dozens more, retrievedAt 2026-09-01).
- **canonical**: https://ucp.dev/
- **Status**: the spec site is live and expanding into lodging and food ("Detailed specifications coming soon"); no version number shown on the homepage.
- **Boundary**: the assembly layer for agentic commerce — discovery through checkout; REST/JSON-RPC transports with built-in support for AP2 (payments), A2A, and MCP; OAuth 2.0 account linking.
- **Why on the watchlist**: the spec body is not yet public at field level; the boundary between top-level orchestration and UCP/AP2/existing commerce APIs is undocumented.

### AP2 — Agent Payments Protocol

- **Full name/owner**: Agent Payments Protocol (the spec page also styles it Agentic Payment Protocol); Google-affiliated (spec site ap2-protocol.org).
- **canonical**: https://ap2-protocol.org/ap2/specification/
- **Status**: v0.2 (retrievedAt 2026-09-01).
- **Boundary**: a **payment security layer**, not a commerce protocol — Checkout Mandates/Receipts plus linked Payment Mandates/Receipts usable as dispute evidence; a five-role model (Shopping Agent, Credential Provider, Merchant, Merchant Payment Processor, and others); explicitly compatible with UCP, with catalog APIs and the like out of scope.
- **Why on the watchlist**: v0.x; the market contest with x402/MPP has not converged; how it chains into A2A's AUTH_REQUIRED delegation is undocumented.

### x402

- **Full name/owner**: x402; the x402 Foundation (Coinbase origin).
- **canonical**: https://x402.org/
- **Status**: active (the site self-reports 75.41M transactions in the last 30 days — **a site-reported figure, unaudited**, retrievedAt 2026-09-01).
- **Boundary**: HTTP 402-native payments — a one-line middleware returns 402 for unpaid requests and the client pays and retries; stablecoin on-chain settlement, zero protocol fees, network-agnostic.
- **Why on the watchlist**: the crypto-rail dependency (stablecoin-only) sits far from mainstream enterprise finance; no independent audit source for adoption data.

### Agentic Commerce Protocol (OpenAI/Stripe; also abbreviated ACP)

- **Full name/owner**: Agentic Commerce Protocol; co-founded by OpenAI and Stripe (announced 2025-09-29, Apache 2.0).
- **canonical**: https://developers.openai.com/commerce and https://github.com/agentic-commerce-protocol
- **Status**: already powering ChatGPT Instant Checkout; the changelog keeps moving (retrievedAt 2026-09-01).
- **Boundary**: a three-spec set — Product Feed (structured catalog data), Agentic Checkout (in-conversation checkout sessions), and Delegated Payment (delegated payment with Stripe's Shared Payment Token as the first implementation); the merchant stays the Merchant of Record.
- **Why on the watchlist**: the boundary is the "shopping inside ChatGPT" ecosystem rather than general agent collaboration; **the abbreviation collides with the [Agent Client Protocol](acp-agent-client.md)** — always cite the full name.

### MPP — Machine Payments Protocol

- **Full name/owner**: Machine Payments Protocol; co-authored by Stripe and Tempo (launched 2026-03-18).
- **canonical**: https://mpp.dev/ (IETF-side authentication-scheme draft: paymentauth.org)
- **Status**: an open standard with 100+ services listed at launch (press reports, retrievedAt 2026-09-01).
- **Boundary**: the other revival of HTTP 402 — a `WWW-Authenticate: Payment` challenge / `Authorization: Payment` credential / `Payment-Receipt` receipt; charge and session intents; multi-rail (Tempo stablecoins, Stripe SPT cards, the Visa extension, Lightning); core x402 exact-payment flows can be mapped onto its charge intent.
- **Why on the watchlist**: a same-topic contest with x402 (both use 402, with different header designs); payment-protocol adoption rides on finance/compliance stacks, not technology alone.

### OpenSharing

- **Full name/owner**: OpenSharing; a Linux Foundation project (Databricks-initiated, evolving Delta Sharing).
- **canonical**: https://opensharing.io/ (note: **opensharing.org is an unrelated site** — do not confuse them)
- **Status**: announced 2026-06-10 (press release + coverage, retrievedAt 2026-09-01).
- **Boundary**: zero-copy sharing of AI assets (agent skills, models, unstructured data) — credential vending (STS/SAS/OAuth short-lived tokens) lets recipients pull directly from the provider's storage; the sharing server never sits in the data path.
- **Why on the watchlist**: just chartered; the boundaries versus MCP resource distribution and Skills packaging are yet to be documented.

## 4. Observation cards: interaction and web

### WebMCP

- **Full name/owner**: WebMCP; the W3C Web Machine Learning Community Group (Google/Microsoft engineer contributions).
- **canonical**: the W3C WebML CG draft (secondary sources point to webmachinelearning.github.io/webmcp; **direct verification failed this round** — w3c.github.io/webmcp is 404, retrievedAt 2026-09-01).
- **Status**: a **Draft Community Group Report — not a W3C Standard and not on the standards track**; Chrome origin trial (reported 2026-06, Chrome 149).
- **Boundary**: a browser-native API — pages expose JSON-Schema'd tools to in-page agents via `document.modelContext.registerTool()` (earlier `navigator.modelContext`); a declarative path annotates HTML forms into tools (that section still marked TODO in the draft). Non-goal: headless/fully autonomous browsing.
- **Why on the watchlist**: CG draft + origin-trial stage; the security section is incomplete; with zero cross-browser support it cannot be a product dependency.

### NLIP — Natural Language Interaction Protocol

- **Full name/owner**: Natural Language Interaction Protocol; Ecma International TC56.
- **canonical**: https://ecma-international.org/publications-and-standards/standards/ecma-430/
- **Status**: **ECMA-430, a published Ecma Standard** (a formal standard, not a draft; the publication date is not shown on the retrieved page, unverified) (retrievedAt 2026-09-01).
- **Boundary**: an application-level communication protocol "between AI Agents, or between a human and an AI agent"; motivation and design philosophy are explicitly out of scope of the standard text.
- **Why on the watchlist**: a formal standard with unknown ecosystem adoption (no independent data); its problem boundary overlaps heavily with A2A/ACP — independence unproven.

## 5. Resource Library

### Four-level reading path

- **Beginner**: look up cards by group on this page as needed (group first, card second) → return to the [Protocol Map](index.md) to reorient.
- **Builder**: when a card tempts you, run the threshold self-check first (§1, five items) — especially "can you actually write the zero-key fixture".
- **Operator**: treat this page as a selection exclusion list: before any listed protocol reaches production, add the identity and authorization layers yourself.
- **Researcher**: subscribe to the relevant draft mailing lists on IETF datatracker; track the official A2A/MCP/ACP changelogs for convergence signals.

### Resource table

| Name | Level | canonical URL | Use | Claims supported | Next |
| --- | --- | --- | --- | --- | --- |
| This page's cards | mixed L0/L2 | see each card | quick protocol locating and status | the claims inside each card (all with retrievedAt) | click through to canonical to recheck |
| IETF Datatracker | L0 | https://datatracker.ietf.org/ | draft status and expiry checks | DNS-AID/ANS, ADL, and the ANP suite are all "work in progress" | subscribe to mailing lists |
| a2a-protocol.org / agentclientprotocol.com | L0 | see the corresponding canonical chapters | the convergence frame of reference | the versioned specs of A2A/ACP | compare against card gaps |

### Active falsification and open questions

- **Falsification entry point**: every first-hand claim on a card should be findable verbatim at its canonical URL; if not, downgrade it to hearsay and fix the card.
- Open 1: the final converged shape of the discovery layer (ARD / Registry / ANS / DIR) — coexisting complements or one winner; unlikely to settle within 2026.
- Open 2: the payments-layer contest (x402 vs MPP vs AP2+UCP vs Agentic Commerce Protocol) over header design and rails; the real-world interoperability of the MPP↔x402 mapping is unverified.
- Open 3: WebMCP's W3C trajectory and cross-browser support; NLIP's actual adoption.
- Open 4: the conversion relationships among AGNTCY OASF, the A2A Agent Card, and ADL ("generates" or "replaces").

**learn-ai stops here**: observation cards and threshold judgment. **Where to go next**: deep chapters for converged protocols → [A2A](a2a.md) / [ACP](acp-agent-client.md) / [AG-UI](ag-ui.md) / [A2UI and MCP Apps](a2ui-mcp-apps.md); promotion requests → file an issue on this repo with evidence for the five threshold items.
