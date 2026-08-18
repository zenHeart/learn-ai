---
title: 阿里云百炼上手
description: 开通控制台、拿到 API Key、用 OpenAI 兼容接口发出第一条请求。模型内部机制见 Learn LLM。
domain: product
tags:
  - model-platform
role: tutorial
---

# 阿里云百炼上手

> 这是一份**教程**。按顺序做完，你会在自己的机器上用百炼发出第一条模型请求。
>
> 查 URL / 套餐去 [速查表](./bailian-cheatsheet)。名词撞了去 [术语表](./bailian-glossary)。已经会调用、要解决具体问题去 [Cookbook](./bailian-cookbook)。

目标：把百炼从「听说过千问」用成「我的 Node 服务能稳定打到一个 pin 住的模型」。

注意力、分词、训练过程见 [LLM 基础](/zh/tech/fundamentals/LLM) 与 [Learn LLM](https://llm.zenheart.site/chapters/)。本页不写模型内部。

## 第 0 步：确认你要的是百炼

| 你要的 | 去哪 |
|--------|------|
| HTTP API、控制台应用、给编程工具供电 | **本页** |
| 只和通义聊天 | 通义千问（#83），不是本教程 |
| 阿里云出品的编码 IDE | Qoder CN / 通义灵码（#84），不是本教程 |

百炼**没有**官方独立手机 App，入口是 Web 控制台。[FAQ](https://help.aliyun.com/zh/model-studio/faq-about-alibaba-cloud-model-studio)

## 第 1 步：开通并选地域

1. 用**阿里云主账号**打开 [百炼控制台](https://bailian.console.aliyun.com/)。
2. 右上角切换地域。中国站文档列出的模型服务地域：华北 2（北京）、美国（弗吉尼亚）、国际（新加坡）、德国（法兰克福）、日本（东京）。[产品简介](https://help.aliyun.com/zh/model-studio/what-is-model-studio)
3. 阅读并同意协议后自动开通。没有弹协议 = 这个地域已经开通。[FAQ](https://help.aliyun.com/zh/model-studio/faq-about-alibaba-cloud-model-studio)
4. 若提示未实名认证，先完成认证。

**地域一旦选定，后面的 API Key、Base URL、模型清单、价格都不通用。** 不要用北京的 Key 打新加坡的主机。

中国站的[新人免费额度](https://help.aliyun.com/zh/model-studio/new-free-quota)只在**华北 2（北京）**。国际站简介把免费额度写在**新加坡**。两站不要混抄。

开通本身不收费。调用、微调、部署才计费。[产品简介](https://help.aliyun.com/zh/model-studio/what-is-model-studio)

## 第 2 步：创建 API Key 并放进环境变量

按 [获取 API Key](https://help.aliyun.com/zh/model-studio/get-api-key)：

1. 控制台右上角选好地域 → **API Key** → **创建 API Key**。
2. **归属业务空间**建议先用默认业务空间。
3. **权限**建议先选「全部」。需要锁 IP / 锁模型再改「自定义」。
4. 弹窗里的明文 Key **只出现一次**。立刻复制。关掉就看不到了。

环境变量名是官方指定的 `DASHSCOPE_API_KEY`（历史品牌 DashScope，不是要你再找另一个产品）：

```bash
# macOS / zsh，把 YOUR_DASHSCOPE_API_KEY 换成真实 Key
echo "export DASHSCOPE_API_KEY='YOUR_DASHSCOPE_API_KEY'" >> ~/.zshrc
source ~/.zshrc
```

官方还写了 bash / Windows 的永久与临时写法，见 [获取 API Key](https://help.aliyun.com/zh/model-studio/get-api-key)。

升级后新 Key 以 `sk-ws` 开头；升级前的 `sk-` 仍可用。美国（弗吉尼亚）不走这套升级。[获取 API Key](https://help.aliyun.com/zh/model-studio/get-api-key)

北京 / 新加坡 / 东京 / 法兰克福的新 Base URL 还要 **业务空间 ID（WorkspaceId）**。在控制台业务空间管理页复制，稍后填进 URL。[首次调用](https://help.aliyun.com/zh/model-studio/first-api-call-to-qwen)

## 第 3 步：发出第一条请求

前端仓库优先用官方 Node 示例（OpenAI 兼容）。先装 SDK：

```bash
npm install openai
```

把 `{WorkspaceId}` 换成第 2 步复制的业务空间 ID。下面这段来自[首次调用千问 API](https://help.aliyun.com/zh/model-studio/first-api-call-to-qwen) 的 Node.js 示例：

```js
import OpenAI from "openai";

try {
    const openai = new OpenAI(
        {
            // 若没有配置环境变量，请用阿里云百炼 API Key 将下行替换为: apiKey: "sk-xxx",
            apiKey: process.env.DASHSCOPE_API_KEY,
            // 以下为华北 2（北京）地域的 URL。各地域不同。将 {WorkspaceId} 换成真实业务空间 ID。
            baseURL: "https://{WorkspaceId}.cn-beijing.maas.aliyuncs.com/compatible-mode/v1"
        }
    );
    const completion = await openai.chat.completions.create({
        model: "qwen-plus",
        messages: [
            { role: "system", content: "You are a helpful assistant." },
            { role: "user", content: "你是谁？" }
        ],
    });
    console.log(completion.choices[0].message.content);
} catch (error) {
    console.log(`错误信息：${error}`);
    console.log("请参考文档：https://help.aliyun.com/model-studio/developer-reference/error-code");
}
```

其它地域的 OpenAI 兼容主机见 [速查表 · Base URL](./bailian-cheatsheet#base-url) 和 [选择模型](https://help.aliyun.com/zh/model-studio/models)。不要发明主机名。

不会写代码时，官方指引是用 [Chatbox](https://help.aliyun.com/zh/model-studio/chatbox)，不要自己猜桌面客户端。

## 第 4 步：先选档，再认具体模型 ID

产品简介对千问三档的定位（不要把它理解成具体 `model` 字符串）：

| 档 | 官方怎么说 | 起步建议 |
|----|------------|----------|
| **Max** | 效果最好，复杂、多步骤任务。简介点名最新 `qwen3.8-max` | 难任务、强工具调用 |
| **Plus** | 效果、速度、成本均衡，**多数场景推荐** | **第一条请求用官方示例的 `qwen-plus`** |
| **Flash** | 高性价比、低延迟，简单且要快的任务 | 高 QPS、短回复 |

来源：[产品简介](https://help.aliyun.com/zh/model-studio/what-is-model-studio)。

具体能用的 ID、各地域是否上架、三种协议的 Base URL，只认 [选择模型](https://help.aliyun.com/zh/model-studio/models)。那一页更新很快，本教程不抄全表。

套餐还有**字符串白名单**。Coding Plan 官方写：必须逐字符完全匹配，禁止做版本兼容推理。[Coding Plan](https://help.aliyun.com/zh/model-studio/coding-plan)

## 第 5 步：先挡住意外扣费，再继续玩

认证用户的免费额度用完后会**自动转按量**。新用户应打开「免费额度用完即停」。只对北京、且在免费额度有效期内。[新人免费额度](https://help.aliyun.com/zh/model-studio/new-free-quota)

不想再产生调用：到该地域的 API Key 页**删除 Key**。百炼没有「自动扣费开关」。[产品简介](https://help.aliyun.com/zh/model-studio/what-is-model-studio)

下一步按场景走 [Cookbook](./bailian-cookbook)。
