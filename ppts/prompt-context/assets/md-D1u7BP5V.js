import{_ as u}from"./slidev/VClicks-DcTgnpmE.js";import{_ as c}from"./slidev/CodeBlockWrapper.vue_vue_type_script_setup_true_lang-BNCLHDb3.js";import{b as m,o as d,w as a,g as n,e,m as f,ad as s,v as _,x as g,T as t}from"./modules/vue-9r0x5Mvu.js";import{I as k}from"./slidev/default-DfUDVj_b.js";import{u as h,f as x}from"./slidev/context-DzskvybD.js";import"./index-DcmkdzUk.js";import"./modules/shiki-BFOqmQIV.js";import"./modules/unplugin-icons-CrjNJQm5.js";const V={__name:"04.harness.md__slidev_46",setup(v){const{$clicksContext:p,$frontmatter:i}=h();return p.setup(),(A,l)=>{const o=c,r=u;return d(),m(k,_(g(t(x)(t(i),45))),{default:a(()=>[l[2]||(l[2]=n("h1",null,"Ralph 循环：Agent 工作流的引擎",-1)),e(o,f({},{title:"",ranges:[]}),{default:a(()=>[...l[0]||(l[0]=[n("pre",{class:"shiki shiki-themes vitesse-dark vitesse-light slidev-code",style:{"--shiki-dark":"#dbd7caee","--shiki-light":"#393a34","--shiki-dark-bg":"#121212","--shiki-light-bg":"#ffffff"}},[n("code",{class:"language-text"},[n("span",{class:"line"},[n("span",null,"                    ┌──────────────────────────────────────────┐")]),s(`
`),n("span",{class:"line"},[n("span",null,"                    │            Ralph Loop                     │")]),s(`
`),n("span",{class:"line"},[n("span",null,"                    │                                          │")]),s(`
`),n("span",{class:"line"},[n("span",null,"  人类输入需求  ──▶  │  1. 新开会话（新鲜上下文）               │")]),s(`
`),n("span",{class:"line"},[n("span",null,"                    │         ↓                                │")]),s(`
`),n("span",{class:"line"},[n("span",null,"                    │  2. Agent 读取 AGENTS.md（地图）          │")]),s(`
`),n("span",{class:"line"},[n("span",null,"                    │         ↓                                │")]),s(`
`),n("span",{class:"line"},[n("span",null,"                    │  3. 执行任务（写代码 / 调试 / 文档）       │")]),s(`
`),n("span",{class:"line"},[n("span",null,"                    │         ↓                                │")]),s(`
`),n("span",{class:"line"},[n("span",null,"                    │  4. 自我审查 + 请求 Agent 评审            │")]),s(`
`),n("span",{class:"line"},[n("span",null,"                    │         ↓                                │")]),s(`
`),n("span",{class:"line"},[n("span",null,"                    │  5. 开 PR → 自动合并（如通过）            │")]),s(`
`),n("span",{class:"line"},[n("span",null,"                    │         ↓                                │")]),s(`
`),n("span",{class:"line"},[n("span",null,"  人类只在需要  ◀──  │  6. 清理计划文件（保持仓库整洁）          │")]),s(`
`),n("span",{class:"line"},[n("span",null,"  判断时介入         │         ↓                                │")]),s(`
`),n("span",{class:"line"},[n("span",null,"                    │  → 循环（下一个任务）                     │")]),s(`
`),n("span",{class:"line"},[n("span",null,"                    └──────────────────────────────────────────┘")])])],-1)])]),_:1},16),e(r,null,{default:a(()=>[...l[1]||(l[1]=[n("ul",null,[n("li",null,[n("strong",null,"新鲜上下文"),s("：每次任务新开会话，避免历史对话污染推理")]),n("li",null,[n("strong",null,"反压控制"),s("：CI 失败、测试不通过 → Agent 自动修复，不阻塞其他任务")]),n("li",null,[n("strong",null,"临时计划"),s("：任务计划提交到仓库，完成后归档，下次 Agent 可读取历史")])],-1)])]),_:1})]),_:1},16)}}};export{V as default};
