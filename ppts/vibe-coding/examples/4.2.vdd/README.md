# 4.2 验证驱动开发 (VDD)

## 概念解析
在以前，TDD（测试驱动开发）在业务团队难以推行，因为写测试太累了。
但在 Vibe Coding 中，我们推崇 **VDD (验证驱动开发 / Verification-Driven Development)**。

因为 AI 是不知疲倦的打字机，你可以把**测试代码当作最严谨的 Prompt**。
流程如下：
1. **写出红色的断言 (Red)**：把需求写在测试里（例如“组件渲染时包含xxx文案”、“数组去重方法需要剔除 undefined”）。
2. **抛给 AI 修复**：命令行会报错退出，你这时候打开 Agent 功能，直接选中报错大喊一句“Fix this”。
3. **闭环自动修复 (Green)**：Agent 自动通过终端输出（Terminal Output）找到上下文，修改业务代码，直到运行变绿。

## 运行示例

进入根目录（`ppts/vibe-coding/examples`），运行：
```bash
npm run demo:4.2
```

## 核心要点
* 报错和异常堆栈其实是对 AI 来说没有任何歧义的最精炼 Prompt。
* 编写测试的心智负担被彻底抹平（连测试也可以让 AI 写），测试逐渐成为验收交付标准。
