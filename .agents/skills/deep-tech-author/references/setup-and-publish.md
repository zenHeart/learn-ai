# 套用与发布

只有在把 `deep-tech-author` 套用到新仓库、配置书籍脚手架、本地构建或准备发布时，才读取本文档。

## 资产结构

| 路径 | 角色 |
|---|---|
| `SKILL.md` | 作者工作流与参考资料导航 |
| `references/` | 章节模板、写作方法、套用说明、Skill 评估用例 |
| `assets/openai.yaml` | OpenAI/Codex UI 展示元数据（可选消费） |
| `../../agents/deep-tech-reviewer/prompt.md` | 独立评审 agent |
| `assets/scaffold/` | 复制到目标仓 `book/` 的文件 |
| `assets/workflow/build-epub.yml` | 构建 EPUB 与落地页的 GitHub Actions 工作流 |

`assets/scaffold/` 包含 `AGENTS.md`、`metadata.yaml`、`validate.js`、`preprocess.js`、`postprocess.js`、`build-epub.mjs`、`validate-render.js`、`validate-render.test.js`、`scaffold-capabilities.test.js`、`cover.svg`、`package.json`、`package-lock.json`、`mermaid-config.json` 和 `puppeteer-config.json`。

## 套用到新仓库

0. 读取 `~/config/resource.yaml`，确认目标仓库的 Fork/upstream、工作目录和允许的内容分支；不创建额外的 `source` 目录。
1. 派生（fork）目标开源仓库，并为本书创建 `book` 分支；已有个人 Fork 时直接复用。
2. 先同步 Fork 的默认分支，再将 `assets/scaffold/*` 复制到目标仓的 `book/`。
3. 将 `assets/workflow/build-epub.yml` 复制到目标仓的 `.github/workflows/build-epub.yml`。
4. 章节写在 `book/chapters/`，文件名形如 `chapter-00-overview.md`。
5. 填写 `book/metadata.yaml`、`book/cover.svg` 和工作流占位符。
6. 使用 `deep-tech-author` 按理解依赖顺序写章节。开篇章节应是架构与权衡总览。
7. 运行 `node book/validate.js`。
8. 使用 `agents/deep-tech-reviewer` 做内容评审，并迭代到阻塞项清零。
9. 只有人工确认后才发布：提交、推送 `book` 分支，让 CI 构建 EPUB 和落地页，再从 `gh-pages` 启用 GitHub Pages；创建 Release 时，CI 会把 EPUB、`cover.svg` 和 `cover.png` 附加为 Release 资产。禁止向 upstream push、创建 PR、force push 或删除受保护分支。

## 元数据配置项

`book/metadata.yaml`:

| 字段 | 含义 |
|---|---|
| `title`, `subtitle`, `author`, `publisher`, `description`, `rights` | 书籍元信息 |
| `language`, `date`, `version`, `book_id` | EPUB 元信息 |
| `repo_url` | 派生仓库 URL，例如 `https://github.com/OWNER/REPO` |
| `source_ref` | 源码链接使用的分支或 tag |
| `source_dirs` | 章节源码链接允许引用的顶层源码目录 |
| `doc_dirs` | 可选的 Markdown 设计文档目录，用于文档链接校验 |
| `upstream_repo` | 可选的上游 `owner/name`；章节源码链接不得指向这里 |
| `chapters` | 按 part 分组的章节清单 |

`book/cover.svg`：替换 `{{BRAND}}`、`{{TITLE_LINE1}}`、`{{TITLE_LINE2}}`、`{{TITLE_ACCENT}}`、`{{SUBTITLE}}`、`{{CHAPTER_COUNT}}` 和 `{{REPO_SLUG}}`。

`.github/workflows/build-epub.yml`：替换 `{{TITLE}}`、`{{DESCRIPTION}}`、`{{CHAPTER_COUNT}}`、`{{PART_COUNT}}`、`{{SOURCE_URL}}` 和 `env.EPUB_NAME`。

## 本地构建

在目标仓库根目录运行，也就是 `book/` 的上一级：

```bash
cd book
npm ci --ignore-scripts --no-audit --no-fund
export PUPPETEER_EXECUTABLE_PATH="$(command -v google-chrome-stable || command -v chromium)"
rsvg-convert -w 1600 -h 2400 cover.svg -o cover.png
node postprocess.js
node validate-render.js
node validate-render.test.js
node build-epub.mjs my-book.epub
```

`npm ci` 依赖 `book/package-lock.json`，用于保证构建可复现。`cover.svg` 会先渲染为 `cover.png`，再一起写入 EPUB 与 GitHub Pages 落地页。Mermaid 渲染需要 Chromium 或 Chrome；封面 PNG 渲染需要 `rsvg-convert`（macOS 可通过 `brew install librsvg` 安装）。

## 发布产物

- GitHub Actions artifact：每次 push、PR 或手动触发都会上传 EPUB、封面和 `book-debug` 调试产物。
- GitHub Pages：`book` 分支 push 后会发布 `index.html`、EPUB、`cover.svg`、`cover.png` 到 `gh-pages`，形成稳定落地站。
- Release：创建或发布 Release 时，CI 会把 EPUB、`cover.svg`、`cover.png` 附加到 Release。

## 安全边界

- 不写入凭据、token、密钥、私有客户名、邮箱、手机号、住址、联系人原始信息或敏感截图。
- 章节正文使用仓库相对源码链接；构建过程会把它们转换为 GitHub URL。
- `git commit`、`git push`、安装依赖、启用 Pages 和发布都需要人工明确确认。
