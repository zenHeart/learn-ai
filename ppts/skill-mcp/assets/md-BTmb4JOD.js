import{_ as o}from"./slidev/CodeBlockWrapper.vue_vue_type_script_setup_true_lang-C1JDOXv8.js";import{b as p,o as u,w as e,g as s,e as c,m,D as n,v as d,x as C,A as a}from"./modules/vue-xTIOGTWz.js";import{I as f}from"./slidev/default-uIEIsV19.js";import{u as g,f as P}from"./slidev/context-Cm3L-It-.js";import"./modules/unplugin-icons-BSgOJP1f.js";import"./index-DA-1T9wj.js";import"./modules/shiki-CF2xWD23.js";const y={__name:"02.1.mcp-core.md__slidev_13",setup(k){const{$clicksContext:t,$frontmatter:i}=g();return t.setup(),(v,l)=>{const r=o;return u(),p(f,d(C(a(P)(a(i),12))),{default:e(()=>[l[1]||(l[1]=s("h1",null,"2. 三方架构 · Host / Client / Server",-1)),c(r,m({},{title:"",ranges:[]}),{default:e(()=>[...l[0]||(l[0]=[s("pre",{class:"shiki shiki-themes vitesse-dark vitesse-light slidev-code",style:{"--shiki-dark":"#dbd7caee","--shiki-light":"#393a34","--shiki-dark-bg":"#121212","--shiki-light-bg":"#ffffff"}},[s("code",{class:"language-text"},[s("span",{class:"line"},[s("span",null,"┌─────────────────────────────────────────────────────┐")]),n(`
`),s("span",{class:"line"},[s("span",null,"│                  MCP Host                           │")]),n(`
`),s("span",{class:"line"},[s("span",null,"│   (AI 应用：Claude Code / Cursor / VS Code ...)     │")]),n(`
`),s("span",{class:"line"},[s("span",null,"│                                                     │")]),n(`
`),s("span",{class:"line"},[s("span",null,"│   ┌──────────────┬──────────────┬──────────────┐  │")]),n(`
`),s("span",{class:"line"},[s("span",null,"│   │ MCP Client 1 │ MCP Client 2 │ MCP Client 3 │  │")]),n(`
`),s("span",{class:"line"},[s("span",null,"│   │   (一对一)    │   (一对一)    │   (一对一)    │  │")]),n(`
`),s("span",{class:"line"},[s("span",null,"│   └──────┬───────┴──────┬───────┴──────┬───────┘  │")]),n(`
`),s("span",{class:"line"},[s("span",null,"└──────────┼──────────────┼──────────────┼──────────┘")]),n(`
`),s("span",{class:"line"},[s("span",null,"           │              │              │")]),n(`
`),s("span",{class:"line"},[s("span",null,"           ▼              ▼              ▼")]),n(`
`),s("span",{class:"line"},[s("span",null,"   ┌──────────────┐ ┌──────────────┐ ┌──────────────┐")]),n(`
`),s("span",{class:"line"},[s("span",null,"   │ Filesystem   │ │ Postgres     │ │ Sentry MCP   │")]),n(`
`),s("span",{class:"line"},[s("span",null,"   │ MCP Server   │ │ MCP Server   │ │ Server       │")]),n(`
`),s("span",{class:"line"},[s("span",null,"   │   (本地)      │ │   (本地)      │ │   (远程)      │")]),n(`
`),s("span",{class:"line"},[s("span",null,"   └──────────────┘ └──────────────┘ └──────────────┘")])])],-1)])]),_:1},16),l[2]||(l[2]=s("div",{class:"mt-2 text-sm text-slate-600"},[s("ul",null,[s("li",null,[s("strong",null,"Host"),n("：协调和管理 MCP Clients 的 AI 应用")]),s("li",null,[s("strong",null,"Client"),n("：与单个 Server 维持专属连接，向 Host 提供上下文（Host 一对多，Client 一对一）")]),s("li",null,[s("strong",null,"Server"),n("：向 Client 暴露 context；可本地（stdio）也可远程（Streamable HTTP）")])])],-1))]),_:1},16)}}};export{y as default};
