# 3.2 演示指南：模块化规则匹配 (Rules Matching)

> 💡 **重要提示**：在演示本环节前，请确保 Cursor 已经以当前 `learn-ai/ppts/vibe-coding` 为根目录打开，或者以 `3.2-rules-matching` 文件夹为根目录打开，以保证 `.cursor/rules` 能够被正确读取。

## 场景一：匹配前端业务组件规则

1. 打开 `src/components/Header.tsx`。
2. 选中代码内部的空行，按下 `Cmd+K` 并输入：
   > 帮我写一个带用户头像的顶部导航栏
3. **观察结果**：
   - AI 会自动检测并应用 `.cursor/rules/react-components.mdc`。
   - 即使你的 Prompt 没提任何技术栈，生成的代码也会自动使用 `TailwindCSS`，定义 Props，并可能引入 `lucide-react` 图标。

## 场景二：匹配纯工具库规范

1. 打开 `src/utils/format.ts`。
2. 选中代码内部的空行，按下 `Cmd+K` 并输入：
   > 帮我写一个时间格式化函数
3. **观察结果**：
   - AI 识别到路径 `src/utils/*.ts`，加载了 `.cursor/rules/utils-format.mdc`。
   - 生成的代码会附带完整的 `JSDoc`，并且**只会使用原生 `Intl` API**，而绝不会引入上个例子中的 `dayjs` 或附带任何浏览器专有的代码。
