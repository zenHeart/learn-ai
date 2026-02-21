import fs from "fs";
import { fileURLToPath } from "url";
import * as path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rulesPath = path.join(__dirname, "AGENTS.md");
const rules = fs.existsSync(rulesPath) ? fs.readFileSync(rulesPath, "utf-8") : "";

const userPrompt = "Build a countdown utility that returns hours until tomorrow.";
const baseSystemPrompt = "You are a professional software engineer.";
const systemPrompt = rules
  ? `${baseSystemPrompt}\n\n<project_rules>\n${rules}\n</project_rules>`
  : baseSystemPrompt;

console.log("AGENTS.md Demo");
console.log("User Prompt:");
console.log(userPrompt);
console.log("\nSystem Prompt:");
console.log(systemPrompt);
console.log("\nExpected Behavior:");
console.log("The assistant should follow the project rules before coding.");
