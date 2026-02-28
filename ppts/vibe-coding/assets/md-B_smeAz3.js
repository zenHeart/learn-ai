import{f as i,o as r,i as o,g as t,aL as w,n as h,F as f,aj as x,aK as b,b as L,w as z,ag as k,e as m,ad as n,T as y,v as M,x as A}from"./modules/vue-qFcqnZxo.js";import{u as p,f as D}from"./slidev/context-C_N2DAy4.js";import{_ as E}from"./index-BzWe1a-a.js";import{_ as C}from"./VibeExample-Dy7FwR65.js";import{I as T}from"./vibe-step-B5-5MEJR.js";import"./modules/shiki-0AYoO_Qi.js";import"./cursor-DVWoxDts.js";import"./VibeWorkflow-BpjB8dnf.js";const N={class:"llm-concepts"},B={class:"concept-body"},F={viewBox:"0 0 460 300",xmlns:"http://www.w3.org/2000/svg"},V=["y1","y2"],H=["y1","y2"],S={__name:"LLMConcepts",props:{activeCount:{type:Number,default:1}},setup(s){return p(),(v,d)=>(r(),i("div",N,[o(" 1. 神经元 "),t("div",{class:h(["concept-card",{active:s.activeCount>=1}])},[...d[0]||(d[0]=[w('<div class="concept-label" data-v-460fed85>1. 神经元</div><div class="concept-body" data-v-460fed85><svg viewBox="0 0 460 300" xmlns="http://www.w3.org/2000/svg" data-v-460fed85><!-- 输入节点 --><circle cx="70" cy="60" r="24" fill="#e0e7ff" stroke="#6366f1" stroke-width="1.5" data-v-460fed85></circle><text x="70" y="66" text-anchor="middle" style="font-size:16px;" fill="#4338ca" font-style="italic" data-v-460fed85> x₁ </text><circle cx="70" cy="150" r="24" fill="#e0e7ff" stroke="#6366f1" stroke-width="1.5" data-v-460fed85></circle><text x="70" y="156" text-anchor="middle" style="font-size:16px;" fill="#4338ca" font-style="italic" data-v-460fed85> x₂ </text><circle cx="70" cy="240" r="24" fill="#e0e7ff" stroke="#6366f1" stroke-width="1.5" data-v-460fed85></circle><text x="70" y="246" text-anchor="middle" style="font-size:16px;" fill="#4338ca" font-style="italic" data-v-460fed85> x₃ </text><!-- 权重标签 --><text x="125" y="88" style="font-size:13px;" fill="#64748b" data-v-460fed85>w₁</text><text x="125" y="145" style="font-size:13px;" fill="#64748b" data-v-460fed85>w₂</text><text x="125" y="215" style="font-size:13px;" fill="#64748b" data-v-460fed85>w₃</text><!-- 偏置节点 b --><circle cx="130" cy="280" r="16" fill="#fef3c7" stroke="#f59e0b" stroke-width="1.2" data-v-460fed85></circle><text x="130" y="285" text-anchor="middle" style="font-size:13px;" fill="#92400e" data-v-460fed85> 1 </text><line x1="142" y1="268" x2="195" y2="178" stroke="#f59e0b" stroke-width="1" stroke-dasharray="4,3" data-v-460fed85></line><text x="170" y="245" style="font-size:13px;" fill="#92400e" font-style="italic" data-v-460fed85> b </text><!-- 连线：输入 → Sigma --><line x1="94" y1="60" x2="180" y2="135" stroke="#94a3b8" stroke-width="1.2" data-v-460fed85></line><line x1="94" y1="150" x2="180" y2="150" stroke="#94a3b8" stroke-width="1.2" data-v-460fed85></line><line x1="94" y1="240" x2="180" y2="165" stroke="#94a3b8" stroke-width="1.2" data-v-460fed85></line><!-- Sigma 节点 --><circle cx="210" cy="150" r="32" fill="#dbeafe" stroke="#3b82f6" stroke-width="2" data-v-460fed85></circle><text x="210" y="160" text-anchor="middle" style="font-size:26px;" fill="#1d4ed8" font-weight="bold" data-v-460fed85> Σ </text><!-- 连线：Σ → σ() --><line x1="242" y1="150" x2="290" y2="150" stroke="#3b82f6" stroke-width="1.5" marker-end="url(#arr1)" data-v-460fed85></line><!-- 激活函数 σ() (Sigmoid) --><rect x="295" y="125" width="65" height="50" rx="6" fill="#f0fdf4" stroke="#22c55e" stroke-width="1.5" data-v-460fed85></rect><text x="327" y="156" text-anchor="middle" style="font-size:18px;" fill="#15803d" font-weight="500" data-v-460fed85> σ() </text><!-- Sigmoid 曲线 (σ()框下方) --><g transform="translate(297, 180)" data-v-460fed85><!-- X 轴 (底部) --><line x1="2" y1="48" x2="58" y2="48" stroke="#94a3b8" stroke-width="0.8" data-v-460fed85></line><!-- Y 轴 (居中，表示 x=0) --><line x1="30" y1="3" x2="30" y2="48" stroke="#94a3b8" stroke-width="0.8" data-v-460fed85></line><!-- Y 轴标注 --><text x="28" y="8" style="font-size:5px;" fill="#94a3b8" text-anchor="end" data-v-460fed85> 1 </text><text x="28" y="28" style="font-size:5px;" fill="#94a3b8" text-anchor="end" data-v-460fed85> 0.5 </text><text x="28" y="47" style="font-size:5px;" fill="#94a3b8" text-anchor="end" data-v-460fed85> 0 </text><!-- 0.5 虚线参考线 --><line x1="2" y1="25" x2="58" y2="25" stroke="#cbd5e1" stroke-width="0.4" stroke-dasharray="2,2" data-v-460fed85></line><!-- Sigmoid 曲线：左下(≈0) → 中心(0, 0.5) → 右上(≈1) --><path d="M 2,46 C 8,46 14,45 20,42 Q 26,36 30,25 Q 34,14 40,8 C 46,5 52,4 58,4" fill="none" stroke="#22c55e" stroke-width="1.8" stroke-linecap="round" data-v-460fed85></path></g><!-- 输出 --><line x1="360" y1="150" x2="420" y2="150" stroke="#22c55e" stroke-width="1.5" marker-end="url(#arr2)" data-v-460fed85></line><defs data-v-460fed85><marker id="arr1" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto" data-v-460fed85><path d="M0,0 L0,8 L8,4 z" fill="#3b82f6" data-v-460fed85></path></marker><marker id="arr2" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto" data-v-460fed85><path d="M0,0 L0,8 L8,4 z" fill="#22c55e" data-v-460fed85></path></marker></defs></svg></div>',2)])],2),o(" 2. 神经网络 "),t("div",{class:h(["concept-card",{active:s.activeCount>=2}])},[d[10]||(d[10]=t("div",{class:"concept-label"},"2. 神经网络",-1)),t("div",B,[(r(),i("svg",F,[o(" 输入层 (3 nodes) "),d[1]||(d[1]=t("circle",{cx:"75",cy:"60",r:"20",fill:"#e0e7ff",stroke:"#6366f1","stroke-width":"1.5"},null,-1)),d[2]||(d[2]=t("circle",{cx:"75",cy:"150",r:"20",fill:"#e0e7ff",stroke:"#6366f1","stroke-width":"1.5"},null,-1)),d[3]||(d[3]=t("circle",{cx:"75",cy:"240",r:"20",fill:"#e0e7ff",stroke:"#6366f1","stroke-width":"1.5"},null,-1)),o(" 隐藏层 (4 nodes) "),d[4]||(d[4]=t("circle",{cx:"230",cy:"38",r:"20",fill:"#ede9fe",stroke:"#8b5cf6","stroke-width":"1.5"},null,-1)),d[5]||(d[5]=t("circle",{cx:"230",cy:"113",r:"20",fill:"#ede9fe",stroke:"#8b5cf6","stroke-width":"1.5"},null,-1)),d[6]||(d[6]=t("circle",{cx:"230",cy:"188",r:"20",fill:"#ede9fe",stroke:"#8b5cf6","stroke-width":"1.5"},null,-1)),d[7]||(d[7]=t("circle",{cx:"230",cy:"263",r:"20",fill:"#ede9fe",stroke:"#8b5cf6","stroke-width":"1.5"},null,-1)),o(" 输出层 (2 nodes) "),d[8]||(d[8]=t("circle",{cx:"385",cy:"100",r:"20",fill:"#fce7f3",stroke:"#ec4899","stroke-width":"1.5"},null,-1)),d[9]||(d[9]=t("circle",{cx:"385",cy:"200",r:"20",fill:"#fce7f3",stroke:"#ec4899","stroke-width":"1.5"},null,-1)),o(" 连线：输入层 → 隐藏层 "),(r(),i(f,null,x([60,150,240],a=>(r(),i(f,{key:"in-"+a},[(r(),i(f,null,x([38,113,188,263],l=>t("line",{key:"l1-"+a+"-"+l,x1:95,y1:a,x2:210,y2:l,stroke:"#cbd5e1","stroke-width":"0.8",opacity:"0.5"},null,8,V)),64))],64))),64)),o(" 连线：隐藏层 → 输出层 "),(r(),i(f,null,x([38,113,188,263],a=>(r(),i(f,{key:"hid-"+a},[(r(),i(f,null,x([100,200],l=>t("line",{key:"l2-"+a+"-"+l,x1:250,y1:a,x2:365,y2:l,stroke:"#cbd5e1","stroke-width":"0.8",opacity:"0.5"},null,8,H)),64))],64))),64))]))])],2),o(" 3. Transformer (基于论文 Figure 1 的 Encoder-Decoder 架构) "),t("div",{class:h(["concept-card",{active:s.activeCount>=3}])},[...d[11]||(d[11]=[w('<div class="concept-label" data-v-460fed85>3. Transformer</div><div class="concept-body" data-v-460fed85><svg viewBox="0 0 460 440" xmlns="http://www.w3.org/2000/svg" data-v-460fed85><!-- ===== 1. 顶部: 输入 ===== --><g transform="translate(90, 8)" data-v-460fed85><rect width="28" height="14" rx="3" fill="#fecaca" stroke="#ef4444" stroke-width="0.6" data-v-460fed85></rect><rect x="32" width="28" height="14" rx="3" fill="#bbf7d0" stroke="#22c55e" stroke-width="0.6" data-v-460fed85></rect><rect x="64" width="28" height="14" rx="3" fill="#fde68a" stroke="#f59e0b" stroke-width="0.6" data-v-460fed85></rect><rect x="96" width="28" height="14" rx="3" fill="#e0e7ff" stroke="#6366f1" stroke-width="0.6" data-v-460fed85></rect><rect x="128" width="28" height="14" rx="3" fill="#fce7f3" stroke="#ec4899" stroke-width="0.6" data-v-460fed85></rect></g><text x="60" y="19" text-anchor="end" style="font-size:9px;" fill="#64748b" data-v-460fed85> Input </text><text x="230" y="38" text-anchor="middle" style="font-size:8px;" fill="#7c3aed" font-weight="500" data-v-460fed85> + Positional Encoding </text><line x1="230" y1="42" x2="230" y2="52" stroke="#94a3b8" stroke-width="0.8" data-v-460fed85></line><!-- ===== 2. Encoder (左) ===== --><rect x="30" y="55" width="190" height="180" rx="8" fill="#eff6ff" stroke="#3b82f6" stroke-width="1.2" data-v-460fed85></rect><text x="125" y="72" text-anchor="middle" style="font-size:10px;" fill="#1d4ed8" font-weight="700" data-v-460fed85> Encoder ×N </text><!-- Multi-Head Self-Attention --><rect x="45" y="80" width="160" height="28" rx="4" fill="#fff7ed" stroke="#f97316" stroke-width="1" data-v-460fed85></rect><text x="125" y="98" text-anchor="middle" style="font-size:9px;" fill="#c2410c" font-weight="500" data-v-460fed85> Multi-Head Attention </text><!-- Add &amp; Norm --><rect x="45" y="112" width="160" height="14" rx="3" fill="#f8fafc" stroke="#94a3b8" stroke-width="0.6" data-v-460fed85></rect><text x="125" y="122" text-anchor="middle" style="font-size:7px;" fill="#64748b" data-v-460fed85> Add &amp; Norm </text><!-- Feed-Forward --><rect x="45" y="132" width="160" height="28" rx="4" fill="#f0fdf4" stroke="#22c55e" stroke-width="1" data-v-460fed85></rect><text x="125" y="150" text-anchor="middle" style="font-size:9px;" fill="#15803d" font-weight="500" data-v-460fed85> Feed-Forward </text><!-- Add &amp; Norm --><rect x="45" y="164" width="160" height="14" rx="3" fill="#f8fafc" stroke="#94a3b8" stroke-width="0.6" data-v-460fed85></rect><text x="125" y="174" text-anchor="middle" style="font-size:7px;" fill="#64748b" data-v-460fed85> Add &amp; Norm </text><!-- 残差跳连 --><path d="M 210 80 L 216 80 L 216 126 L 210 126" fill="none" stroke="#94a3b8" stroke-width="0.6" stroke-dasharray="2,2" data-v-460fed85></path><path d="M 210 132 L 216 132 L 216 178 L 210 178" fill="none" stroke="#94a3b8" stroke-width="0.6" stroke-dasharray="2,2" data-v-460fed85></path><!-- Encoder 输出 --><text x="125" y="225" text-anchor="middle" style="font-size:8px;" fill="#1d4ed8" data-v-460fed85> Encoder Output </text><!-- ===== 3. Decoder (右) ===== --><rect x="240" y="55" width="190" height="260" rx="8" fill="#fdf2f8" stroke="#ec4899" stroke-width="1.2" data-v-460fed85></rect><text x="335" y="72" text-anchor="middle" style="font-size:10px;" fill="#be185d" font-weight="700" data-v-460fed85> Decoder ×N </text><!-- Masked Multi-Head Attention --><rect x="255" y="80" width="160" height="28" rx="4" fill="#fef3c7" stroke="#f59e0b" stroke-width="1" data-v-460fed85></rect><text x="335" y="98" text-anchor="middle" style="font-size:8px;" fill="#92400e" font-weight="500" data-v-460fed85> Masked Multi-Head Attn </text><!-- Add &amp; Norm --><rect x="255" y="112" width="160" height="14" rx="3" fill="#f8fafc" stroke="#94a3b8" stroke-width="0.6" data-v-460fed85></rect><text x="335" y="122" text-anchor="middle" style="font-size:7px;" fill="#64748b" data-v-460fed85> Add &amp; Norm </text><!-- Encoder → Decoder Cross Attention 连线 --><path d="M 220 150 L 250 150" fill="none" stroke="#3b82f6" stroke-width="1.2" marker-end="url(#arrBlue)" data-v-460fed85></path><text x="235" y="143" text-anchor="middle" style="font-size:6px;" fill="#3b82f6" data-v-460fed85> K, V </text><!-- Cross Multi-Head Attention --><rect x="255" y="132" width="160" height="28" rx="4" fill="#fff7ed" stroke="#f97316" stroke-width="1" data-v-460fed85></rect><text x="335" y="150" text-anchor="middle" style="font-size:8px;" fill="#c2410c" font-weight="500" data-v-460fed85> Cross Multi-Head Attn </text><!-- Add &amp; Norm --><rect x="255" y="164" width="160" height="14" rx="3" fill="#f8fafc" stroke="#94a3b8" stroke-width="0.6" data-v-460fed85></rect><text x="335" y="174" text-anchor="middle" style="font-size:7px;" fill="#64748b" data-v-460fed85> Add &amp; Norm </text><!-- Feed-Forward --><rect x="255" y="184" width="160" height="28" rx="4" fill="#f0fdf4" stroke="#22c55e" stroke-width="1" data-v-460fed85></rect><text x="335" y="202" text-anchor="middle" style="font-size:9px;" fill="#15803d" font-weight="500" data-v-460fed85> Feed-Forward </text><!-- Add &amp; Norm --><rect x="255" y="216" width="160" height="14" rx="3" fill="#f8fafc" stroke="#94a3b8" stroke-width="0.6" data-v-460fed85></rect><text x="335" y="226" text-anchor="middle" style="font-size:7px;" fill="#64748b" data-v-460fed85> Add &amp; Norm </text><!-- 残差跳连 --><path d="M 420 80 L 426 80 L 426 126 L 420 126" fill="none" stroke="#94a3b8" stroke-width="0.6" stroke-dasharray="2,2" data-v-460fed85></path><path d="M 420 132 L 426 132 L 426 178 L 420 178" fill="none" stroke="#94a3b8" stroke-width="0.6" stroke-dasharray="2,2" data-v-460fed85></path><path d="M 420 184 L 426 184 L 426 230 L 420 230" fill="none" stroke="#94a3b8" stroke-width="0.6" stroke-dasharray="2,2" data-v-460fed85></path><!-- Decoder 输出shifted --><text x="335" y="305" text-anchor="middle" style="font-size:7px;" fill="#be185d" data-v-460fed85> (shifted right) </text><!-- ===== 4. 输出层 ===== --><line x1="335" y1="315" x2="335" y2="340" stroke="#94a3b8" stroke-width="0.8" data-v-460fed85></line><!-- Linear + Softmax --><rect x="270" y="342" width="130" height="24" rx="4" fill="#ede9fe" stroke="#8b5cf6" stroke-width="1" data-v-460fed85></rect><text x="335" y="358" text-anchor="middle" style="font-size:9px;" fill="#6d28d9" font-weight="600" data-v-460fed85> Linear + Softmax </text><!-- 向下箭头 --><line x1="335" y1="366" x2="335" y2="385" stroke="#94a3b8" stroke-width="0.8" data-v-460fed85></line><!-- 输出概率 --><g transform="translate(270, 390)" data-v-460fed85><rect width="22" height="30" rx="2" fill="#dbeafe" stroke="#3b82f6" stroke-width="0.6" data-v-460fed85></rect><rect x="24" width="22" height="22" rx="2" fill="#e0e7ff" stroke="#6366f1" stroke-width="0.6" data-v-460fed85></rect><rect x="48" width="22" height="10" rx="2" fill="#f1f5f9" stroke="#94a3b8" stroke-width="0.6" data-v-460fed85></rect><rect x="72" width="22" height="16" rx="2" fill="#ede9fe" stroke="#8b5cf6" stroke-width="0.6" data-v-460fed85></rect><rect x="96" width="22" height="6" rx="2" fill="#f8fafc" stroke="#cbd5e1" stroke-width="0.6" data-v-460fed85></rect></g><text x="335" y="432" text-anchor="middle" style="font-size:8px;" fill="#475569" data-v-460fed85> Output Probabilities </text><!-- 箭头标记 --><defs data-v-460fed85><marker id="arrBlue" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto" data-v-460fed85><path d="M0,0 L0,6 L6,3 z" fill="#3b82f6" data-v-460fed85></path></marker></defs></svg></div>',2)])],2)]))}},P=E(S,[["__scopeId","data-v-460fed85"]]),K={start:"3"},j={__name:"02.principle.md__slidev_11",setup(s){const{$clicksContext:v,$clicks:d,$frontmatter:a}=p();return v.setup(),(l,e)=>{const u=C,g=P,c=b("click");return r(),L(T,M(A(y(D)(y(a),10))),{default:z(()=>[e[15]||(e[15]=t("h2",null,"LLM Reasoning: 推理与规划",-1)),k((r(),i("div",null,[...e[0]||(e[0]=[t("ol",null,[t("li",null,[t("strong",null,"神经元"),n(" 模拟人类神经元工作原理的基本计算单元 "),t("ul",null,[t("li",null,"模型大小就是 权重(w) + 偏置(b) 的总和， 比如 4B 模型 就是 40 亿个参数")])])],-1)])])),[[c,1]]),k((r(),i("div",null,[...e[1]||(e[1]=[t("ol",null,[t("li",null,[t("strong",null,"神经网络"),n(" 是一种计算模型，由多个神经元组成")])],-1)])])),[[c,2]]),o(`

### Transformer 概念详解（对照右侧示意图，从上往下看）

**1. Input（输入 token）**
电脑不认识文字，所以先把一句话切成小片段。
例如："我喜欢编程" → ["我", "喜欢", "编程"]
每个片段叫一个 token，再把每个 token 转成一串数字（比如 512 个数字），这串数字叫「词向量」。
图中顶部的彩色小方块就是一个个 token。

**2. Positional Encoding（位置编码）**
❓ 为什么需要它？
Transformer 和人类不同——人类是一个字一个字顺序读的，但 Transformer 是"同时看到所有字"。
所以它分不清"我喜欢你"和"你喜欢我"，因为两句话包含的词完全一样！

📌 它是怎么做的？
不是贴一个简单的编号，而是生成一组和词向量一样长的数字（也是 512 个），然后和词向量逐位相加：
词向量："我" → [0.2, 0.5, -0.1, ...]（512个数字）
位置编码：第1位 → [0.0, 0.01, 0.84, ...]（512个数字）
最终输入 = [0.2, 0.51, 0.74, ...]（逐位相加，还是512个数字）

效果：同一个词出现在不同位置，输入给模型的数据就会有细微差异，模型就能区分顺序了。

**3. Multi-Head Attention（多头注意力）— 图中橙色框**
🔍 一句话定义：让每个词去"打听"其他所有词——你跟我什么关系？关系越大，我越关注你。

怎么打听？通过三个角色：
- **Q（Query，提问者）**：我想知道什么？
- **K（Key，标签）**：我能提供什么信息？（别人身上的标签）
- **V（Value，内容）**：我的具体内容是什么？

例子："小猫坐在垫子上，它很舒服"
当处理"它"这个词时，Q 会和所有词的 K 比较，发现和"小猫"的相关性最高 → 于是获取"小猫"的 V（内容），从而理解"它=小猫"。

为什么叫"多头"？
就像老师改作文时，同时从语法、逻辑、情感、修辞四个角度打分。
每个"头"关注不同维度的关系，合在一起理解得更全面。

**4. Masked Multi-Head Attention（掩码注意力）— 图中黄色框**
🙈 和上面的多头注意力一样，但有个限制：只能往前看，不能偷看后面的词。

为什么？因为 Decoder 的任务是"一个字一个字往下写"。
写到第 3 个字时，第 4、5 个字还没生成呢，当然不能看！
"掩码"就是用一个遮罩把后面的位置挡住。

类比：考试写作文时，你只能参考已经写好的前文，不能偷看还没写的部分。

**5. Cross Multi-Head Attention（交叉注意力）— 图中 Decoder 内的橙色框**
🔗 这是 Encoder 和 Decoder 之间的"信息桥梁"。

工作方式：
- Decoder 带着 Q（"我现在要生成什么词？"）
- 去 Encoder 那里查找 K 和 V（"原文里有什么相关信息？"）

图中 Encoder 和 Decoder 之间标注了"K, V"箭头，就是这个意思——
Encoder 把理解结果（K 和 V）传给 Decoder，Decoder 根据需要去检索。

类比：写答案时回头翻题目，找相关的关键句。

**6. Feed-Forward Network（前馈网络）— 图中绿色框**
🧠 注意力让词和词之间互相交流后，每个词再单独"消化"一下。

它是两层简单的全连接网络（就是神经元那张图里的结构！）。
每个词独立地做一次非线性变换——类似于：小组讨论完之后，每个同学自己再想一想、总结一下。

**7. Add & Norm — 图中灰色小条 + 右侧虚线**
这是一个"保险机制"，每一层都有：

- **Add（残差连接）**：把这一层的"原始输入"直接加到"处理后的输出"上。
  类比：抄作业时，不管你改了什么，都把原文也保留一份。
  作用：防止信息在层层传递中丢失。图中右侧的虚线就是这条"捷径"。

- **Norm（层归一化）**：把数据"拉回正常范围"，不让数字变得太大或太小。
  类比：考试阅卷时统一评分标准，避免分数飘忽不定。

**8. Linear + Softmax（输出层）— 图中底部紫色框**
📊 最后一步：选词输出。

- **Linear**：把 Decoder 的输出映射到整个词表（比如 3 万个词）。每个词得到一个分数。
- **Softmax**：把分数转成概率（所有概率加起来 = 100%）。分数最高的词就是预测结果。

图中底部的彩色柱状就是概率分布——柱子越高，这个词被选中的概率越大。

| | Encoder（编码器） | Decoder（解码器） |
|---|---|---|
| 类比 | 读题、理解题意 | 写答案 |
| 注意力方向 | **双向**（每个词能看到所有词） | **单向**（只能看到前面的词） |
| 目标 | 理解输入的完整语义 | 一个一个地生成输出 |
| 代表模型 | BERT | GPT、Claude、LLaMA |

### 🚀 为什么 GPT/Claude 等 LLM 只用 Decoder（解码器）？

- **Encoder 像「学霸做阅读理解」** — 能前后看，全面理解，但只能回答选择题/填空题（理解类任务）
- **Decoder 像「即兴演讲者」** — 只能往前说，说到哪算哪，但能无限发挥、自由生成

为什么选 Decoder？因为我们需要 AI **生成**新内容（写代码、写文章、对话），而不仅仅是理解已有文本。

**三个关键原因：**
1. **生成任务的本质** — 写作就是"一个字接一个字往下写"，天然是单向的，跟 Decoder 的工作方式完全一致
2. **更容易扩大规模** — Decoder-only 结构更简单，更容易堆叠到数千亿参数
3. **大力出奇迹** — 研究发现，当数据和参数足够多时，Decoder 也能学会"理解"（虽然它只能往前看，但它已经读过海量文本，早就"理解"了）

### 📚 BERT 和 Transformer 的关系

**BERT 完全基于 Transformer！** 只不过它只用了 Encoder（左半部分）。

你可以这样记：
- **BERT = Transformer 的「阅读理解」部分** — 擅长理解，能做分类、判断、提取信息
- **GPT = Transformer 的「写作文」部分** — 擅长生成，能写文章、写代码、聊天

BERT 的特色是「完形填空式训练」：随机挖掉句子里 15% 的词，让模型猜被挖掉的词是什么。因为可以前后看，所以猜词很准，理解力强——但因为训练方式不是"往下写"，所以不擅长生成连贯的长文本。

`),k((r(),i("div",null,[t("ol",K,[t("li",null,[e[2]||(e[2]=t("strong",null,[t("a",{href:"https://arxiv.org/abs/1706.03762",target:"_blank"},"Transformer 架构")],-1)),e[3]||(e[3]=n(" 通过",-1)),e[4]||(e[4]=t("strong",null,"注意力机制",-1)),e[5]||(e[5]=n('让每个词"关注"其他词，',-1)),e[6]||(e[6]=t("strong",null,"基于概率预测生成下一个token",-1)),e[7]||(e[7]=n('（而非真正"理解"语义），',-1)),e[8]||(e[8]=t("a",{href:"https://bbycroft.net/llm",target:"_blank"},"交互示意图",-1)),e[9]||(e[9]=n()),m(u,{id:"2.3"}),e[10]||(e[10]=n()),e[11]||(e[11]=t("strong",null,"Encoder",-1)),e[12]||(e[12]=n(" 「读题」— 双向阅读全文，理解输入的完整含义， ",-1)),e[13]||(e[13]=t("strong",null,"Decoder",-1)),e[14]||(e[14]=n(" 「写答案」— 逐字生成输出（GPT/Claude 只用这部分）",-1))])])])),[[c,3]]),m(g,{activeCount:y(d)},null,8,["activeCount"])]),_:1},16)}}};export{j as default};
