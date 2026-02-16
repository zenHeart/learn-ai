import{p as U}from"./chunk-K2ZEYYM2-CDezgpZi.js";import{p as q}from"./treemap-KMMF4GRG-YVX6V4UE-i-APvQ0e.js";import{_ as s,g as H,s as V,a as Z,b as j,t as J,q as K,l as w,c as Q,F as X,a6 as Y,a8 as ee,a9 as G,aa as te,e as ae,z as re,ab as ie,H as se}from"./md-FXkYnnKf.js";import"./chunk-ZZTYOBSU-BynVtE-N.js";import"./index-QEXZ0nHS.js";import"./modules/vue-DkSD9XER.js";import"./modules/shiki-dfPNvAm1.js";import"./modules/file-saver-B7oFTzqn.js";import"./slidev/default-ZgUN8ik-.js";import"./slidev/context-CDj5UPRF.js";var le=se.pie,D={sections:new Map,showData:!1},g=D.sections,C=D.showData,oe=structuredClone(le),ne=s(()=>structuredClone(oe),"getConfig"),ce=s(()=>{g=new Map,C=D.showData,re()},"clear"),pe=s(({label:e,value:a})=>{if(a<0)throw new Error(`"${e}" has invalid value: ${a}. Negative values are not allowed in pie charts. All slice values must be >= 0.`);g.has(e)||(g.set(e,a),w.debug(`added new section: ${e}, with value: ${a}`))},"addSection"),de=s(()=>g,"getSections"),ge=s(e=>{C=e},"setShowData"),ue=s(()=>C,"getShowData"),W={getConfig:ne,clear:ce,setDiagramTitle:K,getDiagramTitle:J,setAccTitle:j,getAccTitle:Z,setAccDescription:V,getAccDescription:H,addSection:pe,getSections:de,setShowData:ge,getShowData:ue},fe=s((e,a)=>{U(e,a),a.setShowData(e.showData),e.sections.map(a.addSection)},"populateDb"),me={parse:s(async e=>{const a=await q("pie",e);w.debug(a),fe(a,W)},"parse")},he=s(e=>`
  .pieCircle{
    stroke: ${e.pieStrokeColor};
    stroke-width : ${e.pieStrokeWidth};
    opacity : ${e.pieOpacity};
  }
  .pieOuterCircle{
    stroke: ${e.pieOuterStrokeColor};
    stroke-width: ${e.pieOuterStrokeWidth};
    fill: none;
  }
  .pieTitleText {
    text-anchor: middle;
    font-size: ${e.pieTitleTextSize};
    fill: ${e.pieTitleTextColor};
    font-family: ${e.fontFamily};
  }
  .slice {
    font-family: ${e.fontFamily};
    fill: ${e.pieSectionTextColor};
    font-size:${e.pieSectionTextSize};
    // fill: white;
  }
  .legend text {
    fill: ${e.pieLegendTextColor};
    font-family: ${e.fontFamily};
    font-size: ${e.pieLegendTextSize};
  }
`,"getStyles"),ve=he,Se=s(e=>{const a=[...e.values()].reduce((r,l)=>r+l,0),$=[...e.entries()].map(([r,l])=>({label:r,value:l})).filter(r=>r.value/a*100>=1).sort((r,l)=>l.value-r.value);return ie().value(r=>r.value)($)},"createPieArcs"),xe=s((e,a,$,y)=>{w.debug(`rendering pie chart
`+e);const r=y.db,l=Q(),T=X(r.getConfig(),l.pie),A=40,o=18,p=4,c=450,u=c,f=Y(a),n=f.append("g");n.attr("transform","translate("+u/2+","+c/2+")");const{themeVariables:i}=l;let[_]=ee(i.pieOuterStrokeWidth);_??=2;const b=T.textPosition,d=Math.min(u,c)/2-A,M=G().innerRadius(0).outerRadius(d),O=G().innerRadius(d*b).outerRadius(d*b);n.append("circle").attr("cx",0).attr("cy",0).attr("r",d+_/2).attr("class","pieOuterCircle");const m=r.getSections(),P=Se(m),R=[i.pie1,i.pie2,i.pie3,i.pie4,i.pie5,i.pie6,i.pie7,i.pie8,i.pie9,i.pie10,i.pie11,i.pie12];let h=0;m.forEach(t=>{h+=t});const E=P.filter(t=>(t.data.value/h*100).toFixed(0)!=="0"),v=te(R);n.selectAll("mySlices").data(E).enter().append("path").attr("d",M).attr("fill",t=>v(t.data.label)).attr("class","pieCircle"),n.selectAll("mySlices").data(E).enter().append("text").text(t=>(t.data.value/h*100).toFixed(0)+"%").attr("transform",t=>"translate("+O.centroid(t)+")").style("text-anchor","middle").attr("class","slice"),n.append("text").text(r.getDiagramTitle()).attr("x",0).attr("y",-400/2).attr("class","pieTitleText");const k=[...m.entries()].map(([t,x])=>({label:t,value:x})),S=n.selectAll(".legend").data(k).enter().append("g").attr("class","legend").attr("transform",(t,x)=>{const F=o+p,L=F*k.length/2,N=12*o,B=x*F-L;return"translate("+N+","+B+")"});S.append("rect").attr("width",o).attr("height",o).style("fill",t=>v(t.label)).style("stroke",t=>v(t.label)),S.append("text").attr("x",o+p).attr("y",o-p).text(t=>r.getShowData()?`${t.label} [${t.value}]`:t.label);const I=Math.max(...S.selectAll("text").nodes().map(t=>t?.getBoundingClientRect().width??0)),z=u+A+o+p+I;f.attr("viewBox",`0 0 ${z} ${c}`),ae(f,c,z,T.useMaxWidth)},"draw"),we={draw:xe},ze={parser:me,db:W,renderer:we,styles:ve};export{ze as diagram};
