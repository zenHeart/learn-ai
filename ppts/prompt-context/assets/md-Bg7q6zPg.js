import{_ as u}from"./slidev/VClick-B0jttq4C.js";import{_ as c}from"./slidev/CodeBlockWrapper.vue_vue_type_script_setup_true_lang-BNCLHDb3.js";import{b as m,o as d,w as a,g as s,e,ad as n,m as f,v as _,x as k,T as t}from"./modules/vue-9r0x5Mvu.js";import{I as g}from"./slidev/default-DfUDVj_b.js";import{u as v,f as x}from"./slidev/context-DzskvybD.js";import"./index-DcmkdzUk.js";import"./modules/shiki-BFOqmQIV.js";import"./slidev/VClicks-DcTgnpmE.js";import"./modules/unplugin-icons-CrjNJQm5.js";const w={__name:"04.practice.md__slidev_53",setup(b){const{$clicksContext:p,$frontmatter:i}=v();return p.setup(),(h,l)=>{const o=c,r=u;return d(),m(g,_(k(t(x)(t(i),52))),{default:a(()=>[l[2]||(l[2]=s("h1",null,"场景一：生成 Vue3 组件",-1)),l[3]||(l[3]=s("p",null,[s("strong",null,"需求"),n("：为业务系统生成一个数据表格组件，支持分页、排序、自定义列")],-1)),e(r,null,{default:a(()=>[l[1]||(l[1]=s("p",null,[s("strong",null,"第一步：没有任何 Context 时，会发生什么？")],-1)),e(o,f({},{title:"",ranges:[]}),{default:a(()=>[...l[0]||(l[0]=[s("pre",{class:"shiki shiki-themes vitesse-dark vitesse-light slidev-code",style:{"--shiki-dark":"#dbd7caee","--shiki-light":"#393a34","--shiki-dark-bg":"#121212","--shiki-light-bg":"#ffffff"}},[s("code",{class:"language-text"},[s("span",{class:"line"},[s("span",null,"用户：帮我写一个 Vue3 表格组件，支持分页和排序")]),n(`
`),s("span",{class:"line"},[s("span")]),n(`
`),s("span",{class:"line"},[s("span",null,"AI 输出：")]),n(`
`),s("span",{class:"line"},[s("span",null,"<template>")]),n(`
`),s("span",{class:"line"},[s("span",null,"  <div>")]),n(`
`),s("span",{class:"line"},[s("span",null,"    <table>")]),n(`
`),s("span",{class:"line"},[s("span",null,'      <tr v-for="item in data" :key="item.id">')]),n(`
`),s("span",{class:"line"},[s("span",null,"        <td>{{ item.name }}</td>")]),n(`
`),s("span",{class:"line"},[s("span",null,"      </tr>")]),n(`
`),s("span",{class:"line"},[s("span",null,"    </table>")]),n(`
`),s("span",{class:"line"},[s("span",null,"  </div>")]),n(`
`),s("span",{class:"line"},[s("span",null,"</template>")]),n(`
`),s("span",{class:"line"},[s("span")]),n(`
`),s("span",{class:"line"},[s("span",null,"<script>")]),n(`
`),s("span",{class:"line"},[s("span",null,"export default {                   // ❌ Options API")]),n(`
`),s("span",{class:"line"},[s("span",null,"  data() {                         // ❌ 违反团队规范")]),n(`
`),s("span",{class:"line"},[s("span",null,"    return { items: [] }")]),n(`
`),s("span",{class:"line"},[s("span",null,"  }")]),n(`
`),s("span",{class:"line"},[s("span",null,"}")]),n(`
`),s("span",{class:"line"},[s("span",null,"<\/script>")])])],-1)])]),_:1},16)]),_:1})]),_:1},16)}}};export{w as default};
