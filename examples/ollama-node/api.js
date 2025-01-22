import ollama from 'ollama'

const response = await ollama.chat({
  model: 'deepseek-r1:8b',
  messages: [{ role: 'user', content: '为什么叶子是绿的？ 答案必须控制在 20 字以内，不要讲废话' }],
})
console.log(response.message.content)