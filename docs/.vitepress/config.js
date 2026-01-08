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
               collapsed: false,
               items: [
                  { text: 'Overview', link: '/tech/' },
                  { text: 'LLM', link: '/tech/LLM' },
                  { text: 'Prompt Engineering', items: [
                     { text: 'Overview', link: '/tech/prompt/' },
                     { text: 'case Studies', items: [
                        { text: 'copilot', link: '/tech/prompt/cases/copilot' },
                     ]}
                  ] },
                  { text: 'context', link: '/tech/context' },
                  { text: 'MCP', link: '/tech/MCP'  },
                  { text: 'Agent', link: '/tech/Agent' },
                  { text: 'RAG', link: '/tech/RAG' },
                  { text: 'SFT', link: '/tech/SFT' },
               ]
            },
            {
               text: 'Products',
               collapsed: false,
               items: [
                  {
                     text: 'AI Coding',
                     items: [
                        { text: 'Claude CLI', link: '/products/ai-coding/claude-cli' },
                        { text: 'Copilot', link: '/products/ai-coding/copilot' },
                        { text: 'Cursor', link: '/products/ai-coding/cursor' },
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