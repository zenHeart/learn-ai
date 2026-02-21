# 3.3 Commands & Skills (工作流沉淀与权限管控)

## 概念解析
在实际工程中，团队里面总有一些高频动作，比如“全量安全扫描”、“整理国际化词条”、“一键生成单测模板”等。

如果每次都要在输入框打字：“请去 src 目录找国际化文件……”，显然效率太低。
在诸如 Cursor 和 Claude Code 中，可以把长提示词、执行逻辑和**权限要求**封装为 `Commands` (自定义命令) 或 `Skills` (自定义技能)。例如 Claude Code 里的 `~/.claude/skills/*.md`。

更重要的是**权限缩圈（Least Privilege）**。为了防止 AI Agent 自主运行发疯把线上库删了，强大的技能系统允许人类在定义技能时声明：**执行此条命令期间，收起模型篡改文件的写权限，只能看和读。**

## 运行示例

进入根目录（`ppts/vibe-coding/examples`），运行：
```bash
npm run demo:3.3
```

## 核心要点
* Command/Skill 是针对复杂和高频场景的一键 SOP（标准作业程序）固化。
* 权限管控是人机协同的第一防线（Human In The Loop 的核心机制）。
