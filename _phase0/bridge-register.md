# 跨仓桥接登记（bridge register）

> 每条 bridge 记录：canonicalTopicId、owner、learn-ai 停止点、canonicalUrl、prerequisites、nextQuestion、lastVerified。
> 站点动态数字（章节数/价格/可用性）不静态复制，只记 URL + retrievedAt。

## Learn LLM — https://llm.zenheart.site/

| canonicalTopicId（本仓侧） | 停止点 | canonical 目标 | lastVerified |
| --- | --- | --- | --- |
| context | KV Cache / attention 复杂度为何限制 context budget | 站内 Transformer/KV Cache 章 | 2026-09-01（URL 待执行日核验） |
| embeddings-retrieval | embedding 空间几何与训练目标 | 站内 embedding 章 | 2026-09-01 |
| model-lifecycle-sft / rlhf / peft | 训练目标与数学（SFT/DPO/LoRA 推导） | 站内第十章路线 | 2026-09-01 |
| model-lifecycle-bridge | Data/Pretraining/Scaling 内部机制 | 站内对应章 | 2026-09-01 |
| browser-edge | 量化/推理 runtime 数学 | 站内量化章 | 2026-09-01 |
| security | 模型对齐层（reward hacking / 拒答行为） | 站内后训练章 | 2026-09-01 |
| multimodal-bridge | 多模态 tokenization 与跨模态机制 | 站内多模态章 | 2026-09-01 |

## evals — https://evals.zenheart.site/

| canonicalTopicId | 停止点 | canonical 目标 | lastVerified |
| --- | --- | --- | --- |
| evaluation | 何时需要证据、协议 contract/conformance 如何接入上线门 | 站内 RAG/Agent Eval、Golden Dataset、CI/CD 章 | 2026-09-01 |
| testing | 确定性测试与评估的边界（本仓保留确定性测试） | 站内 testing 相关章 | 2026-09-01 |
| cases-index (golden-dataset) | 数据集构建方法论 | Golden Dataset 章 | 2026-09-01 |

## sites-epub — https://epub.zenheart.site/

| canonicalTopicId | 停止点 | canonical 目标 | lastVerified |
| --- | --- | --- | --- |
| 全部协议章 | 厂商 docs/blog 原文与离线 EPUB | 站内对应索引 | 2026-09-01 |
| productsMoves 全部 | 厂商命令/参数/套餐/模型清单 | 厂商原文捕获 | 2026-09-01 |

## 官方规范快照（Issue #116 §6，执行日重验）

| 主题 | canonicalUrl |
| --- | --- |
| Agent Skills | https://agentskills.io/specification |
| Agent Plugins | https://agent-plugins.org/specification |
| MCP | https://modelcontextprotocol.io/specification/latest |
| A2A | https://a2a-protocol.org/v1.0.0/specification/ |
| Agent Client Protocol | https://agentclientprotocol.com/ |
| AG-UI | https://docs.ag-ui.com/introduction |
| A2UI / MCP Apps | https://a2ui.org/ / https://modelcontextprotocol.io/extensions/apps/overview |
| ARD / MCP Registry | https://agenticresourcediscovery.org/spec/ / https://github.com/modelcontextprotocol/registry |
| JSON Schema / OpenAPI / JSON-RPC | https://json-schema.org/specification / https://spec.openapis.org/oas/ / https://www.json-rpc.org/specification |
| OAuth 2.1 / OIDC / AuthZEN | https://datatracker.ietf.org/doc/rfc9700/（draft，不得写成 final）/ https://openid.net/specs/openid-connect-core-1_0.html / https://openid.net/specs/authorization-api-1_0.html |
