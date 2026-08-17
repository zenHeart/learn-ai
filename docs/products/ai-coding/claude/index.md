# Claude Code Ecosystem Learning Guide

> Claude Code is an AI programming and intelligent agent product ecosystem from Anthropic, covering terminal, IDE, desktop, web, and browser. This guide is your navigation map into the Claude Code ecosystem, helping you master all core capabilities in the shortest path.

## Product Landscape

The Claude Code ecosystem comprises 5 core products, each designed for different use cases:

```
Claude Code Ecosystem
├── Claude Code (Programming Agent) — Write code, debug, submit PRs
│   ├── Terminal CLI        — Command-line interaction, most flexible
│   ├── VS Code Extension     — Embedded in editor, inline diff
│   ├── JetBrains Extension    — IntelliJ/PyCharm/WebStorm integration
│   ├── Desktop App         — Visual diff, parallel sessions, PR monitoring
│   └── Web Version           — Runs in browser, no installation needed
├── Claude.ai Platform (Conversational Intelligence) — Analysis, writing, research
│   ├── Projects        — Persistent context + knowledge base
│   ├── Research        — Multi-turn deep web research
│   ├── Artifacts       — Interactive code/document/chart output
│   └── Extended Thinking — Deep reasoning
├── Claude Design (Design Prototype) — Codebase-driven brand prototypes
│   └── Conversational generation → Fine-tune iteration → Handoff to Claude Code
├── Cowork (Desktop Agent) — Handle local files, automate repetitive work
│   └── Read/write files, generate docs, scheduled tasks
└── Connectors (Connections) — Connect external services
    └── Gmail, Notion, GitHub, Slack, and 50+ other services
```

### Quick Decision: Which Should I Use?

```
What do I want to do?
├── Write code / Debug / Refactor / Submit PRs
│   └── → Claude Code
│       ├── In terminal? → CLI (claude command)
│       ├── In IDE? → VS Code / JetBrains extension
│       ├── Want visual diff? → Desktop App
│       ├── No environment set up? → Use claude.ai/code in browser
│       └── Away from computer? → Remote control / Dispatch
├── Write / Analyze / Research / Learn
│   └── → claude.ai (web or mobile)
│       ├── Need persistent context? → Create Project
│       ├── Need deep reasoning? → Enable Extended Thinking
│       ├── Need to research online? → Enable Research
│       └── Need to generate professional docs? → File creation (Excel/Word/PPT)
├── Design prototype / Landing page / Dashboard
│   └── → Claude Design
│       ├── Have brand guidelines? → Configure Design System first
│       ├── Want to replicate existing page? → Use Web Capture
│       └── After design → Handoff to Claude Code for implementation
├── Connect external services (Gmail / Notion / GitHub / Slack)
│   └── → Connectors
│       ├── One-time query? → Enable connector in claude.ai
│       ├── Ongoing use? → Bind to Project
│       └── Scheduled automation? → Combine with cloud scheduled tasks
└── Handle local files / Automate repetitive work
    └── → Claude Desktop / Cowork
        ├── One-time file read/write → Cowork tab
        ├── Scheduled tasks (need local files) → Desktop scheduled tasks
        ├── Scheduled tasks (don't need local files) → Cloud scheduled tasks
        └── Control apps/browser → Computer Use
```

## Core Concepts at a Glance

Before diving into each product, understand these core concepts that span the entire ecosystem. See [Glossary](./claude-code-glossary) for details.

| Concept | One-Line Explanation | Where It Appears |
|---------|---------------------|------------------|
| **MCP** (Model Context Protocol) | Open protocol for connecting external tools; Connectors and plugins are built on it | Global |
| **Skills** | Reusable specialized workflows; Claude auto-detects context and loads them | Claude Code / Claude.ai / Cowork |
| **Hooks** | Scripts that auto-trigger before/after tool calls | Claude Code |
| **Plugins** | Extension packages bundling Skills + Agents + Hooks + MCP | Claude Code / Cowork |
| **Sub-agents** | AI assistants with independent personas and permissions; can process tasks in parallel | Claude Code |

## Learning Path

### Stage 1: Get to Know the Claude.ai Platform

Start with the web interface you'll use daily, establishing a productivity baseline.

**Goal**: Use Projects to manage context, use Research for deep investigation, understand Artifacts output.

