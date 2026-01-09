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
               text: 'Tech Stack',
               link: '/tech/',
               items: [
                  { text: 'LLM', link: '/tech/LLM' },
                  {
                     text: 'Prompt Engineering',
                     link: '/tech/prompt',
                      items: [
                        { text: 'AGENTS.md ', link: '/tech/prompt/agents-doc.md' },
                        {
                           text: 'case Studies', items: [
                              { text: 'copilot', link: '/tech/prompt/cases/copilot' },
                           ]
                        }
                     ]
                  },
                  { text: 'context', link: '/tech/context' },
                  {
                     text: 'Agent',
                     link: '/tech/agent',
                     items: [
                        { text: 'MCP', link: '/tech/MCP' },
                        { text: 'SKILLS', link: '/tech/agent/skills' },
                     ]
                  },
                  { text: 'RAG', link: '/tech/RAG' },
                  { text: 'SFT', link: '/tech/SFT' },
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