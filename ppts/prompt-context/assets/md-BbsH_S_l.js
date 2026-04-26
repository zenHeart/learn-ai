import{_ as k}from"./slidev/CodeBlockWrapper.vue_vue_type_script_setup_true_lang-BNCLHDb3.js";import{b as r,o as p,w as a,g as s,e as c,m as o,ad as i,v as d,x as g,T as e}from"./modules/vue-9r0x5Mvu.js";import{I as D}from"./slidev/default-DfUDVj_b.js";import{u as E,f as y}from"./slidev/context-DzskvybD.js";import{_ as A}from"./index-DcmkdzUk.js";import"./modules/unplugin-icons-CrjNJQm5.js";import"./modules/shiki-BFOqmQIV.js";const m={__name:"04.practice.md__slidev_59",setup(C){const{$clicksContext:l,$frontmatter:t}=E();return l.setup(),(_,n)=>{const h=k;return p(),r(D,d(g(e(y)(e(t),58))),{default:a(()=>[n[1]||(n[1]=s("h1",null,"场景二：精准 Context 构建示例",-1)),c(h,o({},{title:"",ranges:[]}),{default:a(()=>[...n[0]||(n[0]=[s("pre",{class:"shiki shiki-themes vitesse-dark vitesse-light slidev-code",style:{"--shiki-dark":"#dbd7caee","--shiki-light":"#393a34","--shiki-dark-bg":"#121212","--shiki-light-bg":"#ffffff"}},[s("code",{class:"language-xml"},[s("span",{class:"line"},[s("span",{style:{"--shiki-dark":"#666666","--shiki-light":"#999999"}},"<"),s("span",{style:{"--shiki-dark":"#4D9375","--shiki-light":"#1E754F"}},"error"),s("span",{style:{"--shiki-dark":"#666666","--shiki-light":"#999999"}},">")]),i(`
`),s("span",{class:"line"},[s("span",{style:{"--shiki-dark":"#DBD7CAEE","--shiki-light":"#393A34"}},"类型：UnhandledPromiseRejection")]),i(`
`),s("span",{class:"line"},[s("span",{style:{"--shiki-dark":"#DBD7CAEE","--shiki-light":"#393A34"}},"错误信息：Cannot read property 'send' of null")]),i(`
`),s("span",{class:"line"},[s("span",{style:{"--shiki-dark":"#DBD7CAEE","--shiki-light":"#393A34"}},"触发条件：用户网络切换时（WiFi → 4G），发生概率约 1/50")]),i(`
`),s("span",{class:"line"}),i(`
`),s("span",{class:"line"},[s("span",{style:{"--shiki-dark":"#DBD7CAEE","--shiki-light":"#393A34"}},"堆栈（只保留业务层）：")]),i(`
`),s("span",{class:"line"},[s("span",{style:{"--shiki-dark":"#DBD7CAEE","--shiki-light":"#393A34"}},"  WebSocketManager.reconnect (ws-manager.ts:142)")]),i(`
`),s("span",{class:"line"},[s("span",{style:{"--shiki-dark":"#DBD7CAEE","--shiki-light":"#393A34"}},"  ConnectionPool.handleDisconnect (pool.ts:87)")]),i(`
`),s("span",{class:"line"},[s("span",{style:{"--shiki-dark":"#DBD7CAEE","--shiki-light":"#393A34"}},"  EventEmitter.emit (event.ts:23)")]),i(`
`),s("span",{class:"line"},[s("span",{style:{"--shiki-dark":"#666666","--shiki-light":"#999999"}},"</"),s("span",{style:{"--shiki-dark":"#4D9375","--shiki-light":"#1E754F"}},"error"),s("span",{style:{"--shiki-dark":"#666666","--shiki-light":"#999999"}},">")]),i(`
`),s("span",{class:"line"}),i(`
`),s("span",{class:"line"},[s("span",{style:{"--shiki-dark":"#666666","--shiki-light":"#999999"}},"<"),s("span",{style:{"--shiki-dark":"#4D9375","--shiki-light":"#1E754F"}},"code"),s("span",{style:{"--shiki-dark":"#666666","--shiki-light":"#999999"}},">")]),i(`
`),s("span",{class:"line"},[s("span",{style:{"--shiki-dark":"#DBD7CAEE","--shiki-light":"#393A34"}},"// ws-manager.ts:135-155（出问题的函数）")]),i(`
`),s("span",{class:"line"},[s("span",{style:{"--shiki-dark":"#DBD7CAEE","--shiki-light":"#393A34"}},"async reconnect(clientId: string) {")]),i(`
`),s("span",{class:"line"},[s("span",{style:{"--shiki-dark":"#DBD7CAEE","--shiki-light":"#393A34"}},"  const ws = this.connections.get(clientId)  // 可能是 null？")]),i(`
`),s("span",{class:"line"},[s("span",{style:{"--shiki-dark":"#DBD7CAEE","--shiki-light":"#393A34"}},"  await new Promise(r => setTimeout(r, 1000))")]),i(`
`),s("span",{class:"line"},[s("span",{style:{"--shiki-dark":"#DBD7CAEE","--shiki-light":"#393A34"}},"  ws.send(JSON.stringify({ type: 'ping' }))  // ← 报错行")]),i(`
`),s("span",{class:"line"},[s("span",{style:{"--shiki-dark":"#DBD7CAEE","--shiki-light":"#393A34"}},"}")]),i(`
`),s("span",{class:"line"}),i(`
`),s("span",{class:"line"},[s("span",{style:{"--shiki-dark":"#DBD7CAEE","--shiki-light":"#393A34"}},"// pool.ts:82-95（调用方）")]),i(`
`),s("span",{class:"line"},[s("span",{style:{"--shiki-dark":"#DBD7CAEE","--shiki-light":"#393A34"}},"handleDisconnect(clientId: string) {")]),i(`
`),s("span",{class:"line"},[s("span",{style:{"--shiki-dark":"#DBD7CAEE","--shiki-light":"#393A34"}},"  this.pool.delete(clientId)               // ← 先删了 connection")]),i(`
`),s("span",{class:"line"},[s("span",{style:{"--shiki-dark":"#DBD7CAEE","--shiki-light":"#393A34"}},"  this.manager.reconnect(clientId)         // ← 再重连，此时已经 null")]),i(`
`),s("span",{class:"line"},[s("span",{style:{"--shiki-dark":"#DBD7CAEE","--shiki-light":"#393A34"}},"}")]),i(`
`),s("span",{class:"line"},[s("span",{style:{"--shiki-dark":"#666666","--shiki-light":"#999999"}},"</"),s("span",{style:{"--shiki-dark":"#4D9375","--shiki-light":"#1E754F"}},"code"),s("span",{style:{"--shiki-dark":"#666666","--shiki-light":"#999999"}},">")]),i(`
`),s("span",{class:"line"}),i(`
`),s("span",{class:"line"},[s("span",{style:{"--shiki-dark":"#666666","--shiki-light":"#999999"}},"<"),s("span",{style:{"--shiki-dark":"#4D9375","--shiki-light":"#1E754F"}},"question"),s("span",{style:{"--shiki-dark":"#666666","--shiki-light":"#999999"}},">")]),i(`
`),s("span",{class:"line"},[s("span",{style:{"--shiki-dark":"#DBD7CAEE","--shiki-light":"#393A34"}},"请分析竞态条件的根因，给出类型安全且不引入 breaking change 的修复方案")]),i(`
`),s("span",{class:"line"},[s("span",{style:{"--shiki-dark":"#666666","--shiki-light":"#999999"}},"</"),s("span",{style:{"--shiki-dark":"#4D9375","--shiki-light":"#1E754F"}},"question"),s("span",{style:{"--shiki-dark":"#666666","--shiki-light":"#999999"}},">")])])],-1)])]),_:1},16)]),_:1},16)}}},F=A(m,[["__scopeId","data-v-61908d81"]]);export{F as default};
