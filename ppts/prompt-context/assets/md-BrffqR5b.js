import{_ as m}from"./slidev/VClick-BofHVKHj.js";import{_ as d}from"./slidev/VClicks-xHlUw2iE.js";import{_ as f}from"./slidev/CodeBlockWrapper.vue_vue_type_script_setup_true_lang-Bkm3miPU.js";import{b as _,o as g,w as a,g as l,e,ad as n,m as k,v,x as P,T as p}from"./modules/vue-DRjNz6by.js";import{I as h}from"./slidev/two-cols-header-Ch_Rcmrs.js";import{u as x,f as C}from"./slidev/context-ApP3FOQT.js";import"./index-Dsgpcc-O.js";import"./modules/shiki-B6DcAaeD.js";import"./modules/unplugin-icons-DmlQ7XrV.js";const $={__name:"02.3.harness-engineering.md__slidev_48",setup(R){const{$clicksContext:o,$frontmatter:i}=x();return o.setup(),(A,s)=>{const u=f,r=d,t=m;return g(),_(h,v(P(p(C)(p(i),47))),{left:a(c=>[e(u,k({},{title:"",ranges:[]}),{default:a(()=>[...s[0]||(s[0]=[l("pre",{class:"shiki shiki-themes vitesse-dark vitesse-light slidev-code",style:{"--shiki-dark":"#dbd7caee","--shiki-light":"#393a34","--shiki-dark-bg":"#121212","--shiki-light-bg":"#ffffff"}},[l("code",{class:"language-text"},[l("span",{class:"line"},[l("span",null,"人类输入需求 ──▶ ① 新会话（新鲜上下文）")]),n(`
`),l("span",{class:"line"},[l("span",null,"                       │")]),n(`
`),l("span",{class:"line"},[l("span",null,"                       ▼")]),n(`
`),l("span",{class:"line"},[l("span",null,"                 ② 读 AGENTS.md（地图）")]),n(`
`),l("span",{class:"line"},[l("span",null,"                       │")]),n(`
`),l("span",{class:"line"},[l("span",null,"                       ▼")]),n(`
`),l("span",{class:"line"},[l("span",null,"                 ③ 执行任务")]),n(`
`),l("span",{class:"line"},[l("span",null,"                    （写 / 调试 / 文档）")]),n(`
`),l("span",{class:"line"},[l("span",null,"                       │")]),n(`
`),l("span",{class:"line"},[l("span",null,"                       ▼")]),n(`
`),l("span",{class:"line"},[l("span",null,"                 ④ 自审 + Agent 评审")]),n(`
`),l("span",{class:"line"},[l("span",null,"                       │")]),n(`
`),l("span",{class:"line"},[l("span",null,"                       ▼")]),n(`
`),l("span",{class:"line"},[l("span",null,"                 ⑤ 开 PR → CI 通过即合并")]),n(`
`),l("span",{class:"line"},[l("span",null,"                       │")]),n(`
`),l("span",{class:"line"},[l("span",null,"                       ▼")]),n(`
`),l("span",{class:"line"},[l("span",null,"人类介入  ◀────  ⑥ 清理 → 下一轮")]),n(`
`),l("span",{class:"line"},[l("span",null,"（仅边界）")])])],-1)])]),_:1},16)]),right:a(c=>[s[4]||(s[4]=l("h3",null,"三个关键约束",-1)),e(r,null,{default:a(()=>[...s[1]||(s[1]=[l("ul",null,[l("li",null,[l("strong",null,"新鲜上下文"),n("：每任务新开会话，避免历史污染")]),l("li",null,[l("strong",null,"反压控制"),n("：CI 失败 → Agent 自动修复，不阻塞其他任务")]),l("li",null,[l("strong",null,"临时计划"),n("：执行计划提交仓库，归档可追溯")])],-1)])]),_:1}),e(t,null,{default:a(()=>[...s[2]||(s[2]=[l("h3",null,"落地：nn-client-all 查 Bug",-1),l("ol",null,[l("li",null,'用户报告 "登录失败"'),l("li",null,[n("Agent 读 "),l("code",null,"AGENTS.md"),n(" → 定位 "),l("code",null,"src/auth/")]),l("li",null,"跑测试 → 拿到 stack trace"),l("li",null,"修代码 + 加用例 → 开 PR"),l("li",null,"CI 通过 → 自动合并")],-1)])]),_:1}),e(t,null,{default:a(()=>[...s[3]||(s[3]=[l("blockquote",null,[l("p",null,"Ralph Loop 是工程化的 Agent Review Loop：把执行、验证、评审、修复接到同一个闭环里。")],-1)])]),_:1})]),default:a(()=>[s[5]||(s[5]=l("h1",null,"Ralph Loop：把 ReAct 落到 PR / CI",-1))]),_:1},16)}}};export{$ as default};
