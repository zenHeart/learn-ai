import{_ as r}from"./slidev/VClick-BcqQhqRo.js";import{_ as u}from"./slidev/CodeBlockWrapper.vue_vue_type_script_setup_true_lang-7bkHu1oP.js";import{b as m,o as d,w as a,g as n,e,ad as s,m as f,v as _,x as g,T as i}from"./modules/vue-B2mGR0Pt.js";import{I as k}from"./slidev/default-NdVrQnRM.js";import{u as h,f as w}from"./slidev/context-CMbfWJ5U.js";import"./index-C3gviaCY.js";import"./modules/shiki-eQ5ZhJ8U.js";import"./slidev/VClicks-BgtgLvDF.js";import"./modules/unplugin-icons-LJE-NeRc.js";const O={__name:"04.practice.md__slidev_61",setup(x){const{$clicksContext:t,$frontmatter:o}=h();return t.setup(),(I,l)=>{const p=u,c=r;return d(),m(k,_(g(i(w)(i(o),60))),{default:a(()=>[l[2]||(l[2]=n("h1",null,"场景二：AI 精准输出",-1)),e(c,null,{default:a(()=>[l[1]||(l[1]=n("p",null,[n("strong",null,"AI 分析（直指根因）"),s("：")],-1)),e(p,f({},{title:"",ranges:[]}),{default:a(()=>[...l[0]||(l[0]=[n("pre",{class:"shiki shiki-themes vitesse-dark vitesse-light slidev-code",style:{"--shiki-dark":"#dbd7caee","--shiki-light":"#393a34","--shiki-dark-bg":"#121212","--shiki-light-bg":"#ffffff"}},[n("code",{class:"language-text"},[n("span",{class:"line"},[n("span",null,"根因分析：")]),s(`
`),n("span",{class:"line"},[n("span",null,"这是典型的 TOCTOU（Time-of-Check-Time-of-Use，检查时间与使用时间之间存在时间差，窗口期内状态可能已改变）竞态条件。")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"1. handleDisconnect 先从 pool 删除 connection（line 84）")]),s(`
`),n("span",{class:"line"},[n("span",null,"2. 之后调用 reconnect，从 connections.get() 获取")]),s(`
`),n("span",{class:"line"},[n("span",null,"3. 但 pool 和 connections 是两个独立数据结构")]),s(`
`),n("span",{class:"line"},[n("span",null,"4. 重连期间再次触发 disconnect，ws 已为 null")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"修复方案：")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"async reconnect(clientId: string) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  const ws = this.connections.get(clientId)")]),s(`
`),n("span",{class:"line"},[n("span",null,"  if (!ws) {                               // ✅ null 检查")]),s(`
`),n("span",{class:"line"},[n("span",null,"    console.warn(`[WS] No connection for ${clientId}`)")]),s(`
`),n("span",{class:"line"},[n("span",null,"    return")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")]),s(`
`),n("span",{class:"line"},[n("span",null,"  await new Promise(r => setTimeout(r, 1000))")]),s(`
`),n("span",{class:"line"},[n("span",null,"  if (this.connections.has(clientId)) {    // ✅ 二次确认")]),s(`
`),n("span",{class:"line"},[n("span",null,"    ws.send(JSON.stringify({ type: 'ping' }))")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")])])],-1)])]),_:1},16)]),_:1})]),_:1},16)}}};export{O as default};
