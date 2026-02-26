const n=`# 3.3 Commands & Skills (工作流沉淀与权限管控)

**一句话核心**：本示例通过「运行权限演示脚本 + 配置 Cursor Command / Claude Skill」演示**一键 SOP 与权限缩圈**，你将学会把高频操作封装为斜杠命令，并限制 AI 仅读不写。

---

## 1. 概念简述

团队里常有高频动作（如“全量安全扫描”“整理国际化词条”）。若每次都在输入框打长段 Prompt，效率低。**Commands（Cursor）** 与 **Skills（Claude）** 把长提示词、执行逻辑与**权限要求**封装成一条斜杠命令（如 \`/security-audit\`）。更重要的是**权限缩圈**：可在技能中声明“执行此命令时仅允许 Read/Grep，禁止写文件”，防止误操作。

---

## 2. 前置条件

- 已安装 **Cursor** 或 **Claude Code**。
- 本示例的 Claude Skill 示例文件在 \`examples/.claude/skills/security-audit.md\`，复制到 \`~/.claude/skills/\` 后即可在 Claude 中通过 \`/security-audit\` 调用。
- **项目级 Cursor 示例**：本仓库已在 \`examples/.cursor/commands/\` 与 \`examples/.cursor/skills/\` 下提供 Command 与 Skill 示例，以 **\`ppts/vibe-coding/examples\`** 为工作区打开 Cursor 即可直接试用。

---

## 3. 操作步骤

### 步骤 A：运行脚本（看权限演示）

1. 打开终端，进入：\`cd /path/to/learn-ai/ppts/vibe-coding/examples\`。
2. 执行：\`npm run demo:3.3\`
3. **预期结果**：终端输出“技能调用”与“权限检查”的模拟流程（如 audit-deps 只读通过、refactor-all 因需人工确认被拦截），理解权限缩圈的概念。

### 步骤 B：在 Cursor 中体验 Command 与 Skill（项目级示例）

1. 用 Cursor 以 **\`ppts/vibe-coding/examples\`** 为工作区根目录打开。
2. **项目级 Command**：本仓库已在 **\`examples/.cursor/commands/\`** 下提供示例 **\`review.md\`**。在 Chat 输入 **\`/\`**，即可在列表中找到并选择该命令（名称以文件名 \`review\` 为准）。
3. **预期结果**：选择 \`/review\` 后，AI 会按该 Command 的 Markdown 内容执行「审查当前文件安全性，仅报告问题不直接改代码」。
4. **项目级 Skill**：本仓库在 **\`examples/.cursor/skills/security-audit/\`** 下提供示例 **\`SKILL.md\`**。在 **Agent** 对话中输入 **\`/security-audit\`** 即可调用（若未显示，可打开 Cursor Settings → Rules / Skills 确认已加载项目 skills）。
5. **预期结果**：AI 会按 Security Audit 的说明执行依赖与代码安全扫描并报告，不修改代码。

### 步骤 B2：在 Cursor 中添加全局/用户级 Command（可选）

1. 打开 Cursor，进入 **Settings**（\`Cmd+,\` 或 \`Ctrl+,\`）。
2. 打开 **Features > Commands**，点击 **Add Command**。
3. 定义命令名称，例如：\`review\`；在 Prompt 模板中填写（可直接复制）：
   \`\`\`text
   审查当前文件安全性，检查是否有敏感信息泄露、依赖漏洞或不当 API 使用，仅报告问题不要直接修改代码。
   \`\`\`
4. 保存后，在 Chat 中输入 \`/review\` 即可触发。
5. **预期结果**：AI 会按该 Prompt 执行审查；与项目级 \`.cursor/commands/review.md\` 效果类似，但保存在用户全局配置中。

### 步骤 C：在 Claude Code 中使用 Skill 示例（可选）

1. 复制本仓库提供的示例 Skill 到 Claude 技能目录：
   - 源文件：\`examples/.claude/skills/security-audit.md\`
   - 目标目录：\`~/.claude/skills/\`（若不存在请先创建）
   - 复制后确保文件名为 \`security-audit.md\`。
2. 在终端执行：\`claude\`。
3. 在对话中输入：\`/security-audit\`
4. **预期结果**：Claude 会以**仅 Read、Grep** 的权限执行“扫描依赖树、全量报告 CVE 漏洞”，不会修改任何代码文件。

---

## 4. 本示例涉及的文件

| 文件/目录 | 说明 |
|-----------|------|
| \`3.3.commands-skills/index.ts\` | 演示脚本：模拟技能注册与权限检查逻辑 |
| \`examples/.cursor/commands/review.md\` | Cursor 项目级 Command 示例，打开 examples 后输入 \`/\` 可见 |
| \`examples/.cursor/skills/security-audit/SKILL.md\` | Cursor 项目级 Skill 示例，在 Agent 中 \`/security-audit\` 调用 |
| \`examples/.claude/skills/security-audit.md\` | Claude Skill 示例，可复制到 \`~/.claude/skills/\` 使用 |

---

## 5. 核心要点

- Command/Skill 是针对**复杂与高频场景**的一键 SOP 固化。
- **权限管控**是人机协同的第一防线（Human-in-the-Loop）；可限制某条命令仅读不写，避免误操作。
- 本示例脚本（\`npm run demo:3.3\`）演示的是“权限与技能调用”的**逻辑**；真实使用需在 Cursor/Claude 中按上面步骤配置。

---

## 6. 延伸阅读

- **概念延伸**：权限缩圈与 Hooks 结合可进一步在“提交前”做校验；参见 3.5 Hooks。Skills 的 \`allowed-tools\` 等配置详见 Claude 官方文档。
- **官方文档**：  
  - Cursor：[Commands](https://cursor.com/docs/context/commands)、[Skills](https://cursor.com/docs/context/skills)  
  - Claude Code：[Skills](https://code.claude.com/docs/en/skills)（含 YAML frontmatter、allowed-tools、前后台钩子）
- **本课程材料**：可结合 \`ppts/vibe-coding/tool-feature.md\` 中「Commands」「Skills」与各工具 Feature Matrix 做扩展阅读。
`;export{n as default};
