# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a **hands-on examples** directory for a "Vibe Coding" presentation. Each example demonstrates a concept from the presentation with step-by-step interactive demos.

## Commands

```bash
cd examples
npm install          # Install dependencies (only needed once)
npm run demo:2.1     # Tokenizer demo
npm run demo:2.2     # Embedding demo
npm run demo:2.3     # Attention demo
npm run demo:2.4     # Tool Use demo
npm run demo:3.1     # AGENTS.md demo
npm run demo:3.2     # Rules matching demo
npm run demo:3.3     # Commands & Skills demo
npm run demo:3.4     # MCP demo
npm run demo:3.5     # Hooks demo
npm run demo:3.6     # Sub-agents demo
npm run demo:4.1     # Cold-start demo (Intent to Architecture)
npm run demo:4.2     # Feature demo (PRD to PR)
npm run demo:4.3     # Hotfix demo (Crash to PR)
```

## Architecture

### Directory Structure

Examples are organized by category:

| Category | Topics |
|----------|--------|
| 2.x | Theory - Tokenizer, Embedding, Attention, Tool Use |
| 3.x | Features - AGENTS.md, Rules, Commands & Skills, MCP, Hooks, Sub-agents |
| 4.x | Practice - Cold-start, Feature development, Hotfix |

Each subdirectory (`X.Y.topic/`) contains its own README with step-by-step instructions.

### Claude/Cursor Configuration

- **`.claude/skills/`** - Claude Code skills (e.g., `security-audit.md`)
- **`.claude/hooks/`** - Claude Code hooks (e.g., `notify-on-stop.sh`)
- **`.claude/settings.json`** - Claude Code settings
- **`.cursor/rules/`** - Cursor Rules (`.mdc` files like `react-components.mdc`)
- **`.cursor/commands/`** - Cursor slash commands (e.g., `review.md`)
- **`.cursor/skills/`** - Cursor skills (folders with `SKILL.md`)
- **`.cursor/hooks/`** - Cursor hooks

**Important**: Cursor Rules require the workspace to be opened at the `examples/` directory (or parent containing `.cursor/`), not a subdirectory.

### Technology Stack

- **Language**: TypeScript (ESNext, strict mode)
- **Runtime**: Node.js with tsx for direct `.ts` execution
- **Key Dependencies**: `tiktoken`, `minimatch`
