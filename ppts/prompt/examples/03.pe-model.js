import { sendChat, sleep } from "./utils.js";

const PROMPTS = {
  zero_shot: `用鲁迅的笔法写三打白骨精`,
  few_shot: `
评价下列情绪是正面还是负面
愁眉不展 -> 负面
非常高兴 -> 正面
有点不开心 -> 负面
有点小沮丧 -> 
`,
  cot: `
这组数中的奇数加起来是偶数：4、8、9、15、12、2、1。
A：将所有奇数相加（9、15、1）得到25。答案为False。
这组数中的奇数加起来是偶数：15、32、5、13、82、7、1。
A：
`,
high_cot: `
你知道麦肯锡的快速了解行业方法吗？就是通过大量行业高频关键词来建立概念。
现在我是一个对智能客服不了解的小白，请你给我整理出30个常用关键词，制作成Markdown表格，表头是：关键词（英文）、分类（中文）、介绍（限50字）、客服使用场景。
`
}

Object.keys(PROMPTS).forEach(async (key) => {
  const prompt = PROMPTS[key]
  await sleep(5e2)
  sendChat(prompt).then(console.log.bind(undefined, `${key}:`))
})