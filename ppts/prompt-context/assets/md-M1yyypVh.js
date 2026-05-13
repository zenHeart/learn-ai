import{_ as m}from"./slidev/VClick-D1I36hkT.js";import{_ as d}from"./slidev/VClicks-BBOwrB9P.js";import{_}from"./slidev/CodeBlockWrapper.vue_vue_type_script_setup_true_lang-hhzTk3kX.js";import{b as f,o as g,w as a,g as l,e,ad as n,m as k,v,x,T as i}from"./modules/vue-DRjNz6by.js";import{I as h}from"./slidev/two-cols-header-ex4R6uiV.js";import{u as C,f as P}from"./slidev/context-DPrsW0u1.js";import"./index-BQydaAaa.js";import"./modules/shiki-B6DcAaeD.js";import"./modules/unplugin-icons-DmlQ7XrV.js";const y={__name:"02.3.harness-engineering.md__slidev_46",setup(R){const{$clicksContext:p,$frontmatter:t}=C();return p.setup(),(I,s)=>{const o=_,u=d,r=m;return g(),f(h,v(x(i(P)(i(t),45))),{left:a(c=>[e(o,k({},{title:"",ranges:[]}),{default:a(()=>[...s[0]||(s[0]=[l("pre",{class:"shiki shiki-themes vitesse-dark vitesse-light slidev-code",style:{"--shiki-dark":"#dbd7caee","--shiki-light":"#393a34","--shiki-dark-bg":"#121212","--shiki-light-bg":"#ffffff"}},[l("code",{class:"language-text"},[l("span",{class:"line"},[l("span",null,"输入需求 ──▶      ① 新会话（清空历史噪音）")]),n(`
`),l("span",{class:"line"},[l("span",null,"                       │")]),n(`
`),l("span",{class:"line"},[l("span",null,"                       ▼")]),n(`
`),l("span",{class:"line"},[l("span",null,"                 ② 固定加载上下文栈")]),n(`
`),l("span",{class:"line"},[l("span",null,"                    Rules / specs / fix_plan.md")]),n(`
`),l("span",{class:"line"},[l("span",null,"                       │")]),n(`
`),l("span",{class:"line"},[l("span",null,"                       ▼")]),n(`
`),l("span",{class:"line"},[l("span",null,"                 ③ 只选一个最重要任务")]),n(`
`),l("span",{class:"line"},[l("span",null,"                       │")]),n(`
`),l("span",{class:"line"},[l("span",null,"                       ▼")]),n(`
`),l("span",{class:"line"},[l("span",null,"                 ④ 先搜索，再实现")]),n(`
`),l("span",{class:"line"},[l("span",null,"                       │")]),n(`
`),l("span",{class:"line"},[l("span",null,"                       ▼")]),n(`
`),l("span",{class:"line"},[l("span",null,"                 ⑤ 单测 / 构建 / CI 反压")]),n(`
`),l("span",{class:"line"},[l("span",null,"                       │")]),n(`
`),l("span",{class:"line"},[l("span",null,"                       ▼")]),n(`
`),l("span",{class:"line"},[l("span",null,"人类 Review ◀── ⑥ 绿了开 PR，更新计划 → 下一轮")]),n(`
`),l("span",{class:"line"},[l("span",null,"（仅边界）")])])],-1)])]),_:1},16)]),right:a(c=>[s[3]||(s[3]=l("h3",null,"三个关键约束",-1)),e(u,null,{default:a(()=>[...s[1]||(s[1]=[l("ul",null,[l("li",null,[l("strong",null,"一轮一事"),n("：每次只推进一个最重要任务，防止目标和上下文发散")]),l("li",null,[l("strong",null,"固定上下文栈"),n("：每轮重新加载项目地图、规格和 "),l("code",null,"fix_plan.md"),n("，把状态留在仓库里")]),l("li",null,[l("strong",null,"闭环验证"),n("：单测 / 构建 / 静态检查 / CI 拒绝坏代码；验证越快，循环越稳")])],-1)])]),_:1}),e(r,null,{default:a(()=>[...s[2]||(s[2]=[l("h3",null,"nn-client-all 查 Bug",-1),l("ol",null,[l("li",null,'用户报告 "登录失败"'),l("li",null,[n("Agent 读 "),l("code",null,"CLAUDE.md"),n(" → 定位 "),l("code",null,"src/auth/")]),l("li",null,"先搜现有实现 → 只修登录失败这一项"),l("li",null,"修代码 + 加用例 → 跑相关单测"),l("li",null,"CI 通过 → 更新计划 → 人类 Review / Merge")],-1)])]),_:1})]),default:a(()=>[s[4]||(s[4]=l("h1",null,"Ralph Loop：把 ReAct 落到 PR / CI",-1))]),_:1},16)}}};export{y as default};