| Step | Content | Link |
|------|---------|------|
| 1 | Claude.ai platform feature overview | [Claude.ai Platform Guide](./claude-ai) |
| 2 | Create dedicated workspace with Projects | [→ Projects chapter](./claude-ai#projects-dedicated-workspaces) |
| 3 | Enable Extended Thinking for complex problems | [→ Extended Thinking chapter](./claude-ai#extended-thinking-deep-reasoning) |
| 4 | Use Research for multi-turn web investigation | [→ Research chapter](./claude-ai#research-deep-research) |
| 5 | Understand Artifacts and file creation | [→ Artifacts chapter](./claude-ai#artifacts-standalone-content-output) |

### Stage 2: Get Started with Claude Code

The core tool for frontend engineers, letting AI truly participate in your development workflow.

**Goal**: Run Claude Code in a project, understand the role of CLAUDE.md, MCP, and Hooks.

| Step | Content | Link |
|------|---------|------|
| 1 | What Claude Code is and its interfaces | [Claude Code Product Overview](./claude-code#product-overview) |
| 2 | Installation + First run | [→ Quick Start](./claude-code#cli-quick-start) |
| 3 | Understand keyboard shortcuts and permission modes | [→ Interaction Basics](./claude-code#interaction-basics) |
| 4 | Manage project context with CLAUDE.md | [→ Project Context Management](./claude-code#project-context-management) |
| 5 | Connect MCP for external tools | [→ MCP Integration](./claude-code#mcp-integration) |
| 6 | Daily development workflows | [→ Practical Workflow cookbook](./claude-code-cookbook) |
| 7 | Configure permissions, Hooks, plugins (quick reference) | [→ Cheatsheet](./claude-code-cheatsheet) |
| 8 | Look up terms you forget in the glossary | [→ Glossary](./claude-code-glossary) |

### Stage 3: Connect External Services with Connectors

Connect Claude to tools you actually use, letting it read real data and execute real operations—this comes right after Claude Code because it builds on the MCP concepts you just learned.

**Goal**: Connect Google Workspace / Notion / GitHub, combine with scheduled tasks for cross-service automation.

| Step | Content | Link |
|------|---------|------|
| 1 | Understand the Connectors-MCP relationship | [Connectors](./connectors) |
| 2 | Connect Google Workspace | [→ Google Workspace](./connectors#google-workspace) |
| 3 | Connect project management tools | [→ Key Connectors in Detail](./connectors#key-connectors-in-detail) |
| 4 | Combine with Projects for long-term use | [→ Combining Connectors with Projects](./connectors#combining-connectors-with-projects) |
| 5 | Enable scheduled task automation | [→ Connectors + Scheduled Tasks](./connectors#connectors-scheduled-tasks) |

### Stage 4: Prototype with Claude Design

Integrate AI-designed interfaces into your codebase, generating on-brand prototypes that hand off directly to Claude Code.

**Goal**: Configure design system, use web capture to rebuild existing pages, seamlessly transition to Claude Code via handoff bundle.

| Step | Content | Link |
|------|---------|------|
| 1 | Understand Claude Design positioning and core concepts | [Claude Design User Manual](./claude-design) |
| 2 | Configure design system (link codebase) | [→ Quick Start](./claude-design#quick-start-your-first-30-minutes) |
| 3 | Master four site-building workflows | [→ Site-Building Workflows](./claude-design#site-building-workflows-four-end-to-end-patterns) |
| 4 | Learn handoff bundle to transition to Claude Code | [→ Handoff Integration](./claude-design#claude-code-integration-handoff-bundle) |
| 5 | Understand export targets and Canva integration | [→ Export Options](./claude-design#export-and-canva-choose-the-right-target) |

### Stage 5: Automate with Cowork

Turn Claude into your personal desktop agent for handling file organization, recurring reports, and other repetitive work.

**Goal**: Create scheduled tasks, install plugins, understand Cowork security boundaries.

| Step | Content | Link |
|------|---------|------|
| 1 | Understand what Cowork is | [Cowork Complete Guide](./cowork) |
| 2 | Authorize folders and execute first task | [→ Quick Start](./cowork#quick-start) |
| 3 | Create recurring automation tasks | [→ Scheduled Tasks](./cowork#scheduled-task-automation) |
| 4 | Install plugins to extend capabilities | [→ Plugin System](./cowork#plugin-system) |
| 5 | Understand security boundaries | [→ Safe Usage](./cowork#safe-usage-guide) |

### Stage 6: Plugin Development

Develop reusable Claude Code plugins for your team or the community.

**Goal**: Understand plugin structure, develop and publish a complete plugin package.

| Step | Content | Link |
|------|---------|------|
| 1 | Understand plugin core concepts | [Plugin Development Manual](./plugin#core-concepts) |
| 2 | Master directory structure and plugin.json | [→ Directory Structure](./plugin#directory-structure-and-plugin-json) |
| 3 | Develop five core components | [→ The Big 5 Core Components](./plugin#_1-2-the-big-5-core-components) |
| 4 | Local debugging and validation | [→ Local Debugging](./plugin#_1-3-local-debugging-and-verification) |
| 5 | Publish to npm / Marketplace | [→ Publishing Guide](./plugin#_2-·-publishing-guide-private-npm-and-marketplaces) |

## Feature Quick Reference

### Claude.ai Platform Features

| Feature | Purpose | Doc Link |
|---------|---------|-----------|
| Projects | Persistent context + RAG knowledge base | [Claude.ai](./claude-ai#projects-dedicated-workspaces) |
| Extended Thinking | Complex reasoning, math, planning | [Claude.ai](./claude-ai#extended-thinking-deep-reasoning) |
| Research | Multi-turn deep web research | [Claude.ai](./claude-ai#research-deep-research) |
| Artifacts | Standalone code/document/chart output | [Claude.ai](./claude-ai#artifacts-standalone-content-output) |
| Interactive Charts | Actionable data visualization | [Claude.ai](./claude-ai#interactive-charts-and-visualizations) |
| Web Search | Real-time information retrieval | [Claude.ai](./claude-ai#web-search) |
| Voice Mode | Hands-free two-way voice conversation | [Claude.ai](./claude-ai#voice-mode) |
| File Creation | Generate Excel/Word/PPT/PDF directly | [Claude.ai](./claude-ai#file-creation-and-code-execution) |
| Memory | Save preferences across conversations | [Claude.ai](./claude-ai#memory-cross-conversation-memory) |
| Skills | Load specialized workflows | [Claude.ai](./claude-ai#skills-system) |
| Private Chat | Conversations not used for training | [Claude.ai](./claude-ai#privacy-and-security) |

### Claude Code Core Features

| Feature | Purpose | Doc Link |
|---------|---------|-----------|
| Terminal CLI | Direct interaction in project directory | [Claude Code](./claude-code#cli-quick-start) |
| VS Code / JetBrains | Embedded editor integration | [Claude Code](./claude-code#vs-code-extension) |
| Desktop App | Visual diff, parallel sessions, PR monitoring | [Claude Code](./claude-code#desktop-app) |
| Web Version | Runs in browser, no installation | [Claude Code](./claude-code#web-version) |
| CLAUDE.md / Memory | Project-level persistent context + auto memory | [Claude Code](./claude-code#project-context-management) |
| MCP Integration | Connect databases, APIs, tools | [Claude Code](./claude-code#mcp-integration) |
| Hooks | Auto-trigger (lint, format, custom scripts) | [Claude Code](./claude-code#hooks) |
| Skills | Load specialized workflows | [Claude Code](./claude-code#skills) |
| Sub-agents | Multi-agent parallel processing | [Claude Code](./claude-code#sub-agents) |
| Dynamic Workflows | Scripted orchestration of large-scale agent workflows | [Claude Code](./claude-code#dynamic-workflows) |
| Cross-Session Messaging | Cross-session message collaboration | [Claude Code](./claude-code#cross-session-messaging) |
| Agent Teams | Multi-session team collaboration | [Claude Code](./claude-code#agent-teams-experimental) |
| Channels | External message sources (Telegram/Discord/iMessage) | [Claude Code](./claude-code#cross-session-messaging) |
| Worktree | Git worktree parallel isolation | [Claude Code](./claude-code#worktree-parallel-isolation) |
| Scheduled Tasks | Cloud/desktop scheduled tasks | [Claude Code](./claude-code#scheduled-tasks) |
| Remote Control | Mobile/browser remote control of local session | [Claude Code](./claude-code#remote-control) |
| Computer Use | Control desktop GUI applications | [Claude Code](./claude-code#desktop-app) |
| Headless Mode | CI/CD script automation | [Claude Code](./claude-code#headless-mode) |
| Diagnostic Tools | Built-in diagnostic commands like /doctor, /context, /hooks | [Claude Code](./claude-code#troubleshooting) |
| Verification Mode | Writer→Reviewer, Tests→Iterate→Pass self-verification modes | [Claude Code](./claude-code#best-practices) |
| Practical Workflows | Prompt patterns and best practices for 9 daily scenarios | [Practical Workflow cookbook](./claude-code-cookbook) |
| Config Quick Reference | Settings Scope five-layer priority, permissions/Hook/plugin config | [Cheatsheet](./claude-code-cheatsheet) |
| Plugin System | Extend commands and skills | [Plugin](./plugin) |
| /powerup | Built-in interactive feature tutorial | [Claude Code](./claude-code#built-in-commands) |

### Claude Design Core Features

| Feature | Purpose | Doc Link |
|---------|---------|-----------|
| Design System Import | Extract brand guidelines from GitHub repo | [Claude Design](./claude-design#quick-start-your-first-30-minutes) |
| Web Capture | Capture real-time elements from any URL | [Claude Design](./claude-design#site-building-workflows-four-end-to-end-patterns) |
| Adjustment Knobs | Dynamic sliders for spacing/color/border-radius | [Claude Design](./claude-design#overview-what-exactly-is-claude-design) |
| Handoff Bundle | Design files + conversation handoff to Claude Code | [Claude Design](./claude-design#claude-code-integration-handoff-bundle) |
| Export as Standalone HTML | Static hosting deployment | [Claude Design](./claude-design#export-and-canva-choose-the-right-target) |
| Send to Canva | Fully editable Canva design | [Claude Design](./claude-design#export-and-canva-choose-the-right-target) |

### Connectors Core Features

| Feature | Purpose | Doc Link |
|---------|---------|-----------|
| Google Workspace | Gmail / Calendar / Drive | [Connectors](./connectors#google-workspace) |
| Microsoft 365 | Outlook / Teams / SharePoint (read-only) | [Connectors](./connectors#microsoft-365) |
| GitHub | PR / Issue / code search | [Connectors](./connectors#github) |
| Slack | Message search / send | [Connectors](./connectors#slack) |
| Notion / Linear / Asana | Task and page management | [Connectors](./connectors#linear-asana-jira) |
| Custom Remote MCP | Connect internal or self-built tools | [Connectors](./connectors#custom-connectors-remote-mcp) |

### Cowork Core Features

| Feature | Purpose | Doc Link |
|---------|---------|-----------|
| Local File Read/Write | Direct computer file operations | [Cowork](./cowork#core-capabilities) |
| Generate Professional Docs | Excel / PPT / Word | [Cowork](./cowork#core-capabilities) |
| Scheduled Tasks | Daily reports, auto organization | [Cowork](./cowork#scheduled-task-automation) |
| Plugin System | Install/customize skills and connectors | [Cowork](./cowork#plugin-system) |
| Computer Use | Control browser and applications | [Cowork](./cowork#computer-use) |
| Cross-App Collaboration | Dispatch tasks from anywhere | [Cowork](./cowork#cross-app-collaboration) |

## Model Reference

Claude Code and the Claude.ai platform support the following models (as of August 2026):

| Model | Positioning | Best For |
|-------|-------------|----------|
| Claude Opus 5 | Latest flagship | Most complex tasks, deep reasoning, enterprise-grade agents |
| Claude Fable 5 | Cutting-edge (limited) | Creative writing, complex reasoning (Pro/Max/Team/Enterprise) |
| Claude Opus 4.8 | High performance | Programming, agent tasks, complex code engineering |
| Claude Sonnet 4.6 | Balanced (default) | Daily development, writing, most tasks |
| Claude Haiku 4.5 | Fast lightweight | Simple Q&A, batch processing, low-cost scenarios |

> **Note**: Claude Code supports the `--model` parameter to switch models. Claude Design uses a separate Opus-level vision model with quota independent of Claude.ai conversation limits.

## Resources

- [Claude Code Cheatsheet · High-Quality Information Sources](./claude-code-cheatsheet#high-quality-information-sources) — Complete verified list of official docs/Cookbook, core team accounts & blogs, high-quality GitHub repos, Awesome Lists, and third-party blogs; also the basis for this tutorial's continuous updates
- [Claude Code Official Documentation](https://code.claude.com/docs/en/overview)
- [Claude.ai Help Center](https://support.claude.com/en)
- [Claude Pricing](https://claude.com/pricing)
- [MCP Registry](https://modelcontextprotocol.io/servers)
- [Connectors Full Collection](https://support.claude.com/en/collections/15399129-connectors)
- [Claude Design Product Entry](https://claude.ai/design)
