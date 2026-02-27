# 4.3 演示指南：疑难 Bug 定位与修复

## 操作步骤

1. 打开终端，运行以下命令启动服务：
   ```bash
   npm run demo:4.3
   ```
2. 你会看到终端抛出了一大段血红色的堆栈报错，提示 `TypeError: Cannot read properties of undefined (reading 'map')`。
3. **不要手动进代码里找文件**，直接使用鼠标全选终端里的报错信息（从 `TypeError` 到最后的报错栈），将其复制或直接交给 Claude Code / Cursor Composer。
4. 附上一句简单的 Prompt：
   > `看了下终端的报错，帮忙查一下原因并给出修复。`
5. **观察结果**：
   - AI 会根据报错栈里的路径（例如 `src/utils/transformers.ts` 等），**自动跨文件读取相关源码**。
   - 它能瞬间洞察是因为上游数据返回了 `{error: 'Service Unavailable'}` 导致 `payload.data` 是 `undefined`。
   - 它会直接为你改写 `transformers.ts`，加入可选链 `payload?.data?.map` 等安全判空逻辑。

这展示了大模型“大海捞针”和跨文件排查链路的顶尖能力。
