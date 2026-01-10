import { defineConfig } from 'vitepress'

export default defineConfig({
   title: "Learn AI",
   description: "AI Learning Resources & PPTs",
   base: '/learn-ai/',
   ignoreDeadLinks: [
      // Ignore links to PPTs as they are built externally and copied in
      /^\/learn-ai\/ppts\//,
   ],
   themeConfig: {
      nav: [
         { text: 'Home', link: '/' },
         { text: 'Learning Paths', link: '/paths/' },
         { text: 'Docs', link: '/tech/' },
         {
            text: 'PPTs', items: [
               { text: 'Prompt Engineering', link: 'https://blog.zenheart.site/learn-ai/ppts/prompt/' },
               { text: 'MCP Protocol', link: 'https://blog.zenheart.site/learn-ai/ppts/mcp' }
            ]
         }
      ],
      sidebar: {
         '/': [
            {
               text: 'Learning Paths',
               link: '/paths/',
               items: [
                  { text: '📍 Path Overview', link: '/paths/' },
                  { text: '⚡️ Path 1: Use AI Tools', link: '/paths/productivity' },
                  { text: '🚧 Path 2: Add AI Features', link: '/paths/integration' },
                  { text: '🚧 Path 3: Build AI Products', link: '/paths/mastery' }
               ]
            },
            {
               text: 'Tech Stack',
               link: '/tech/',
               items: [
                  {
                     text: 'Fundamentals',
                     collapsed: false,
                     items: [
                        { text: 'LLM Basics', link: '/tech/fundamentals/LLM' },
                        { text: 'Context Management', link: '/tech/fundamentals/context' },
                        { text: 'Vector DB & Embeddings', link: '/tech/fundamentals/embeddings' },
                        {
                           text: 'Prompt Engineering',
                           link: '/tech/fundamentals/prompt',
                           items: [
                              { text: 'Agents Documentation', link: '/tech/fundamentals/prompt/agents-doc' },
                              {
                                 text: 'Case Studies', items: [
                                    { text: 'GitHub Copilot', link: '/tech/fundamentals/prompt/cases/copilot' },
                                 ]
                              }
                           ]
                        }
                     ]
                  },
                  {
                     text: 'Patterns',
                     collapsed: false,
                     items: [
                        { text: 'Overview', link: '/tech/patterns/' },
                        { text: 'RAG', link: '/tech/patterns/RAG' },
                        {
                           text: 'Agent Patterns',
                           link: '/tech/patterns/agent',
                           items: [
                              { text: 'Skills', link: '/tech/patterns/agent/skills' },
                              { text: 'Hooks', link: '/tech/patterns/agent/hooks' },
                           ]
                        }
                     ]
                  },
                  {
                     text: 'Training Concepts',
                     collapsed: true,
                     items: [
                        { text: 'Overview', link: '/tech/training/' },
                        { text: 'SFT (Supervised Fine-Tuning)', link: '/tech/training/SFT' },
                     ]
                  }
               ]
            },
            {
               text: 'Integration',
               collapsed: true,
               items: [
                  {
                     text: 'Protocols',
                     items: [
                        { text: 'MCP (Model Context Protocol)', link: '/integration/protocols/mcp' },
                     ]
                  }
               ]
            },
            {
               text: 'Products',
               collapsed: false,
               items: [
                  {
                     text: 'tools', items: [
                        { text: 'ollama', link: '/products/tools/ollama' },
                     ]
                  },
                  {
                     text: 'AI Coding',
                     link: '/products/ai-coding',
                     items: [
                        { text: 'Cursor', link: '/products/ai-coding/cursor' },
                        { text: 'Copilot', link: '/products/ai-coding/copilot' },
                        { text: 'Claude CLI', link: '/products/ai-coding/claude-cli' },
                        { text: 'Gemini CLI', link: '/products/ai-coding/gemini-cli' },
                        { text: 'Other Tools', link: '/products/ai-coding/othertools' }
                     ]
                  }
               ]
            },
         ]
      },
      socialLinks: [
         { icon: 'github', link: 'https://github.com/zenheart/learn-ai' }
      ]
   }
})