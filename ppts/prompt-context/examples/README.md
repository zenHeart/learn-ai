# Examples

Interactive demos corresponding to each section of the talk.

## Directory Structure

Each numbered directory maps to a talk section:

| Directory | Section |
|-----------|---------|
| `2.1.zero-vs-few-shot` | 2.1 Zero-shot vs Few-shot |
| `2.2.cot-extended-thinking` | 2.2 Chain of Thought / Extended Thinking |
| `2.3.context-window` | 2.3 Context Window Strategies |
| `2.4.lost-in-the-middle` | 2.4 Lost in the Middle |
| `3.1.icio-framework` | 3.1 ICIO Framework |
| `3.2.claudeprompt` | 3.2 Claude Prompt Patterns |
| `3.3.tool-calling` | 3.3 Tool Calling |
| `4.1.vue3-component` | 4.1 Vue 3 Component |
| `4.2.bug-hunting-nn-client` | 4.2 Bug Hunting |

## Prerequisites

- Node.js (v18+)
- npm (comes with Node.js)

Install dependencies from the parent directory:

```bash
cd ../
npm install
```

## Running Demos

From the `prompt-context` directory, use npm scripts:

```bash
npm run demo:2.1
npm run demo:2.2
# ... etc
```

Or run node directly:

```bash
node examples/2.1.zero-vs-few-shot/main.js
```

Each demo is self-contained and demonstrates concepts from its corresponding section.
