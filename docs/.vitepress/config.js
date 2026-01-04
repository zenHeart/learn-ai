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
         { text: 'Docs', link: '/ai-develop/' },
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
               text: 'AI Develop',
               collapsed: false,
               items: [
                  { text: 'Introduction', link: '/ai-develop/' },
               ]
            },
            {
               text: 'Tech Stack',
               collapsed: false,
               items: [
                  { text: 'Overview', link: '/tech/' },
                  { text: 'Agent', link: '/tech/Agent' },
                  { text: 'RAG', link: '/tech/RAG' },
                  { text: 'SFT', link: '/tech/SFT' },
                  { text: 'Workflow', link: '/tech/Workflow' }
               ]
            },
            {
               text: 'Use Cases',
               collapsed: false,
               items: [
                  {
                     text: 'AI Coding',
                     link: '/use-case/ai-coding/',
                     items: [
                        { text: 'Copilot', link: '/use-case/ai-coding/copilot' },
                        { text: 'Cursor', link: '/use-case/ai-coding/cursor' },
                        { text: 'Gemini CLI', link: '/use-case/ai-coding/gemini-cli' },
                        { text: 'Other Tools', link: '/use-case/ai-coding/othertools' }
                     ]
                  }
               ]
            },
            {
               text: 'Prompts',
               collapsed: false,
               items: [
                  { text: 'Copilot Prompts', link: '/prompts/copilot' }
               ]
            }
         ]
      },
      socialLinks: [
         { icon: 'github', link: 'https://github.com/zenheart/learn-ai' }
      ]
   }
})
