import { sendChat, sleep } from "./utils.js";

const PROMPTS = {
generate: `
 use vue3 with composition api create a todo list
`,
transformer: `
convert vue3 todo list to react hook
`,
// stackoverflow 
debug_optimizing: `
`
}

Object.keys(PROMPTS).forEach(async (key) => {
  const prompt = PROMPTS[key]
  await sleep(5e2)
  sendChat(prompt).then(console.log.bind(undefined, `${key}:`))
})