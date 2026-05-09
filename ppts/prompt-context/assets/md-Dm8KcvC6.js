import{_ as u}from"./slidev/CodeBlockWrapper.vue_vue_type_script_setup_true_lang-Krrskrl3.js";import{b as d,o as f,w as e,g as s,e as t,m as i,ad as n,v as g,x as m,T as p}from"./modules/vue-DRjNz6by.js";import{I as k}from"./slidev/two-cols-header-CnrM0fPG.js";import{u as h,f as v}from"./slidev/context-DEzhOhL1.js";import"./modules/unplugin-icons-DmlQ7XrV.js";import"./index-woEJYE1j.js";import"./modules/shiki-B6DcAaeD.js";const _={class:"col-bad"},x={class:"col-good"},O={__name:"02.1.prompt-engineering.md__slidev_15",setup(b){const{$clicksContext:r,$frontmatter:o}=h();return r.setup(),(y,a)=>{const l=u;return f(),d(k,g(m(p(v)(p(o),14))),{left:e(c=>[s("div",_,[a[1]||(a[1]=s("h3",null,"❌ Before（无框架）",-1)),t(l,i({},{title:"",ranges:[]}),{default:e(()=>[...a[0]||(a[0]=[s("pre",{class:"shiki shiki-themes vitesse-dark vitesse-light slidev-code",style:{"--shiki-dark":"#dbd7caee","--shiki-light":"#393a34","--shiki-dark-bg":"#121212","--shiki-light-bg":"#ffffff"}},[s("code",{class:"language-text"},[s("span",{class:"line"},[s("span",null,"帮我审查一下这个函数")])])],-1)])]),_:1},16)])]),right:e(c=>[s("div",x,[a[3]||(a[3]=s("h3",null,"✅ After（ICIO 框架）",-1)),t(l,i({},{title:"",ranges:[]}),{default:e(()=>[...a[2]||(a[2]=[s("pre",{class:"shiki shiki-themes vitesse-dark vitesse-light slidev-code",style:{"--shiki-dark":"#dbd7caee","--shiki-light":"#393a34","--shiki-dark-bg":"#121212","--shiki-light-bg":"#ffffff"}},[s("code",{class:"language-text"},[s("span",{class:"line"},[s("span",null,"[Instruction]")]),n(`
`),s("span",{class:"line"},[s("span",null,"请对以下 TypeScript 函数进行代码审查。")]),n(`
`),s("span",{class:"line"},[s("span")]),n(`
`),s("span",{class:"line"},[s("span",null,"[Context]")]),n(`
`),s("span",{class:"line"},[s("span",null,"- TypeScript strict mode")]),n(`
`),s("span",{class:"line"},[s("span",null,"- 高并发场景（~1000 req/s）")]),n(`
`),s("span",{class:"line"},[s("span",null,"- 团队规范：错误必须 throw")]),n(`
`),s("span",{class:"line"},[s("span")]),n(`
`),s("span",{class:"line"},[s("span",null,"[Input]")]),n(`
`),s("span",{class:"line"},[s("span",null,"  async function getData(id) {")]),n(`
`),s("span",{class:"line"},[s("span",null,"    try {")]),n(`
`),s("span",{class:"line"},[s("span",null,"      const res = await fetch(`/api/data/${id}`)")]),n(`
`),s("span",{class:"line"},[s("span",null,"      return res.json()")]),n(`
`),s("span",{class:"line"},[s("span",null,"    } catch(e) {}  // ← 问题")]),n(`
`),s("span",{class:"line"},[s("span",null,"  }")]),n(`
`),s("span",{class:"line"},[s("span")]),n(`
`),s("span",{class:"line"},[s("span",null,"[Output]")]),n(`
`),s("span",{class:"line"},[s("span",null,"JSON 格式：issues、severity、suggestion")])])],-1)])]),_:1},16)])]),default:e(()=>[a[4]||(a[4]=s("h1",null,"ICIO Before vs After",-1))]),_:1},16)}}};export{O as default};
