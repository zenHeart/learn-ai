import { defineConfig } from 'vitepress'
import { withMermaid } from "vitepress-plugin-mermaid";
import path from "path";

export default withMermaid(defineConfig({
   title: "Learn AI",
   description: "AI Learning Resources & PPTs",
   base: '/learn-ai/',
   ignoreDeadLinks: [
      // Ignore links to PPTs as they are built externally and copied in
      /^\/learn-ai\/ppts\//,
      // Ignore links to examples directory (outside docs/)
      /examples\//,
      // Ignore root-level files (both absolute and relative paths)
      /README\.md/,
      /CONTRIBUTING\.md/,
      // Ignore localhost development URLs
      /^http:\/\/localhost/,
      // Ignore coming soon pages
      /structured-output/,
      /projects\/index/,
   ],
   vite: {
      resolve: {
         alias: {
            // Dayjs plugin mappings for mermaid compatibility
            // These MUST come before any general dayjs alias
            'dayjs/plugin/advancedFormat.js': 'dayjs/esm/plugin/advancedFormat',
            'dayjs/plugin/customParseFormat.js': 'dayjs/esm/plugin/customParseFormat',
            'dayjs/plugin/isoWeek.js': 'dayjs/esm/plugin/isoWeek',
            'dayjs/plugin/duration.js': 'dayjs/esm/plugin/duration',

            // Other aliases
            "@braintree/sanitize-url": path.resolve(
               __dirname,
               "../../node_modules/.pnpm/@braintree+sanitize-url@7.1.1/node_modules/@braintree/sanitize-url/dist/index.js"
            ),
         },
      },
      optimizeDeps: {
         include: [
            'dayjs',
            'cytoscape-cose-bilkent',
            'cytoscape',
            'debug'
         ],
      },
      build: {
         rollupOptions: {
            output: {
               manualChunks(id) {
                  // Split mermaid and its dependencies into separate chunks
                  if (id.includes('node_modules')) {
                     if (id.includes('mermaid')) {
                        return 'mermaid';
                     }
                     if (id.includes('cytoscape')) {
                        return 'cytoscape';
                     }
                     if (id.includes('dayjs')) {
                        return 'dayjs';
                     }
                  }
               }
            }
         },
         chunkSizeWarningLimit: 2000, // Increase limit to 2000 kB for large dependencies like mermaid
      }
   },
   themeConfig: {
      nav: [
         { text: 'Home', link: '/' },
         { text: 'Paths', link: '/paths/' },
         { text: 'Docs', link: '/tech/' },
         { text: 'Cookbook', link: '/cookbook/' },
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
               text: '🗺️ Learning Paths',
               collapsed: false,
               items: [
                  { text: 'Path Overview', link: '/paths/' },
                  { text: 'Path 1: Productivity', link: '/paths/productivity' },
                  { text: 'Path 2: Integration', link: '/paths/integration' },
                  { text: 'Path 3: Mastery', link: '/paths/mastery' }
               ]
            },
            {
               text: '🔌 Integration Guides',
               collapsed: true,
               items: [
                  {
                     text: 'APIs',
                     collapsed: false,
                     items: [
                        { text: 'Comparison & Costs', link: '/integration/apis/' },
                        { text: 'OpenAI', link: '/integration/apis/openai' },
                        { text: 'Anthropic (Claude)', link: '/integration/apis/anthropic' },
                        { text: 'HuggingFace', link: '/integration/apis/huggingface' },
                        { text: 'Streaming Patterns', link: '/integration/apis/streaming' }
                     ]
                  },
                  {
                     text: 'Frameworks',
                     collapsed: false,
                     items: [
                        { text: 'Overview', link: '/integration/frameworks/' },
                        { text: 'Vercel AI SDK', link: '/integration/frameworks/vercel-ai-sdk' },
                        { text: 'LangChain.js', link: '/integration/frameworks/langchain-js' },
                        { text: 'LlamaIndex.TS', link: '/integration/frameworks/llamaindex-ts' },
                        { text: 'Next.js Integration', link: '/integration/frameworks/nextjs' }
                     ]
                  },
                  {
                     text: 'Protocols',
                     items: [
                        { text: 'MCP (Model Context Protocol)', link: '/integration/protocols/mcp' },
                        { text: 'Tool Calling', link: '/integration/protocols/tool-calling' }
                     ]
                  },
                  {
                     text: 'Frontend ML',
                     items: [
                        { text: 'Overview', link: '/integration/frontend-ml/' },
                        { text: 'Transformers.js', link: '/integration/frontend-ml/transformersjs' },
                        { text: 'TensorFlow.js', link: '/integration/frontend-ml/tensorflowjs' },
                        { text: 'ml5.js', link: '/integration/frontend-ml/ml5js' },
                        { text: 'ONNX Runtime', link: '/integration/frontend-ml/onnx-runtime' }
                     ]
                  }
               ]
            },
            {
               text: '🧠 Tech Concepts',
               collapsed: true,
               items: [
                  {
                     text: 'Fundamentals',
                     items: [
                        { text: 'LLM Basics', link: '/tech/fundamentals/LLM' },
                        { text: 'Context Window', link: '/tech/fundamentals/context' },
                        { text: 'Embeddings', link: '/tech/fundamentals/embeddings' },
                        { text: 'Prompt Engineering', link: '/tech/fundamentals/prompt/' }
                     ]
                  },
                  {
                     text: 'Frontend AI',
                     items: [
                        { text: 'Streaming UI', link: '/tech/frontend/streaming' },
                        { text: 'Generative UI', link: '/tech/frontend/generative-ui' },
                        { text: 'Browser AI', link: '/tech/frontend/browser-ai' },
                        { text: 'State Management', link: '/tech/frontend/state-management' }
                     ]
                  },
                  {
                     text: 'Engineering',
                     items: [
                        { text: 'Testing', link: '/tech/engineering/testing' },
                        { text: 'Evals', link: '/tech/engineering/evals' },
                        { text: 'Observability', link: '/tech/engineering/observability' },
                        { text: 'Security', link: '/tech/engineering/security' },
                        { text: 'Cost Optimization', link: '/tech/engineering/cost-optimization' }
                     ]
                  },
                  {
                     text: 'Patterns',
                     items: [
                        { text: 'RAG', link: '/tech/patterns/RAG' },
                        { text: 'Agents', link: '/tech/patterns/agent/' }
                     ]
                  },
                  {
                     text: 'Training',
                     items: [
                        { text: 'Overview', link: '/tech/training/' },
                        { text: 'SFT', link: '/tech/training/SFT' },
                        { text: 'RLHF', link: '/tech/training/RLHF' },
                        { text: 'PEFT', link: '/tech/training/PEFT' }
                     ]
                  }
               ]
            },
            {
               text: '🛠️ Projects',
               collapsed: true,
               items: [
                  {
                     text: 'Beginner',
                     items: [
                        { text: 'AI Chatbot', link: '/projects/beginner/ai-chatbot' },
                        { text: 'Text Summarizer', link: '/projects/beginner/text-summarizer' },
                        { text: 'Image Generator', link: '/projects/beginner/image-generator' }
                     ]
                  },
                  {
                     text: 'Intermediate',
                     items: [
                        { text: 'RAG Search', link: '/projects/intermediate/rag-search' },
                        { text: 'Code Autocomplete', link: '/projects/intermediate/code-completion' },
                        { text: 'AI Form Builder', link: '/projects/intermediate/ai-form-builder' },
                        { text: 'Semantic Search', link: '/projects/intermediate/semantic-search' }
                     ]
                  },
                  {
                     text: 'Advanced',
                     items: [
                        { text: 'Full Stack SaaS', link: '/projects/advanced/full-stack-saas' },
                        { text: 'Multi-Agent App', link: '/projects/advanced/multi-agent-app' },
                        { text: 'AI Design Tool', link: '/projects/advanced/ai-design-tool' }
                     ]
                  }
               ]
            },
            {
               text: '🍳 Cookbook',
               collapsed: true,
               items: [
                  { text: 'Overview', link: '/cookbook/' },
                  { text: 'Chat UI Component', link: '/cookbook/chat-ui' },
                  { text: 'Secure API Proxy', link: '/cookbook/api-proxy' },
                  { text: 'Local Embeddings', link: '/cookbook/local-embedding' },
                  { text: 'Form Autocomplete', link: '/cookbook/form-autocomplete' },
                  { text: 'Error Handling', link: '/cookbook/error-handling' },
                  { text: 'Content Moderation', link: '/cookbook/content-moderation' }
               ]
            },
            {
               text: '🚢 Deployment',
               collapsed: true,
               items: [
                  { text: 'Overview', link: '/deployment/' },
                  { text: 'Vercel Edge', link: '/deployment/vercel-edge' },
                  { text: 'Cloudflare Workers', link: '/deployment/cloudflare-workers' },
                  { text: 'Caching Strategies', link: '/deployment/caching' },
                  { text: 'Rate Limiting', link: '/deployment/rate-limiting' },
                  { text: 'Monitoring', link: '/deployment/monitoring' },
                  { text: 'Cost Calculator', link: '/deployment/cost-calculator' }
               ]
            },
            {
               text: '💡 Use Cases',
               collapsed: true,
               items: [
                  { text: 'Library', link: '/use-cases/' },
                  { text: 'Add AI Search', link: '/use-cases/add-ai-search' },
                  { text: 'Migrate to AI', link: '/use-cases/migrate-to-ai' },
                  { text: 'AI Analytics', link: '/use-cases/ai-analytics' },
                  { text: 'Recommendations', link: '/use-cases/recommendations' },
                  { text: 'Accessibility', link: '/use-cases/accessibility' }
               ]
            },
            {
               text: '🧰 Products & Tools',
               collapsed: true,
               items: [
                  {
                     text: 'AI Coding',
                     items: [
                        { text: 'Cursor', link: '/products/ai-coding/cursor' },
                        { text: 'Copilot', link: '/products/ai-coding/copilot' },
                        { text: 'Claude CLI', link: '/products/ai-coding/claude-cli' },
                        { text: 'Gemini CLI', link: '/products/ai-coding/gemini-cli' },
                        { text: 'Other Tools', link: '/products/ai-coding/othertools' }
                     ]
                  },
                  {
                     text: 'Tools',
                     items: [
                        { text: 'Ollama', link: '/products/tools/ollama' },
                        { text: 'Figma AI', link: '/products/tools/figma-ai' },
                        { text: 'Testing AI', link: '/products/tools/testing-ai' }
                     ]
                  },
                  { text: '📚 Resources', link: '/resources' }
               ]
            }
         ]
      },
      socialLinks: [
         { icon: 'github', link: 'https://github.com/zenheart/learn-ai' }
      ]
   }
}));
