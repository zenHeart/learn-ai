# Bug 狩猎：用好 Claude Code

## 工作流程

用 Claude Code 找 Bug 的正确姿势：

1. **提供错误日志** - 完整的错误信息、堆栈跟踪
2. **提供相关代码** - 定位到具体文件和行号
3. **提供上下文** - 什么场景下触发、期望行为是什么

## 对比：最小上下文 vs 装备上下文

### 最小上下文（效果差）

```
帮我看看这个代码哪里有问题，它不工作。
```

**问题**：
- 没有错误信息，模型不知道什么错
- 没有代码，模型无法分析
- 没有场景描述，模型只能瞎猜

模型回复可能是："看起来代码没问题，你是不是没安装依赖？"

---

### 装备上下文（高效）

```
Error: ECONNREFUSED at NNClient.js:42
Error: connect ECONNREFUSED 127.0.0.1:8080

堆栈跟踪：
  at TCPConnectWrap.afterConnect [as oncomplete] (node:net:1490:16)
  at NNClient.connect (NNClient.js:42:24)
  at NeuralNetwork.predict (neural.js:87:13)
  at App.handleRequest (app.js:15:6)

相关代码 (NNClient.js:38-45):
  connect(port, host) {
    this.socket = net.createConnection(port, host);  // line 42
    this.socket.on('connect', () => {...});
    this.socket.on('error', (err) => {
      console.error('Connection error:', err);
    });
  }

上下文：客户端在 Node.js 环境中尝试连接本地服务器，
服务器已启动但端口可能未就绪。预测服务在 neural.js:87
调用此连接，期望返回分类结果。
```

**包含要素**：
- ✅ 完整错误类型和消息
- ✅ 具体文件和行号
- ✅ 堆栈跟踪（显示调用链）
- ✅ 相关代码片段
- ✅ 使用场景和期望行为

---

## 装备上下文的核心要素

| 要素 | 作用 | 示例 |
|------|------|------|
| 错误类型 | 快速定位问题类别 | ECONNREFUSED, TypeError, SyntaxError |
| 错误消息 | 具体错误描述 | "connect ECONNREFUSED 127.0.0.1:8080" |
| 文件和行号 | 精确定位 | NNClient.js:42 |
| 堆栈跟踪 | 理解调用链 | neural.js → NNClient.js → net |
| 相关代码 | 分析上下文 | 前后 5-10 行 |
| 场景描述 | 理解期望行为 | "登录后应该跳转到 dashboard" |

## 最佳实践

1. **不要只说"它坏了"** - 提供具体错误信息
2. **复制粘贴而非截图** - 模型需要文本分析
3. **提供最小复现** - 只发相关代码，不是整个项目
4. **说明期望 vs 实际** - 明确你想要什么
5. **环境信息** - Node 版本、系统、依赖版本

## 记住

上下文越丰富 → 诊断越准确 → 修复越快
