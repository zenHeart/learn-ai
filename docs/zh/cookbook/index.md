---
title: 实战手册
description: 按任务抄：先界面，再安全，再性能。不是概念课。
domain: recipe
tags:
  - cookbook
listed: false
outline: false
pageClass: catalog-page
---

# 实战手册

**结论**：这里是「打开就能抄」的片段。先做用户能看见的，再补安全和性能。概念去 [技术](/zh/tech/)，完整项目去 [跟着做](/zh/projects/)。

## 1. 用户能看见

- [聊天 UI](./chat-ui.md) — 流式输出的对话框  
- [表单自动补全](./form-autocomplete.md) — 表单上的「帮我填」

## 2. 别把钥匙暴露出去

- [API 代理](./api-proxy.md) — 密钥只放服务端  
- [内容审查](./content-moderation.md) — 过滤输入/输出  
- [错误处理](./error-handling.md) — 重试、超时、回退

## 3. 再谈快和省

- [本地 Embeddings](./local-embedding.md) — 浏览器里做语义检索  

部署、限流、账单见 [部署](/zh/deployment/)。
