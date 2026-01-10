# Path 3: Build AI Products

Design, build, and deploy production-ready AI-powered applications.

## Path 2 Completion Checklist

Before starting Path 3, ensure you understand:
- ✅ Built a streaming chatbot with error handling
- ✅ Implemented RAG search with embeddings
- ✅ Used tool calling to create interactive agents
- ✅ Deployed an AI feature to production

**Need to review?** → [Path 2: Integration](./integration.md)

## Choose Your Learning Style

- **🎯 Learn by Doing**: Start with [Full-Stack SaaS project](../projects/advanced/full-stack-saas.md) → reference guides
- **📚 Learn by Content**: Read [Advanced RAG Patterns](../tech/patterns/RAG.md) first → then build

<script setup>
const pathSteps = [
  {
    phase: 'Week 1',
    title: 'Advanced RAG',
    description: 'Implement production-grade RAG with hybrid search, re-ranking, and metadata filtering for enterprise knowledge bases.',
    status: 'active',
    links: [
      { text: 'RAG Pattern', url: '/tech/patterns/RAG' },
      { text: 'RAG Search Project', url: '/projects/intermediate/rag-search' },
      { text: 'Local Embeddings', url: '/cookbook/local-embedding' }
    ]
  },
  {
    phase: 'Week 2',
    title: 'AI Engineering',
    description: 'Treat prompts like code. Implement evals, monitoring, and feedback loops to systematically improve AI quality.',
    status: 'active',
    links: [
      { text: 'Testing', url: '/tech/engineering/testing' },
      { text: 'Observability', url: '/tech/engineering/observability' },
      { text: 'Evals', url: '/tech/engineering/evals' },
      { text: 'Security', url: '/tech/engineering/security' }
    ]
  },
  {
    phase: 'Week 3',
    title: 'Deployment & Optimization',
    description: 'Deploy to Edge/Workers for low latency, implement caching strategies, rate limiting, and cost optimization.',
    status: 'active',
    links: [
      { text: 'Vercel Edge', url: '/deployment/vercel-edge' },
      { text: 'Cloudflare Workers', url: '/deployment/cloudflare-workers' },
      { text: 'Caching', url: '/deployment/caching' },
      { text: 'Cost Optimization', url: '/tech/engineering/cost-optimization' }
    ]
  },
  {
    phase: 'Week 4',
    title: 'Multi-Agent Systems',
    description: 'Build complex autonomous workflows with multiple specialized agents, fine-tuning strategies, and local LLM deployment.',
    status: 'active',
    links: [
      { text: 'Multi-Agent App', url: '/projects/advanced/multi-agent-app' },
      { text: 'Agent Patterns', url: '/tech/patterns/agent/' },
      { text: 'Training Overview', url: '/tech/training/' },
      { text: 'Browser AI', url: '/tech/frontend/browser-ai' }
    ]
  }
]
</script>

<LearningPath
  title="Path 3: <span>Build AI Products</span>"
  subtitle="Design, build, and deploy production-ready AI-powered applications."
  :steps="pathSteps"
/>

## Next Steps

**Ready to build?** → [Projects Section](../projects/)

**Review concepts?** → [Tech Fundamentals](../tech/fundamentals/LLM.md)
