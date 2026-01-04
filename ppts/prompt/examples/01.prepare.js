import { sendChat, sleep } from "./utils.js";

// detail see https://github.com/f/awesome-chatgpt-prompts
const PROMPTS = {
  explain_term: '解释下 prompt engineer 工程是什么？',
  study_case: '生成一些问题，来考察我是否理解了 prompt engineer 的概念？',
  content_generate: '以社会主义核心价值观生成一篇 800 字的作文',
  code_generate: '如何用 bash 过滤出家目录最大尺寸的文件',
  JS_REPL: `
I want you to act as a javascript console. 
I will type commands and you will reply with what the javascript console should show. 
I want you to only reply with the terminal output inside one unique code block, and nothing else. do not write explanations.
do not type commands unless I instruct you to do so. when I need to tell you something in english, I will do so by putting text inside curly brackets {like this}. 
My first command is Array.from({length: 100}).map((el,index) => index);
`
}

Object.keys(PROMPTS).forEach(async (key) => {
  const prompt = PROMPTS[key]
  await sleep(5e2)
  sendChat(prompt).then(console.log.bind(undefined, `${key}:`))
})