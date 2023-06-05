import { sendChat, sleep } from "./utils.js";
// bad
const SUMMARY_CONTENT = `
ChatGPT（全名：Chat Generative Pre-trained Transformer），美国OpenAI 研发的聊天机器人程序 ，于2022年11月30日发布 。
ChatGPT是人工智能技术驱动的自然语言处理工具，它能够通过理解和学习人类的语言来进行对话，
还能根据聊天的上下文进行互动，真正像人类一样来聊天交流，
甚至能完成撰写邮件、视频脚本、文案、翻译、代码，写论文 等任务。
`



const PROMPTS = {
  summary_bad_pe: `概括如下内容: ${SUMMARY_CONTENT}`,
  summary_good_pe: `概括尖括号内文本，控制在 20 个字以内。 <${SUMMARY_CONTENT}>`,
}

Object.keys(PROMPTS).forEach(async (key) => {
  const prompt = PROMPTS[key]
  await sleep(5e2)
  sendChat(prompt).then(console.log.bind(undefined, `${key}:`))
})