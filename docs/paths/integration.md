# Path 2: Add AI Features

Integrate AI capabilities into your applications using JavaScript/TypeScript.

## Choose Your Learning Style

- **🎯 Learn by Doing**: Start with [AI Chatbot project](../projects/beginner/ai-chatbot.md) → reference guides when needed

- **📚 Learn by Content**: Read [API Integration Guide](../integration/apis/index.md) first → then build projects

## Before You Start

**New to AI/LLMs?** Review these concepts first:
- [LLM Fundamentals](../tech/fundamentals/LLM.md) - Understanding Large Language Models
- [API Comparison](../integration/apis/index.md) - Choosing the right API provider

**Assumed Knowledge**: HTTP, REST APIs, JSON, basic Node.js/npm, React/Next.js fundamentals

<script setup>
const pathSteps = [
  {
    phase: 'Week 1',
    title: 'API Fundamentals',
    description: 'Understand how to communicate with Large Language Models (LLMs) via API. Learn authentication, models, and token-based pricing.',
    status: 'active',
    links: [
      { text: 'API Comparison', url: '/integration/apis/' },
      { text: 'OpenAI', url: '/integration/apis/openai' },
      { text: 'Anthropic', url: '/integration/apis/anthropic' },
      { text: 'LLM Basics', url: '/tech/fundamentals/LLM' }
    ]
  },
  {
    phase: 'Week 1',
    title: 'Streaming UI',
    description: 'Users expect AI to "type" out answers. Learn to implement streaming with Vercel AI SDK and Server Sent Events.',
    status: 'active',
    links: [
      { text: 'Streaming Guide', url: '/tech/frontend/streaming' },
      { text: 'Vercel AI SDK', url: '/integration/frameworks/vercel-ai-sdk' },
      { text: 'Chat UI Recipe', url: '/cookbook/chat-ui' },
      { text: 'AI Chatbot Project', url: '/projects/beginner/ai-chatbot' }
    ]
  },
  {
    phase: 'Week 2',
    title: 'RAG Patterns',
    description: 'Teach AI about your data. Implement Retrieval-Augmented Generation to ground AI responses in your documents.',
    status: 'active',
    links: [
      { text: 'RAG Pattern', url: '/tech/patterns/RAG' },
      { text: 'Embeddings', url: '/tech/fundamentals/embeddings' },
      { text: 'LlamaIndex TS', url: '/integration/frameworks/llamaindex-ts' },
      { text: 'RAG Search Project', url: '/projects/intermediate/rag-search' }
    ]
  },
  {
    phase: 'Week 2',
    title: 'Tool Calling & Agents',
    description: 'Turn AI from a chatbot into an agent that performs actions. Implement function calling and tool use patterns.',
    status: 'active',
    links: [
      { text: 'Tool Calling', url: '/integration/protocols/tool-calling' },
      { text: 'MCP Protocol', url: '/integration/protocols/mcp' },
      { text: 'Generative UI', url: '/tech/frontend/generative-ui' },
      { text: 'Agent Patterns', url: '/tech/patterns/agent/' }
    ]
  },
  {
    phase: 'Week 3',
    title: 'Production Features',
    description: 'Combine everything into polished features: smart form autocomplete, documentation Q&A bots, and error handling.',
    status: 'active',
    links: [
      { text: 'Form Builder', url: '/projects/intermediate/ai-form-builder' },
      { text: 'Form Autocomplete', url: '/cookbook/form-autocomplete' },
      { text: 'Error Handling', url: '/cookbook/error-handling' },
      { text: 'API Proxy', url: '/cookbook/api-proxy' }
    ]
  }
]
</script>

<LearningPath
  title="Path 2: <span>Add AI Features</span>"
  subtitle="Integrate AI capabilities into your applications using JavaScript/TypeScript."
  :steps="pathSteps"
/>

## Next Steps

**Ready for Path 3?** → [Path 3: Mastery](./mastery.md)

**Need troubleshooting?** → [Error Handling Cookbook](../cookbook/error-handling.md)
