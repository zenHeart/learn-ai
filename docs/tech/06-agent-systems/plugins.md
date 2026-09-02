---
title: "Agent Plugins (Watchlist)"
description: Packaging Skills and MCP servers into one distributable plugin — Agent Plugins 1.0.0 is a package/conformance spec (manifest, fixed discovery locations, path containment) covering no permissions, sandbox, registry, or execution engine; an observation card, not yet canonical.
domain: tech
tags: [tech, action, plugins, watchlist]
navOrder: 68
topicId: plugins
layer: "6"
status: watchlist
nodeType: concept
owner: learn-ai
externalOwners: []
prerequisites: [skills, mcp]
next: [protocol-map]
specVersion: "Agent Plugins 1.0.0"
lastVerified: "2026-09-01"
bilingualParity: exact
listed: true
---

> **Group**: Agent Systems  |  **Previous group exit**: you can wire model output into sessions and state  |  **This group exit**: you can judge when distribution needs Agent Plugins, and what it does and does not govern
> **Prerequisites**: [Agent Skills](skills.md), [MCP](../07-interoperability/mcp.md)  |  **Next**: [Protocol Map](../07-interoperability/index.md)

## 1. Overview

**Lead with the answer**: when you need to hand someone **a set** of capabilities (several Skills plus several MCP server configurations) as **one distributable unit**, Agent Plugins 1.0.0 defines the format contract for that package: a root `plugin.json` manifest, fixed discovery locations (`skills/` and `mcp.json`), path-containment rules, and the `${PLUGIN_ROOT}`/`${PLUGIN_DATA}` variables. It is a **package/conformance specification** — it defines *what a package looks like and how clients validate and discover it*, and **not** an execution, permission, or distribution infrastructure. This page is a watchlist card: learn-ai does not yet depend on it in production.

### Mental model: one plugin package

```text conceptual
my-plugin/
├── plugin.json          # required: closed-schema manifest ($schema, name required)
├── skills/              # fixed location ①: one Skill per immediate subdirectory (each with SKILL.md)
│   └── summarize/
│       └── SKILL.md
├── mcp.json             # fixed location ②: MCP server connection config (stdio / streamable-http / sse)
├── com.example.client/  # client extension directory (reverse-domain namespace)
└── LICENSE
```

Two-layer ownership: **the Skill format is owned by the Agent Skills specification; Plugins only defines how skills are discovered inside a package** (immediate subdirectories of `skills/`, no recursive deep search). MCP wire behavior is owned by the MCP specification; Plugins only defines the portable `mcp.json` configuration format.

### When to use / when not to

- Use: distributing a "skills + tool connections" bundle to multiple clients; internal toolchains wanting a single install unit.
- Do not use:
  - a single skill — use [Skills](skills.md) directly, no package needed;
  - tool connectivity alone — configure an MCP server directly;
  - permissions/sandbox/marketplace review — the Plugins spec provides none of these (see below).

### Decision table: choosing a distribution shape

| Shape | Direction | Control | State | Trust domain | Lowest complexity |
| --- | --- | --- | --- | --- | --- |
| Single Skill directory | knowledge injection | description triggering | static files | inside the host process | one folder |
| Agent Plugin package | combined distribution | manifest + fixed discovery locations | static directory + install state (PLUGIN_DATA) | inside the host process, no isolation across packages | plugin.json + components |
| Standalone MCP server | tool connectivity | protocol boundary + authorization | server process/session | across process boundary | one server |

### What it governs / does not (per the verified spec text)

| Governs (within v1.0.0) | Does not govern (explicitly out of spec) |
| --- | --- |
| the closed `plugin.json` manifest (only 9 permitted top-level fields; unknown fields reported and ignored) | **Sandbox**: the spec states "these containment rules... do not sandbox a plugin subprocess or restrict paths supplied at runtime" |
| fixed discovery locations: `skills/`, `mcp.json`; the manifest cannot inline component configuration | **Permission model**: no permission fields, no approval flow; security is the client's own job |
| path containment: resolved paths must stay inside the plugin root; escapes hit the narrowest failure boundary | **Registry / marketplace**: the design decisions deliberately choose directory-based packages (inspectable with `ls`/`git`), not registry-fetched bundles |
| `${PLUGIN_ROOT}` / `${PLUGIN_DATA}` variables and the subprocess environment | **Execution engine**: the client (plugin runtime) discovers, installs, loads, and executes |
| client conformance requirements and component-level non-fatal failure semantics | governance (defined separately in a Technical Charter) |

