import{_ as u}from"./slidev/VClick-BcqQhqRo.js";import{_ as c}from"./slidev/CodeBlockWrapper.vue_vue_type_script_setup_true_lang-7bkHu1oP.js";import{b as m,o as d,w as a,g as n,e,m as f,ad as s,v as _,x as k,T as t}from"./modules/vue-B2mGR0Pt.js";import{I as g}from"./slidev/default-NdVrQnRM.js";import{u as x,f as h}from"./slidev/context-CMbfWJ5U.js";import"./index-C3gviaCY.js";import"./modules/shiki-eQ5ZhJ8U.js";import"./slidev/VClicks-BgtgLvDF.js";import"./modules/unplugin-icons-LJE-NeRc.js";const $={__name:"02.2.context-engineering.md__slidev_24",setup(v){const{$clicksContext:p,$frontmatter:i}=x();return p.setup(),(C,l)=>{const o=c,r=u;return d(),m(g,_(k(t(h)(t(i),23))),{default:a(()=>[l[2]||(l[2]=n("h1",null,"Context Window 的完整结构",-1)),e(o,f({},{title:"",ranges:[]}),{default:a(()=>[...l[0]||(l[0]=[n("pre",{class:"shiki shiki-themes vitesse-dark vitesse-light slidev-code",style:{"--shiki-dark":"#dbd7caee","--shiki-light":"#393a34","--shiki-dark-bg":"#121212","--shiki-light-bg":"#ffffff"}},[n("code",{class:"language-text"},[n("span",{class:"line"},[n("span",null,"┌─────────────────────────────────────────────────────────────────┐")]),s(`
`),n("span",{class:"line"},[n("span",null,"│                         Context Window                          │")]),s(`
`),n("span",{class:"line"},[n("span",null,"│                                                                 │")]),s(`
`),n("span",{class:"line"},[n("span",null,"│  ┌──────────────────┐  ← 全局规则、角色定义、约束（CLAUDE.md）│")]),s(`
`),n("span",{class:"line"},[n("span",null,"│  │  System Prompt   │  (固定，高权重)                          │")]),s(`
`),n("span",{class:"line"},[n("span",null,"│  └──────────────────┘                                           │")]),s(`
`),n("span",{class:"line"},[n("span",null,"│  ┌──────────────────┐  ← 外挂知识库，按相关性检索注入           │")]),s(`
`),n("span",{class:"line"},[n("span",null,"│  │   RAG 召回内容   │  (动态注入)                              │")]),s(`
`),n("span",{class:"line"},[n("span",null,"│  └──────────────────┘                                           │")]),s(`
`),n("span",{class:"line"},[n("span",null,"│  ┌──────────────────┐  ← 短期记忆，越长越占 Token             │")]),s(`
`),n("span",{class:"line"},[n("span",null,"│  │   对话历史        │  (滚动窗口)                              │")]),s(`
`),n("span",{class:"line"},[n("span",null,"│  └──────────────────┘                                           │")]),s(`
`),n("span",{class:"line"},[n("span",null,"│  ┌──────────────────┐  ← 实际问题 + @引用文件                   │")]),s(`
`),n("span",{class:"line"},[n("span",null,"│  │   当前 User 输入 │  (高权重)                                │")]),s(`
`),n("span",{class:"line"},[n("span",null,"│  └──────────────────┘                                           │")]),s(`
`),n("span",{class:"line"},[n("span",null,"└─────────────────────────────────────────────────────────────────┘")])])],-1)])]),_:1},16),e(r,null,{default:a(()=>[...l[1]||(l[1]=[n("blockquote",null,[n("p",null,[n("strong",null,"四层分工明确"),s("：固定规则 / 召回知识 / 滚动历史 / 当前任务。每一层有自己的工程手法。")])],-1)])]),_:1})]),_:1},16)}}};export{$ as default};
