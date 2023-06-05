import { Configuration, OpenAIApi } from "openai";
import dotenv from "dotenv";
dotenv.config();
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export async function sendChat(prompt) {
  if (!configuration.apiKey) {
    throw new Error(
      "OpenAI API key not configured, please follow instructions in README.md"
    );
  }
  try {
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
    });
    return completion.data.choices[0].message.content;
  } catch (error) {
    // Consider adjusting the error handling logic for your use case
    if (error.response) {
      console.error(error.response.status, error.response.data);
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`);
    }
  }
}

export async function sendPrompt(prompt) {
  if (!configuration.apiKey) {
    throw new Error(
      "OpenAI API key not configured, please follow instructions in README.md"
    );
  }
  try {
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      temperature: 0.8,
      prompt,
    });
    return completion.data.choices[0].text;
  } catch (error) {
    // Consider adjusting the error handling logic for your use case
    if (error.response) {
      console.error(error.response.status, error.response.data);
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`);
    }
    // throw error;
  }
}

export function sleep(t) {
  return new Promise(res => setTimeout(res, t))
}
