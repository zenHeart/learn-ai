import{_ as r}from"./slidev/VClick-B0jttq4C.js";import{_ as u}from"./slidev/CodeBlockWrapper.vue_vue_type_script_setup_true_lang-BNCLHDb3.js";import{b as m,o as d,w as e,g as n,e as a,m as f,ad as s,v as _,x as g,T as t}from"./modules/vue-9r0x5Mvu.js";import{I as k}from"./slidev/default-DfUDVj_b.js";import{u as h,f as w}from"./slidev/context-DzskvybD.js";import"./index-DcmkdzUk.js";import"./modules/shiki-BFOqmQIV.js";import"./slidev/VClicks-DcTgnpmE.js";import"./modules/unplugin-icons-CrjNJQm5.js";const O={__name:"04.practice.md__slidev_60",setup(x){const{$clicksContext:i,$frontmatter:o}=h();return i.setup(),(I,l)=>{const p=u,c=r;return d(),m(k,_(g(t(w)(t(o),59))),{default:e(()=>[l[2]||(l[2]=n("h1",null,"场景二：精准 Context 的 AI 输出",-1)),a(c,null,{default:e(()=>[l[1]||(l[1]=n("p",null,[n("strong",null,"AI 分析（直指根因）：")],-1)),a(p,f({},{title:"",ranges:[]}),{default:e(()=>[...l[0]||(l[0]=[n("pre",{class:"shiki shiki-themes vitesse-dark vitesse-light slidev-code",style:{"--shiki-dark":"#dbd7caee","--shiki-light":"#393a34","--shiki-dark-bg":"#121212","--shiki-light-bg":"#ffffff"}},[n("code",{class:"language-text"},[n("span",{class:"line"},[n("span",null,"根因分析：")]),s(`
`),n("span",{class:"line"},[n("span",null,"这是一个典型的 TOCTOU（Time-of-Check-Time-of-Use）竞态条件。")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"1. handleDisconnect 先从 pool 删除 connection（line 84）")]),s(`
`),n("span",{class:"line"},[n("span",null,"2. 之后调用 reconnect，reconnect 从 connections.get() 获取")]),s(`
`),n("span",{class:"line"},[n("span",null,"3. 但 connections map 和 pool 是两个独立数据结构，删 pool 不删 connections")]),s(`
`),n("span",{class:"line"},[n("span",null,"4. 重连期间如果再次触发 disconnect，ws 已经是 null")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"修复方案（不破坏现有接口）：")]),s(`
`),n("span",{class:"line"},[n("span")]),s(`
`),n("span",{class:"line"},[n("span",null,"async reconnect(clientId: string) {")]),s(`
`),n("span",{class:"line"},[n("span",null,"  const ws = this.connections.get(clientId)")]),s(`
`),n("span",{class:"line"},[n("span",null,"  if (!ws) {                               // ✅ null 检查")]),s(`
`),n("span",{class:"line"},[n("span",null,"    console.warn(`[WS] No connection for ${clientId}, skip reconnect`)")]),s(`
`),n("span",{class:"line"},[n("span",null,"    return")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")]),s(`
`),n("span",{class:"line"},[n("span",null,"  await new Promise(r => setTimeout(r, 1000))")]),s(`
`),n("span",{class:"line"},[n("span",null,"  if (this.connections.has(clientId)) {    // ✅ 二次确认，防止等待期间被删除")]),s(`
`),n("span",{class:"line"},[n("span",null,"    ws.send(JSON.stringify({ type: 'ping' }))")]),s(`
`),n("span",{class:"line"},[n("span",null,"  }")]),s(`
`),n("span",{class:"line"},[n("span",null,"}")])])],-1)])]),_:1},16)]),_:1})]),_:1},16)}}};export{O as default};
