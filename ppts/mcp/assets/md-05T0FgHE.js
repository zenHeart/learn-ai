import{_ as r}from"./slidev/CodeBlockWrapper.vue_vue_type_script_setup_true_lang-B98rygx3.js";import{b as o,o as c,w as l,g as s,e as u,m as d,G as n,v as m,x as f,A as e}from"./modules/vue-CXUyuVNl.js";import{I as k}from"./slidev/default-7lL4p7Y_.js";import{u as _,f as g}from"./slidev/context-K55dWgT4.js";import"./modules/unplugin-icons-De29F5Lf.js";import"./index-CYkkzpDI.js";import"./modules/shiki-BpgxzpLo.js";const M={__name:"02.architecture.md__slidev_9",setup(C){const{$clicksContext:t,$frontmatter:i}=_();return t.setup(),(h,a)=>{const p=r;return c(),o(k,m(f(e(g)(e(i),8))),{default:l(()=>[a[1]||(a[1]=s("h1",null,"核心架构：三个关键参与者",-1)),u(p,d({},{title:"",ranges:[]}),{default:l(()=>[...a[0]||(a[0]=[s("pre",{class:"shiki shiki-themes vitesse-dark vitesse-light slidev-code",style:{"--shiki-dark":"#dbd7caee","--shiki-light":"#393a34","--shiki-dark-bg":"#121212","--shiki-light-bg":"#ffffff"}},[s("code",{class:"language-text"},[s("span",{class:"line"},[s("span",null,"┌─────────────────────────────────────────────────────┐")]),n(`
`),s("span",{class:"line"},[s("span",null,"│                    MCP Host                         │")]),n(`
`),s("span",{class:"line"},[s("span",null,"│       (如 Cursor, Claude Desktop, Windsurf)         │")]),n(`
`),s("span",{class:"line"},[s("span",null,"├─────────────────────────────────────────────────────┤")]),n(`
`),s("span",{class:"line"},[s("span",null,"│  ┌─────────────────────────────────────────────┐   │")]),n(`
`),s("span",{class:"line"},[s("span",null,"│  │              MCP Client                      │   │")]),n(`
`),s("span",{class:"line"},[s("span",null,"│  │         建立并维护与 Server 的 JSON-RPC 连接    │   │")]),n(`
`),s("span",{class:"line"},[s("span",null,"│  └─────────────────────────────────────────────┘   │")]),n(`
`),s("span",{class:"line"},[s("span",null,"└─────────────────────────────────────────────────────┘")]),n(`
`),s("span",{class:"line"},[s("span",null,"                         │")]),n(`
`),s("span",{class:"line"},[s("span",null,"                         ▼ (stdio 或 SSE)")]),n(`
`),s("span",{class:"line"},[s("span",null,"┌─────────────────────────────────────────────────────┐")]),n(`
`),s("span",{class:"line"},[s("span",null,"│                   MCP Server                        │")]),n(`
`),s("span",{class:"line"},[s("span",null,"│    (如 GitHub Server, Postgres Server)              │")]),n(`
`),s("span",{class:"line"},[s("span",null,"│    作为能力的提供者，暴露 工具、资源、提示词              │")]),n(`
`),s("span",{class:"line"},[s("span",null,"└─────────────────────────────────────────────────────┘")])])],-1)])]),_:1},16)]),_:1},16)}}};export{M as default};
