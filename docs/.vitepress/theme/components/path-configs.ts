/**
 * Learning Path Configuration Examples
 * 
 * These configs can be used with the LearningPath component
 * to display structured learning journeys.
 */

export interface PathStep {
  phase: string
  title: string
  description: string
  status?: 'active' | 'future'
  links?: Array<{
    text: string
    url: string
    external?: boolean
  }>
}

export interface PathConfig {
  title: string
  subtitle: string
  steps: PathStep[]
}

/**
 * Path 2: Add AI Features - Integration Path
 * For frontend engineers learning to integrate AI into apps
 */
export const integrationPathConfig: PathConfig = {
  title: 'Path 2: <span>Add AI Features</span>',
  subtitle: 'Integrate AI capabilities into your applications using JavaScript/TypeScript.',
  steps: [
    {
      phase: 'Week 1: Foundations',
      title: 'API Fundamentals',
      description: 'Understand how to communicate with Large Language Models (LLMs) via API. Learn authentication, models, and token-based pricing.',
      status: 'active',
      links: [
        { text: 'API Comparison', url: '/integration/apis/' },
        { text: 'OpenAI Guide', url: '/integration/apis/openai' },
        { text: 'Anthropic Guide', url: '/integration/apis/anthropic' }
      ]
    },
    {
      phase: 'Week 1: Foundations',
      title: 'Streaming UI',
      description: 'Users expect AI to "type" out answers. Learn to implement streaming with Vercel AI SDK and Server Sent Events.',
      status: 'active',
      links: [
        { text: 'Streaming Guide', url: '/tech/frontend/streaming' },
        { text: 'Vercel AI SDK', url: '/integration/frameworks/vercel-ai-sdk' },
        { text: 'Chat UI Recipe', url: '/cookbook/chat-ui' }
      ]
    },
    {
      phase: 'Week 2: Advanced',
      title: 'RAG Patterns',
      description: 'Teach AI about your data. Implement Retrieval-Augmented Generation to ground AI responses in your documents.',
      status: 'active',
      links: [
        { text: 'RAG Pattern', url: '/tech/patterns/RAG' },
        { text: 'Embeddings Guide', url: '/tech/fundamentals/embeddings' },
        { text: 'RAG Project', url: '/projects/intermediate/rag-search' }
      ]
    },
    {
      phase: 'Week 2: Advanced',
      title: 'Tool Calling & Agents',
      description: 'Turn AI from a chatbot into an agent that performs actions. Implement function calling and tool use patterns.',
      status: 'active',
      links: [
        { text: 'Tool Calling', url: '/integration/protocols/tool-calling' },
        { text: 'MCP Protocol', url: '/integration/protocols/mcp' },
        { text: 'Generative UI', url: '/tech/frontend/generative-ui' }
      ]
    },
    {
      phase: 'Week 3: Projects',
      title: 'Production Features',
      description: 'Combine everything into polished features: smart form autocomplete, documentation Q&A bots, and AI dashboard analysts.',
      status: 'active',
      links: [
        { text: 'AI Chatbot', url: '/projects/beginner/ai-chatbot' },
        { text: 'Form Builder', url: '/projects/intermediate/ai-form-builder' },
        { text: 'Error Handling', url: '/cookbook/error-handling' }
      ]
    }
  ]
}

/**
 * Path 1: Use AI Tools - Productivity Path
 * For developers learning to use AI coding assistants
 */
export const productivityPathConfig: PathConfig = {
  title: 'Path 1: <span>Use AI Tools</span>',
  subtitle: 'Master AI coding assistants to code 2-3x faster.',
  steps: [
    {
      phase: 'Week 1: Foundations',
      title: 'Tool Setup & First Prompts',
      description: 'Choose your primary tool (Cursor, Copilot, or Claude CLI) and learn to write effective prompts for code generation.',
      status: 'active',
      links: [
        { text: 'Cursor Guide', url: '/products/ai-coding/cursor' },
        { text: 'Copilot Guide', url: '/products/ai-coding/copilot' },
        { text: 'Claude CLI', url: '/products/ai-coding/claude-cli' }
      ]
    },
    {
      phase: 'Week 1: Foundations',
      title: 'Effective Prompt Engineering',
      description: 'Learn the CRISP framework (Context, Requirements, Input/Output, Style, Pitfalls) to generate production-quality code.',
      status: 'active',
      links: [
        { text: 'Prompt Engineering', url: '/tech/prompt/' },
        { text: 'Copilot Cases', url: '/tech/prompt/cases/copilot' }
      ]
    },
    {
      phase: 'Week 2: Mastery',
      title: 'Advanced Patterns',
      description: 'Master iterative refinement, context loading, and multi-file operations. Generate code that matches your codebase style.',
      status: 'active',
      links: [
        { text: 'AI Coding Tools', url: '/products/ai-coding/' }
      ]
    },
    {
      phase: 'Week 2: Mastery',
      title: 'Real-World Projects',
      description: 'Apply AI coding to actual development tasks: form builders, API clients, and comprehensive test suites.',
      status: 'active',
      links: [
        { text: 'Next: Path 2', url: '/paths/integration' }
      ]
    }
  ]
}

/**
 * Path 3: Build AI Products - Mastery Path
 * For senior engineers building production AI applications
 */
export const masteryPathConfig: PathConfig = {
  title: 'Path 3: <span>Build AI Products</span>',
  subtitle: 'Design, build, and deploy production-ready AI-powered applications.',
  steps: [
    {
      phase: 'Week 1: Advanced RAG',
      title: 'Hybrid Search & Re-ranking',
      description: 'Implement production-grade RAG with hybrid search (keyword + semantic), re-ranking, and metadata filtering.',
      status: 'active',
      links: [
        { text: 'Advanced RAG', url: '/tech/patterns/RAG' },
        { text: 'RAG Project', url: '/projects/intermediate/rag-search' }
      ]
    },
    {
      phase: 'Week 2: AI Engineering',
      title: 'Testing & Observability',
      description: 'Treat prompts like code. Implement evals, monitoring, and feedback loops to systematically improve AI quality.',
      status: 'active',
      links: [
        { text: 'Testing Guide', url: '/tech/engineering/testing' },
        { text: 'Observability', url: '/tech/engineering/observability' },
        { text: 'Evals', url: '/tech/engineering/evals' }
      ]
    },
    {
      phase: 'Week 3: Production',
      title: 'Deployment & Optimization',
      description: 'Deploy to Edge/Workers, implement caching strategies, rate limiting, and cost optimization.',
      status: 'active',
      links: [
        { text: 'Vercel Edge', url: '/deployment/vercel-edge' },
        { text: 'Cloudflare Workers', url: '/deployment/cloudflare-workers' },
        { text: 'Cost Optimization', url: '/tech/engineering/cost-optimization' }
      ]
    },
    {
      phase: 'Week 4: Architecture',
      title: 'Multi-Agent Systems',
      description: 'Build complex autonomous workflows with multiple specialized agents, fine-tuning strategies, and local LLMs.',
      status: 'active',
      links: [
        { text: 'Multi-Agent App', url: '/projects/advanced/multi-agent-app' },
        { text: 'Full Stack SaaS', url: '/projects/advanced/full-stack-saas' },
        { text: 'Agent Patterns', url: '/tech/patterns/agent/' }
      ]
    }
  ]
}

