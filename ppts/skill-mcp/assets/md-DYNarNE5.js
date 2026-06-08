import{_ as d}from"./slidev/CodeBlockWrapper.vue_vue_type_script_setup_true_lang-LQv_rv6e.js";import{b as c,o as u,w as e,g as s,e as i,m as t,D as l,v as m,x as f,A as p}from"./modules/vue-xTIOGTWz.js";import{I as g}from"./slidev/default-BIJ756gT.js";import{u as k,f as h}from"./slidev/context-CPeX7XID.js";import"./modules/unplugin-icons-BSgOJP1f.js";import"./index-Bm11EqbR.js";import"./modules/shiki-CF2xWD23.js";const v={class:"grid grid-cols-2 gap-4 mt-3"},_={class:"col-bad"},b={class:"col-good"},D={__name:"04.practice.md__slidev_62",setup(x){const{$clicksContext:o,$frontmatter:r}=k();return o.setup(),(P,n)=>{const a=d;return u(),c(g,m(f(p(h)(p(r),61))),{default:e(()=>[n[4]||(n[4]=s("h1",null,"Demo B · 触发演示 (2/2)",-1)),s("div",v,[s("div",_,[n[1]||(n[1]=s("h3",null,"❌ 没有 Skill 时",-1)),i(a,t({},{title:"",ranges:[]}),{default:e(()=>[...n[0]||(n[0]=[s("pre",{class:"shiki shiki-themes vitesse-dark vitesse-light slidev-code",style:{"--shiki-dark":"#dbd7caee","--shiki-light":"#393a34","--shiki-dark-bg":"#121212","--shiki-light-bg":"#ffffff"}},[s("code",{class:"language-text"},[s("span",{class:"line"},[s("span",null,"> 帮我审一下这个 PR")]),l(`
`),s("span",{class:"line"},[s("span")]),l(`
`),s("span",{class:"line"},[s("span",null,"Claude: 好的，请把代码贴给我，")]),l(`
`),s("span",{class:"line"},[s("span",null,"我会从可读性、变量命名、注释完整度")]),l(`
`),s("span",{class:"line"},[s("span",null,"等角度看一下...")]),l(`
`),s("span",{class:"line"},[s("span")]),l(`
`),s("span",{class:"line"},[s("span",null,"[泛泛而谈，没有团队特色]")])])],-1)])]),_:1},16)]),s("div",b,[n[3]||(n[3]=s("h3",null,"✅ Skill 自动激活",-1)),i(a,t({},{title:"",ranges:[]}),{default:e(()=>[...n[2]||(n[2]=[s("pre",{class:"shiki shiki-themes vitesse-dark vitesse-light slidev-code",style:{"--shiki-dark":"#dbd7caee","--shiki-light":"#393a34","--shiki-dark-bg":"#121212","--shiki-light-bg":"#ffffff"}},[s("code",{class:"language-text"},[s("span",{class:"line"},[s("span",null,"> 帮我审一下这个 PR：")]),l(`
`),s("span",{class:"line"},[s("span",null,"> https://github.com/.../pull/42")]),l(`
`),s("span",{class:"line"},[s("span")]),l(`
`),s("span",{class:"line"},[s("span",null,"[code-review Skill 激活]")]),l(`
`),s("span",{class:"line"},[s("span",null,"1. 拉 diff（git_mcp.get_pull_request）")]),l(`
`),s("span",{class:"line"},[s("span",null,"2. SQL 注入扫描：发现 1 处")]),l(`
`),s("span",{class:"line"},[s("span",null,"   src/user.ts:45 字符串拼接构造 SQL")]),l(`
`),s("span",{class:"line"},[s("span",null,"3. N+1 扫描：发现 1 处")]),l(`
`),s("span",{class:"line"},[s("span",null,"   src/order.ts:120 循环里查 user")]),l(`
`),s("span",{class:"line"},[s("span",null,"4. 敏感日志：✓ 通过")]),l(`
`),s("span",{class:"line"},[s("span",null,"5. 异常处理：⚠️ 3 处吃掉错误")])])],-1)])]),_:1},16)])]),n[5]||(n[5]=s("div",{class:"mt-4 p-3 theme-combo text-sm"},[s("p",null,[l("🎯 "),s("strong",null,"关键观察"),l("：用户没敲 "),s("code",null,"/code-review"),l('，AI 通过 description 中的 "review PR / 审查 / 检查这次改动" 关键词自动激活了 Skill。这就是 Progressive Disclosure 的威力。')])],-1))]),_:1},16)}}};export{D as default};
