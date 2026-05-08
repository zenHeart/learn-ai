import{_ as u}from"./slidev/VClick-QKHABeQl.js";import{_ as c}from"./slidev/CodeBlockWrapper.vue_vue_type_script_setup_true_lang-DHirkpEY.js";import{b as m,o as d,w as l,g as s,e,m as f,ad as n,v as _,x as g,T as t}from"./modules/vue-DRjNz6by.js";import{I as k}from"./slidev/default-Cr33nEHp.js";import{u as h,f as v}from"./slidev/context-BT5o--UY.js";import"./index-vznBW5YK.js";import"./modules/shiki-B6DcAaeD.js";import"./slidev/VClicks-8dWYBmC6.js";import"./modules/unplugin-icons-DmlQ7XrV.js";const w={__name:"03.integration.md__slidev_53",setup(x){const{$clicksContext:p,$frontmatter:i}=h();return p.setup(),(C,a)=>{const o=c,r=u;return d(),m(k,_(g(t(v)(t(i),52))),{default:l(()=>[a[2]||(a[2]=s("h1",null,"真实案例：Cursor 修 Bug 的 30 秒",-1)),e(o,f({},{title:"",ranges:[]}),{default:l(()=>[...a[0]||(a[0]=[s("pre",{class:"shiki shiki-themes vitesse-dark vitesse-light slidev-code",style:{"--shiki-dark":"#dbd7caee","--shiki-light":"#393a34","--shiki-dark-bg":"#121212","--shiki-light-bg":"#ffffff"}},[s("code",{class:"language-text"},[s("span",{class:"line"},[s("span",null,'场景：用户报告"登录失败"')]),n(`
`),s("span",{class:"line"},[s("span",null,"Cursor 实际执行链路：")]),n(`
`),s("span",{class:"line"},[s("span")]),n(`
`),s("span",{class:"line"},[s("span",null,"Prompt 层：")]),n(`
`),s("span",{class:"line"},[s("span",null,'  "修一下登录失败" → 拆解为"定位失败点 → 修复 → 验证"')]),n(`
`),s("span",{class:"line"},[s("span")]),n(`
`),s("span",{class:"line"},[s("span",null,"Context 层：")]),n(`
`),s("span",{class:"line"},[s("span",null,"  自动注入相关文件（login.vue、auth.ts）")]),n(`
`),s("span",{class:"line"},[s("span",null,"  自动注入 git diff（最近谁改了什么）")]),n(`
`),s("span",{class:"line"},[s("span",null,"  自动注入 CI 日志（哪一步失败）")]),n(`
`),s("span",{class:"line"},[s("span")]),n(`
`),s("span",{class:"line"},[s("span",null,"Harness 层：")]),n(`
`),s("span",{class:"line"},[s("span",null,"  Tool: read_file → search → edit_file → run_tests → create_pr")]),n(`
`),s("span",{class:"line"},[s("span",null,"  Memory: 项目规范（TypeScript strict、API 统一走 src/api/）")]),n(`
`),s("span",{class:"line"},[s("span",null,"  Loop: 修代码 → 跑测试 → 发现问题 → 继续修 → CI 通过 → 人工评审/按策略合并")])])],-1)])]),_:1},16),e(r,null,{default:l(()=>[...a[1]||(a[1]=[s("blockquote",null,[s("p",null,[s("strong",null,"理想路径"),n("：定位 → 修复 → 验证 → PR 就绪。是否 approve / merge，始终按团队授权和风险等级执行。")])],-1)])]),_:1})]),_:1},16)}}};export{w as default};
