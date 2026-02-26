# Path 1: Use AI Tools

Master AI coding assistants to code 2-3x faster with Cursor, Copilot, Claude CLI, and Gemini CLI.

## Overview

This learning path transforms you from a traditional developer into an **AI-augmented engineer** who codes 2-3x faster. You'll master the most powerful AI coding assistants and learn to write prompts that generate production-quality code.

**What You'll Achieve**:
- ⚡️ **2-3x faster coding** with AI autocomplete and generation
- 🐛 **Debug in minutes** instead of hours with AI assistance
- 📚 **Learn new codebases** rapidly with AI explanations
- ✨ **Generate boilerplate** instantly (components, tests, configs)

## AI Coding Tools Landscape

Before diving in, understand the **5 levels of AI coding assistance**:

| Level | Capability | Example Tools |
|-------|------------|---------------|
| **L1** | Code-level completion | GitHub Copilot, Tabby |
| **L2** | Task-level code generation | Cursor, Claude CLI, Copilot Chat, Continue |
| **L3** | Project-level generation | v0, Sweep, Pythagora |
| **L4** | PRD to production | bolt.new, Lovable, Devin |
| **L5** | AI development team | MetaGPT, AutoDev |

**This path focuses on L1-L2** - the tools you'll use daily as a frontend engineer.

## Before You Start

**New to AI Coding?** Review these concepts first:
- [Prompt Engineering Basics](../tech/prompt/index.md) - Learn how to talk to AI effectively
- [AI Coding Tools Overview](../products/ai-coding/index.md) - Understand the different types of tools available

<script setup>
const pathSteps = [
  {
    phase: 'Week 1',
    title: 'Tool Setup & First Prompts',
    description: 'Choose your primary tool (Cursor, Copilot, or Claude CLI) and learn to write effective prompts for code generation.',
    status: 'active',
    links: [
      { text: 'Cursor Guide', url: '/products/ai-coding/cursor' },
      { text: 'Copilot Guide', url: '/products/ai-coding/copilot' },
      { text: 'Claude CLI', url: '/products/ai-coding/claude-cli' },
      { text: 'Gemini CLI', url: '/products/ai-coding/gemini-cli' }
    ]
  },
  {
    phase: 'Week 1',
    title: 'Effective Prompt Engineering',
    description: 'Learn the CRISP framework (Context, Requirements, Input/Output, Style, Pitfalls) to generate production-quality code.',
    status: 'active',
    links: [
      { text: 'Prompt Engineering', url: '/tech/prompt/' },
      { text: 'Copilot Cases', url: '/tech/prompt/cases/copilot' }
    ]
  },
  {
    phase: 'Week 2',
    title: 'Advanced Patterns',
    description: 'Master iterative refinement, context loading, and multi-file operations. Generate code that matches your codebase style.',
    status: 'active',
    links: [
      { text: 'AI Coding Tools', url: '/products/ai-coding/' },
      { text: 'Other Tools', url: '/products/ai-coding/othertools' }
    ]
  },
  {
    phase: 'Week 2',
    title: 'Real-World Projects',
    description: 'Apply AI coding to actual development tasks: form builders, API clients, and comprehensive test suites.',
    status: 'active',
    links: [
      { text: 'Next: Path 2', url: '/paths/integration' }
    ]
  }
]
</script>

<LearningPath
  title="Path 1: <span>Use AI Tools</span>"
  subtitle="Master AI coding assistants to code 2-3x faster."
  :steps="pathSteps"
/>

## Next Steps

**Ready to add AI features?** → [Path 2: Integration](./integration.md)

**Explore all tools?** → [AI Coding Tools](../products/ai-coding/)
