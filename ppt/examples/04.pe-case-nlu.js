import { sendChat, sleep } from "./utils.js";

const PROMPTS = {
  extract_data: `
将下列包含 d 的列返回为表格形式, 表格第一列为 d 空格之前对应的需求，第二列为对应的天数，最后一行为
总估时

* 需求a 1d
  * 模块1
  * 模块2
* 需求b 2d
  * 模块1
  * 模块2
`,
format_data: `
  按照 name, phone 格式化如下内容为 json 数组，并生成一些 mock 数据，
  返回数组的长度为 10 条

  ---

  小明，12367823546
  小红，13897206475
  
  ---
`,
explain_concept: `向一个 6 岁小朋友解释下什么是 prompt engineer`,
summary: `
用卡片盒笔记法总结以下内容为中文，例如：

### Card1：无监督学习
无监督学习是一种机器学习方法，其中算法被训练来发现数据中的模式和结构，而不需要先验的标签或目标。
#无监督学习 #机器学习

### Card2：强化学习
强化学习是一种机器学习方法，其目标是通过智能代理与环境互动，从而学习如何在特定环境下进行决策以达到最大化的奖励。
#强化学习 #机器学习

### Card3：..."
`
}

Object.keys(PROMPTS).forEach(async (key) => {
  const prompt = PROMPTS[key]
  await sleep(5e2)
  sendChat(prompt).then(console.log.bind(undefined, `${key}:`))
})