### Historical milestones

Agent Plugins 1.0.0, status Published (verified 2026-09-01). v1 defines exactly two component types: **skills and MCP servers**; commands, hooks, agents, rules, and LSP servers are explicitly listed in the spec's design decisions as "too client-specific for v1".

## 2. Usage

A watchlist minimal hands-on: walk a manifest conformance check by hand (paper plus one zero-dependency JSON check, ≤15 minutes, no API key).

### Step 1: write a minimal valid manifest

```json fixture
{
  "$schema": "https://agent-plugins.org/schemas/1.0.0/plugin.schema.json",
  "name": "minimal-plugin"
}
```

`$schema` and `name` are the only required fields. `name` rules: 1-64 chars; only `a-z`, `0-9`, `-`, `.`; must start and end alphanumeric; no `--` and no `..`.

### Step 2: zero-dependency check of required fields and naming rules

```bash fixture
node --input-type=module -e '
import { readFileSync } from "node:fs";
const m = JSON.parse(readFileSync("plugin.json", "utf-8"));
const failures = [];
if (m.$schema !== "https://agent-plugins.org/schemas/1.0.0/plugin.schema.json")
  failures.push("$schema must be the 1.0.0 canonical identifier");
if (!/^[a-z0-9]([a-z0-9.-]*[a-z0-9])?$/.test(m.name ?? "") || (m.name ?? "").length > 64
    || /--|\.\./.test(m.name ?? ""))
  failures.push("name violates 1.64/charset/no----or-.. rules");
const allowed = ["$schema","name","version","description","author","homepage","repository","license","keywords","extensions"];
for (const k of Object.keys(m)) if (!allowed.includes(k)) failures.push(`unknown top-level field: ${k}`);
console.log(failures.length ? `FAIL ${failures.join("; ")}` : "PASS minimal manifest conforms");
process.exit(failures.length ? 1 : 0);
'
```

Happy-path output: `PASS minimal manifest conforms` (exit 0).

### Step 3: negative case

Change `"name"` to `"My-Plugin"` (uppercase is invalid) and rerun: the output is `FAIL name violates 1.64/charset/no----or-.. rules`, exit 1.

### Acceptance and cleanup

Acceptance: the valid case exits 0 and the negative case exits 1. Cleanup: delete the temporary `plugin.json`. There is no host-onboarding step on this page — learn-ai consumes Agent Plugins in no production path, so integration experience is intentionally left blank.

## 3. Principles

### Discovery and failure boundaries

- Components are discovered only from fixed locations: `skills/` (each **immediate** subdirectory containing a `SKILL.md` is one skill, no recursion) and `mcp.json` (the sole MCP configuration entry point; inlining into the manifest is forbidden).
- Failures isolate at the narrowest boundary: one non-conforming skill → skip that skill; one invalid server entry → skip that server; a wholly invalid `mcp.json` → disable MCP for that plugin only; **a manifest that violates the schema (bad required fields, etc.) → reject the whole package**. A missing fixed location is not an error.
- Path containment: package-relative paths in configuration must start with `./` and stay inside the plugin root after resolution (`../bin/server` is invalid); `command` is a single executable token, not a shell string.

### Spec requirements vs local measurement

| Spec requirement (Agent Plugins 1.0.0, verified 2026-09-01) | Local measurement (Section 2 fixture) |
| --- | --- |
| required `$schema` (canonical identifier) and `name` | check groups 1 and 2 of the script |
| name charset/length/start-end/repetition rules | the `My-Plugin` negative case is caught |
| closed top-level fields, unknown fields reported and ignored | the script lists unknown fields |
| v1 component types are skills + MCP servers only | the fixture does not cover component discovery (no production need; left as observation) |

### Ownership layering with Skills / MCP

