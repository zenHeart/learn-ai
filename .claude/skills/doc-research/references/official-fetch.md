# 官方文档怎么抓

> 写任何命令、flag、产品名、额度之前先读官方页。抓不到原文就标 `<!-- TODO: 待核实 -->`，见 SKILL 反杜撰规则。

## 优先顺序

1. 官方 docs 的 **Markdown 镜像**（URL 末尾加 `.md`，或站点提供的 `llms.txt`）
2. 官方 HTML（`web-reader` / `WebFetch`）
3. 官方 changelog / 帮助中心 / 产品落地页
4. 社区文章——只作线索，**不能当事实**

CSDN、转载站、二手评测默认不可引用数字、命令、产品是否仍可用。

## 已知站点习性

| 站点 | 怎么抓 | 不要假设 |
|------|--------|----------|
| Cursor docs | `https://cursor.com/docs/<path>.md` 通常比 HTML 干净 | 只靠搜索摘要列产品 |
| ChatGPT Learn / Codex | `https://learn.chatgpt.com/codex/<slug>.md`；无 `.md` 的 HTML 路径常 404 | `/docs/codex/cloud` 这种猜路径 |
| xAI docs | `docs.x.ai` 可抓；`x.ai` 营销页常对非浏览器 403，改用 web-reader | `curl` 403 = 页面不存在 |
| Google 帮助中心 | 同一产品可能有旧 FAQ 和新额度页，两份会打架 | 旧 Labs FAQ 仍是当前资格规则 |

## 对账动作

- 官方一级 nav 每一项：本站 index 有没有去向（页或一行）
- 外链：能 HEAD 的就核状态；403 且官方确认有 Cloudflare 的，改用 reader，不要删
- 版本号、价格、额度：只抄能打开的官方表；地区本地化吞掉金额就标 TODO
