# 2.4 Tool Use (工具调用 / Function Calling)

## 概念解析
这是大模型走向“Agent（智能体）”时代的真正拐点。

大模型的本质是文字接龙（Transformer 的 Decoder 端），它本身不会算数学，不会联网，更不会修改本地文件。**但只要教会它一项技能：按照固定格式抛出意图，剩下的由外部环境去执行，奇迹就发生了。**

在 Vibe Coding 的工作流里：
1. 大模型想改代码，它输出 `{"action": "writeTofile", "path": "index.ts", "content": "hello"}`。
2. 运行在本地的 Agent（如 Cursor 或 Claude Code）拦截到这个指令，替模型在本地执行 `fs.writeFileSync()`。
3. 执行成功或报错的日志再反向喂回回给大模型。

这就是为什么 AI 能够帮我们自主完成开发甚至解决 bug 的最重要基石。

## 运行示例

进入根目录（`ppts/vibe-coding/examples`），运行：
```bash
npm run demo:2.4
```

## 核心要点
* 模型负责“脑”，宿主环境负责“手”。
* Vibe Coding 本质是大量的代码编辑能力通过 Function Calling 交给了大模型来调度。
