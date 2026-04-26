import{_ as c}from"./slidev/VClick-B0jttq4C.js";import{_ as d}from"./slidev/CodeBlockWrapper.vue_vue_type_script_setup_true_lang-BNCLHDb3.js";import{b as f,o as m,w as a,g as s,e,m as p,ad as n,v as g,x as k,T as r}from"./modules/vue-9r0x5Mvu.js";import{I as _}from"./slidev/default-DfUDVj_b.js";import{u as h,f as v}from"./slidev/context-DzskvybD.js";import"./index-DcmkdzUk.js";import"./modules/shiki-BFOqmQIV.js";import"./slidev/VClicks-DcTgnpmE.js";import"./modules/unplugin-icons-CrjNJQm5.js";const S={__name:"03.features.md__slidev_28",setup(x){const{$clicksContext:o,$frontmatter:u}=h();return o.setup(),(y,l)=>{const t=d,i=c;return m(),f(_,g(k(r(v)(r(u),27))),{default:a(()=>[l[4]||(l[4]=s("h1",null,"ICIO Before vs After",-1)),l[5]||(l[5]=s("p",null,[s("strong",null,"❌ Before（缺少框架）：")],-1)),e(t,p({},{title:"",ranges:[]}),{default:a(()=>[...l[0]||(l[0]=[s("pre",{class:"shiki shiki-themes vitesse-dark vitesse-light slidev-code",style:{"--shiki-dark":"#dbd7caee","--shiki-light":"#393a34","--shiki-dark-bg":"#121212","--shiki-light-bg":"#ffffff"}},[s("code",{class:"language-text"},[s("span",{class:"line"},[s("span",null,"帮我审查一下这个函数")])])],-1)])]),_:1},16),e(i,null,{default:a(()=>[l[2]||(l[2]=s("p",null,[s("strong",null,"✅ After（ICIO 框架）：")],-1)),e(t,p({},{title:"",ranges:[]}),{default:a(()=>[...l[1]||(l[1]=[s("pre",{class:"shiki shiki-themes vitesse-dark vitesse-light slidev-code",style:{"--shiki-dark":"#dbd7caee","--shiki-light":"#393a34","--shiki-dark-bg":"#121212","--shiki-light-bg":"#ffffff"}},[s("code",{class:"language-text"},[s("span",{class:"line"},[s("span",null,"[Instruction]")]),n(`
`),s("span",{class:"line"},[s("span",null,"请对以下 TypeScript 函数进行代码审查。")]),n(`
`),s("span",{class:"line"},[s("span")]),n(`
`),s("span",{class:"line"},[s("span",null,"[Context]")]),n(`
`),s("span",{class:"line"},[s("span",null,"- 项目使用 TypeScript strict mode，禁止 any 类型")]),n(`
`),s("span",{class:"line"},[s("span",null,"- 函数在高并发场景下调用（每秒约 1000 次请求）")]),n(`
`),s("span",{class:"line"},[s("span",null,"- 团队规范：错误必须明确 throw，不能静默吞掉")]),n(`
`),s("span",{class:"line"},[s("span")]),n(`
`),s("span",{class:"line"},[s("span",null,"[Input]")]),n(`
`),s("span",{class:"line"},[s("span",null,"  async function getData(id) {")]),n(`
`),s("span",{class:"line"},[s("span",null,"    try {")]),n(`
`),s("span",{class:"line"},[s("span",null,"      const res = await fetch(`/api/data/${id}`)")]),n(`
`),s("span",{class:"line"},[s("span",null,"      return res.json()")]),n(`
`),s("span",{class:"line"},[s("span",null,"    } catch(e) {}  // 问题在这里")]),n(`
`),s("span",{class:"line"},[s("span",null,"  }")]),n(`
`),s("span",{class:"line"},[s("span")]),n(`
`),s("span",{class:"line"},[s("span",null,"[Output]")]),n(`
`),s("span",{class:"line"},[s("span",null,"请以 JSON 格式输出：issues（问题列表）、severity（严重程度）、suggestion（修复建议）")])])],-1)])]),_:1},16)]),_:1}),e(i,null,{default:a(()=>[...l[3]||(l[3]=[s("blockquote",null,[s("p",null,[s("strong",null,"框架不是束缚，是让 AI 稳定输出的结构化合同。")])],-1)])]),_:1})]),_:1},16)}}};export{S as default};
