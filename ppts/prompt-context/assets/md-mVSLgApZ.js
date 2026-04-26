import{_ as o}from"./slidev/CodeBlockWrapper.vue_vue_type_script_setup_true_lang-BNCLHDb3.js";import{b as r,o as c,w as a,g as s,e as u,m,ad as n,v as d,x as f,T as e}from"./modules/vue-9r0x5Mvu.js";import{I as k}from"./slidev/default-DfUDVj_b.js";import{u as _,f as g}from"./slidev/context-DzskvybD.js";import"./modules/unplugin-icons-CrjNJQm5.js";import"./index-DcmkdzUk.js";import"./modules/shiki-BFOqmQIV.js";const y={__name:"02.principle.md__slidev_18",setup(x){const{$clicksContext:p,$frontmatter:i}=_();return p.setup(),(h,l)=>{const t=o;return c(),r(k,d(f(e(g)(e(i),17))),{default:a(()=>[l[1]||(l[1]=s("h1",null,"Context Window 的完整结构",-1)),u(t,m({},{title:"",ranges:[]}),{default:a(()=>[...l[0]||(l[0]=[s("pre",{class:"shiki shiki-themes vitesse-dark vitesse-light slidev-code",style:{"--shiki-dark":"#dbd7caee","--shiki-light":"#393a34","--shiki-dark-bg":"#121212","--shiki-light-bg":"#ffffff"}},[s("code",{class:"language-text"},[s("span",{class:"line"},[s("span",null,"┌─────────────────────────────────────────────────────────────────┐")]),n(`
`),s("span",{class:"line"},[s("span",null,"│                         Context Window                          │")]),n(`
`),s("span",{class:"line"},[s("span",null,"│                                                                 │")]),n(`
`),s("span",{class:"line"},[s("span",null,"│  ┌──────────────────┐                                           │")]),n(`
`),s("span",{class:"line"},[s("span",null,"│  │  System Prompt   │  ← 全局规则、角色定义、约束（CLAUDE.md）  │")]),n(`
`),s("span",{class:"line"},[s("span",null,"│  │  (固定，高权重)   │                                           │")]),n(`
`),s("span",{class:"line"},[s("span",null,"│  └──────────────────┘                                           │")]),n(`
`),s("span",{class:"line"},[s("span",null,"│  ┌──────────────────┐                                           │")]),n(`
`),s("span",{class:"line"},[s("span",null,"│  │   RAG 召回内容   │  ← 外挂知识库，按相关性检索注入           │")]),n(`
`),s("span",{class:"line"},[s("span",null,"│  │  (动态注入)      │                                           │")]),n(`
`),s("span",{class:"line"},[s("span",null,"│  └──────────────────┘                                           │")]),n(`
`),s("span",{class:"line"},[s("span",null,"│  ┌──────────────────┐                                           │")]),n(`
`),s("span",{class:"line"},[s("span",null,"│  │   对话历史        │  ← 短期记忆，越长越占 Token              │")]),n(`
`),s("span",{class:"line"},[s("span",null,"│  │  (滚动窗口)      │                                           │")]),n(`
`),s("span",{class:"line"},[s("span",null,"│  └──────────────────┘                                           │")]),n(`
`),s("span",{class:"line"},[s("span",null,"│  ┌──────────────────┐                                           │")]),n(`
`),s("span",{class:"line"},[s("span",null,"│  │   当前 User 输入 │  ← 你的实际问题 + @引用的文件            │")]),n(`
`),s("span",{class:"line"},[s("span",null,"│  │  (高权重)        │                                           │")]),n(`
`),s("span",{class:"line"},[s("span",null,"│  └──────────────────┘                                           │")]),n(`
`),s("span",{class:"line"},[s("span",null,"└─────────────────────────────────────────────────────────────────┘")])])],-1)])]),_:1},16)]),_:1},16)}}};export{y as default};
