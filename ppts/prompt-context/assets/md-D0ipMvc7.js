import{_ as m}from"./slidev/VClick-5bo9GrKF.js";import{_ as d}from"./slidev/VClicks-W2QrbM19.js";import{_}from"./slidev/CodeBlockWrapper.vue_vue_type_script_setup_true_lang-C60gpy4p.js";import{b as f,o as g,w as a,g as n,e,ad as l,m as k,v as h,x as v,T as t}from"./modules/vue-DRjNz6by.js";import{I as x}from"./slidev/two-cols-header-BnsMBPac.js";import{u as P,f as C}from"./slidev/context-CghZ52Wy.js";import"./index-BblnjcIG.js";import"./modules/shiki-B6DcAaeD.js";import"./modules/unplugin-icons-DmlQ7XrV.js";const y={__name:"02.3.harness-engineering.md__slidev_46",setup(A){const{$clicksContext:i,$frontmatter:p}=P();return i.setup(),(I,s)=>{const o=_,u=d,r=m;return g(),f(x,h(v(t(C)(t(p),45))),{left:a(c=>[e(o,k({},{title:"",ranges:[]}),{default:a(()=>[...s[0]||(s[0]=[n("pre",{class:"shiki shiki-themes vitesse-dark vitesse-light slidev-code",style:{"--shiki-dark":"#dbd7caee","--shiki-light":"#393a34","--shiki-dark-bg":"#121212","--shiki-light-bg":"#ffffff"}},[n("code",{class:"language-text"},[n("span",{class:"line"},[n("span",null,"人类输入需求 ──▶ ① 新会话（新鲜上下文）")]),l(`
`),n("span",{class:"line"},[n("span",null,"                       │")]),l(`
`),n("span",{class:"line"},[n("span",null,"                       ▼")]),l(`
`),n("span",{class:"line"},[n("span",null,"                 ② 读 AGENTS.md（地图）")]),l(`
`),n("span",{class:"line"},[n("span",null,"                       │")]),l(`
`),n("span",{class:"line"},[n("span",null,"                       ▼")]),l(`
`),n("span",{class:"line"},[n("span",null,"                 ③ 执行任务")]),l(`
`),n("span",{class:"line"},[n("span",null,"                    （写 / 调试 / 文档）")]),l(`
`),n("span",{class:"line"},[n("span",null,"                       │")]),l(`
`),n("span",{class:"line"},[n("span",null,"                       ▼")]),l(`
`),n("span",{class:"line"},[n("span",null,"                 ④ 自审 + Agent 评审")]),l(`
`),n("span",{class:"line"},[n("span",null,"                       │")]),l(`
`),n("span",{class:"line"},[n("span",null,"                       ▼")]),l(`
`),n("span",{class:"line"},[n("span",null,"                 ⑤ 开 PR → CI 通过即合并")]),l(`
`),n("span",{class:"line"},[n("span",null,"                       │")]),l(`
`),n("span",{class:"line"},[n("span",null,"                       ▼")]),l(`
`),n("span",{class:"line"},[n("span",null,"人类介入  ◀────  ⑥ 清理 → 下一轮")]),l(`
`),n("span",{class:"line"},[n("span",null,"（仅边界）")])])],-1)])]),_:1},16)]),right:a(c=>[s[3]||(s[3]=n("h3",null,"三个关键约束",-1)),e(u,null,{default:a(()=>[...s[1]||(s[1]=[n("ul",null,[n("li",null,[n("strong",null,"新鲜上下文"),l("：每任务新开会话，避免历史污染")]),n("li",null,[n("strong",null,"反压控制"),l("：CI 失败 → Agent 自动修复，不阻塞其他任务")]),n("li",null,[n("strong",null,"临时计划"),l("：执行计划提交仓库，归档可追溯")])],-1)])]),_:1}),e(r,null,{default:a(()=>[...s[2]||(s[2]=[n("h3",null,"落地：nn-client-all 查 Bug",-1),n("ol",null,[n("li",null,'用户报告 "登录失败"'),n("li",null,[l("Agent 读 "),n("code",null,"AGENTS.md"),l(" → 定位 "),n("code",null,"src/auth/")]),n("li",null,"跑测试 → 拿到 stack trace"),n("li",null,"修代码 + 加用例 → 开 PR"),n("li",null,"CI 通过 → 自动合并")],-1)])]),_:1})]),default:a(()=>[s[4]||(s[4]=n("h1",null,"Ralph Loop：AI 自我纠错的闭环",-1))]),_:1},16)}}};export{y as default};
