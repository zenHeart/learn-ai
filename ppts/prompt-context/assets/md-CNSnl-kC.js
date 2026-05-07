import{_ as c}from"./slidev/VClick-i8Y5KCPC.js";import{_ as m}from"./slidev/CodeBlockWrapper.vue_vue_type_script_setup_true_lang-EMmgyDxs.js";import{_}from"./slidev/VClicks-DE_wlFEq.js";import{b as d,o as f,w as a,g as n,e,ad as s,m as g,v as k,x as v,T as o}from"./modules/vue-DRjNz6by.js";import{I as x}from"./slidev/default-Cl2mwd2t.js";import{u as b,f as h}from"./slidev/context-kxsCu_28.js";import"./index-Cl8ii5RU.js";import"./modules/shiki-B6DcAaeD.js";import"./modules/unplugin-icons-DmlQ7XrV.js";const G={__name:"02.2.context-engineering.md__slidev_34",setup(B){const{$clicksContext:p,$frontmatter:i}=b();return p.setup(),(C,l)=>{const r=_,u=m,t=c;return f(),d(x,k(v(o(h)(o(i),33))),{default:a(()=>[l[3]||(l[3]=n("h1",null,"装配选型：RAG vs 长上下文 vs 全量",-1)),e(r,null,{default:a(()=>[...l[0]||(l[0]=[n("p",null,[n("strong",null,'按场景选择，而非"窗口越大越好"'),s("：")],-1)])]),_:1}),e(t,null,{default:a(()=>[e(u,g({},{title:"",ranges:[]}),{default:a(()=>[...l[1]||(l[1]=[n("pre",{class:"shiki shiki-themes vitesse-dark vitesse-light slidev-code",style:{"--shiki-dark":"#dbd7caee","--shiki-light":"#393a34","--shiki-dark-bg":"#121212","--shiki-light-bg":"#ffffff"}},[n("code",{class:"language-text"},[n("span",{class:"line"},[n("span",null,"你的场景？")]),s(`
`),n("span",{class:"line"},[n("span",null,"│")]),s(`
`),n("span",{class:"line"},[n("span",null,"├─ 答案在明确文档，接受秒级延迟")]),s(`
`),n("span",{class:"line"},[n("span",null,"│   └─ → RAG（向量检索 + 召回注入）")]),s(`
`),n("span",{class:"line"},[n("span",null,"│")]),s(`
`),n("span",{class:"line"},[n("span",null,'├─ 需跨 200+ 文档推理，无明确"正确答案"')]),s(`
`),n("span",{class:"line"},[n("span",null,"│   └─ → 长上下文（注意首尾定律）")]),s(`
`),n("span",{class:"line"},[n("span",null,"│")]),s(`
`),n("span",{class:"line"},[n("span",null,"├─ 代码库 < 50K Token，可全部放入")]),s(`
`),n("span",{class:"line"},[n("span",null,"│   └─ → 全量放入（关键约束放 System / 结尾）")]),s(`
`),n("span",{class:"line"},[n("span",null,"│")]),s(`
`),n("span",{class:"line"},[n("span",null,"└─ 频繁交互，每次只问一小部分")]),s(`
`),n("span",{class:"line"},[n("span",null,"    └─ → 动态切块 + 滚动窗口")])])],-1)])]),_:1},16)]),_:1}),e(t,null,{default:a(()=>[...l[2]||(l[2]=[n("blockquote",null,[n("p",null,[n("strong",null,"窗口大 ≠ 效果好"),s("——attention 优化与组织策略才是关键。")])],-1)])]),_:1})]),_:1},16)}}};export{G as default};