One fact has one owner: Skill format → agentskills.io; MCP wire behavior → the MCP specification; **Plugins owns only the "package and discovery" layer**. Use this layering to decide where to look up a field.

## 4. Development

Watchlist card: the runbooks below are a preview for "if you decide to pilot", not verified experience from this repository.

### Symptom → Evidence → Action → Done when

**Symptom**: a client rejects the whole plugin at load time.
**Evidence**: the client's reported invalid field points at `plugin.json`; cross-checking shows a missing or mistyped required field (unknown top-level fields do not cause rejection — only other schema violations do).
**Action**: fix the manifest itself; move unknown fields under the `extensions.<reverse-domain>` namespace.
**Done when**: client logs show only component-level warnings (if any) and the package loads.

### Symptom → Evidence → Action → Done when

**Symptom**: the plugin's MCP server will not start, but its skills work.
**Evidence**: a server entry in `mcp.json` is invalid (e.g. `command` written as a shell string, `cwd` escaping the root) or its `$schema` version mismatches `plugin.json`.
**Action**: repair the entry per §7.2 (`command` as one token, `./` relative paths, placeholders limited to `${PLUGIN_ROOT}`/`${PLUGIN_DATA}`); align versions.
**Done when**: that server completes the MCP handshake; other components are unaffected.

### Symptom → Evidence → Action → Done when

**Symptom**: data or dependencies vanish after upgrading the plugin.
**Evidence**: writable state was placed inside the package directory — upgrades replace package contents wholesale.
**Action**: move all writable state to `${PLUGIN_DATA}` (the spec requires clients to preserve that directory across updates).
**Done when**: caches, dependencies, and generated artifacts survive an upgrade.

### Threshold for promotion to canonical

This page promotes to canonical when either condition holds: learn-ai or a sibling site consumes Agent Plugins packages in a real path; or the ecosystem shows ≥2 independent clients with conformance claims. Until then, the de-facto package format remains whatever git repositories and product documents ship.

## 5. Resource Library

Four-level reading route:

- **Beginner**: read this page; retell the "governs / does not govern" table.
- **Builder**: read spec §4–§7; assemble a minimal package by hand and run the Section 2 check.
- **Operator**: if piloting, wire the manifest check into the release pipeline; track schema version changes.
- **Researcher**: read the spec's Design Decisions and Conformance Checklist to understand "why only two component types in v1".

### Resource table

| Name | Evidence level | Canonical URL | Use | Supported claim | Next |
| --- | --- | --- | --- | --- | --- |
| Agent Plugins specification 1.0.0 | L0 (official spec) | https://agent-plugins.org/specification | the single source of the package format contract | manifest schema, fixed locations, containment, no sandbox/registry (retrievedAt 2026-09-01) | compare with Sections 1 and 3 |
| Official schema (1.0.0) | L0 (official artifact) | https://agent-plugins.org/schemas/1.0.0/plugin.schema.json | machine-readable validation | the `$schema` canonical identifier (retrievedAt 2026-09-01) | wire into JSON Schema validation |
| Agent Skills specification | L0 (official spec) | https://agentskills.io/specification | format owner of component ① | Skill format belongs to the Skills spec (retrievedAt 2026-09-01) | [Agent Skills](skills.md) |
| MCP specification | L0 (official spec) | https://modelcontextprotocol.io/specification/latest | behavior owner of component ② | MCP wire behavior belongs to the MCP spec (retrievedAt 2026-09-01) | [MCP](../07-interoperability/mcp.md) |

### Active falsification and open questions

- Falsification entry: if a client's handling of the same `plugin.json` contradicts the "spec vs local measurement" table, trust the spec and that client's documentation, then revise this page.
- Open: ecosystem adoption (no evidence, not stated); evolution of component types beyond v1 (commands/hooks/agents/rules/LSP); the fate of the `mcp.json` `sse` type as MCP deprecates HTTP+SSE.

### learn-ai stops here / where to go next

- Component formats and behavior: [Agent Skills](skills.md), [MCP](../07-interoperability/mcp.md).
- The layer 4 protocol landscape: [Protocol Map](../07-interoperability/index.md).
