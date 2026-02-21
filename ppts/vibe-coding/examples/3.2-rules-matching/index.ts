import fs from "fs";
import * as sysPath from "path";
import { minimatch } from "minimatch";
import { fileURLToPath } from "url";

// 这个包用于辅助演示 glob 匹配，已经在 package.json 中安装
const __filename = fileURLToPath(import.meta.url);
const __dirname = sysPath.dirname(__filename);

// 1. 定义一个简单的 MDC 文件解析器 (提取 yaml 头部的 globs 和正文)
function parseMdcFile(filePath: string) {
  const content = fs.readFileSync(filePath, "utf-8");
  const match = content.match(/---\n([\s\S]*?)\n---\n([\s\S]*)/);
  if (!match) return null;

  const yamlBlock = match[1];
  const rulesText = match[2];

  // 粗略解析 yaml 里的 globs
  const globMatch = yamlBlock.match(/globs:\s*(.+)/);
  const glob = globMatch ? globMatch[1].trim() : "*";

  return { glob, rulesText };
}

// 2. 模拟 IDE 投递相关规则
function getRelevantRules(
  currentActiveFile: string,
  rulesDir: string,
): string[] {
  const matchedRules: string[] = [];
  if (!fs.existsSync(rulesDir)) return matchedRules;

  const files = fs.readdirSync(rulesDir);
  for (const file of files) {
    if (!file.endsWith(".mdc")) continue;

    const mdcObj = parseMdcFile(sysPath.join(rulesDir, file));
    if (mdcObj) {
      // 使用 minimatch 判断当前编辑的文件是不是命中了这个规则的 glob
      const isMatch = minimatch(currentActiveFile, mdcObj.glob);
      if (isMatch) {
        console.log(
          `  [🎯 规则命中]: 文件 ${currentActiveFile} 命中了规则 ${file} (规则: ${mdcObj.glob})`,
        );
        matchedRules.push(mdcObj.rulesText.trim());
      } else {
        console.log(
          `  [⏭️ 策略跳过]: ${file} (要求：${mdcObj.glob}) 与当前文件不匹配，丢弃。`,
        );
      }
    }
  }
  return matchedRules;
}

console.log("🚀 模块化规则匹配 (Rules Matching) 演示\n");

const rulesDir = sysPath.join(__dirname, "rules");

// 场景 1: 用户在编辑一个 React 组件
console.log("▶️ 场景 1: 用户新建了文件 'src/components/Header.tsx'");
const activeFile1 = "src/components/Header.tsx";
const userPrompt1 = "帮我写一个带用户头像的顶部导航栏。";

const contextRules1 = getRelevantRules(activeFile1, rulesDir);
if (contextRules1.length > 0) {
  console.log(`\n🤖 Agent 接收到的额外指令:\n${contextRules1.join("\n")}\n`);
}

// 场景 2: 用户在编辑一个普通的 utils 文件
console.log("▶️ 场景 2: 用户正在编辑 'src/utils/format.ts'");
const activeFile2 = "src/utils/format.ts";
const contextRules2 = getRelevantRules(activeFile2, rulesDir);
if (contextRules2.length === 0) {
  console.log("\n🤖 Agent 附加指令: 无 (按常规方式生成)\n");
}
