import { defineConfig } from 'vitepress'

export default defineConfig({
  title: "Learn AI",
  description: "AI Learning Resources & PPTs",
  base: '/learn-ai/',
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'AI Develop', link: '/ai-develop/' },
      { text: 'Tech Stack', link: '/tech/' },
      { text: 'Use Cases', link: '/use-case/' },
      { text: 'Prompts', link: '/prompts/copilot' },
      { text: 'PPTs', link: '/ppts/' }
    ],
    sidebar: {
      '/ai-develop/': [
        {
          text: 'AI Develop',
          items: [
            { text: 'Introduction', link: '/ai-develop/' },
          ]
        }
      ],
      '/tech/': [
        {
          text: 'Technologies',
          items: [
            { text: 'Overview', link: '/tech/' },
            { text: 'Agents', link: '/tech/Agent' },
            { text: 'RAG', link: '/tech/RAG' },
            { text: 'SFT', link: '/tech/SFT' },
            { text: 'Workflow', link: '/tech/Workflow' }
          ]
        }
      ],
      '/use-case/': [
        {
          text: 'Use Cases',
          items: [
            { text: 'AI Coding', link: '/use-case/ai-coding/' }
          ]
        }
      ]
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/zenheart/learn-ai' }
    ]
  }
})
