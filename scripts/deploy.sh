#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

# 配置项
rep_url=$(git remote get-url origin)
temp_dist="/tmp/learn-ai-dist"
PPT_PROJECTS="prompt mcp vibe-coding"

echo "🚀 Starting build process..."

# 清理临时目录
rm -rf ${temp_dist}
mkdir -p ${temp_dist}/ppts

# 依赖已在根目录安装，直接构建
echo "🔨 Building all PPTs..."
for ppt in ${PPT_PROJECTS}; do
    echo "  📦 Building ${ppt}..."
    pnpm --filter ${ppt} build
done

# 复制构建产物到临时目录
echo "📋 Copying build outputs..."
for ppt in ${PPT_PROJECTS}; do
    if [ -d "ppts/${ppt}/dist" ]; then
        mkdir -p ${temp_dist}/ppts/${ppt}
        cp -r ppts/${ppt}/dist/* ${temp_dist}/ppts/${ppt}/
        echo "  ✓ Copied ${ppt}"
    else
        echo "  ⚠️ No dist found for ${ppt}"
    fi
done

# 准备 Docs
echo "📄 Preparing Docs..."
cp -r docs/* ${temp_dist}/

# 生成 PPT 导航页
echo "🎨 Generating PPT navigation..."
cat >${temp_dist}/ppts/index.html <<EOF
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>AI PPTs</title>
    <style>
        :root { --bg:#fff; --text:#1a1a1a; --card:#f6f8fa; --border:#e1e4e8; --accent:#2ea44f; }
        @media(prefers-color-scheme:dark) { :root { --bg:#0d1117; --text:#c9d1d9; --card:#161b22; --border:#30363d; }}
        * { box-sizing:border-box; }
        body { font-family:system-ui,sans-serif; max-width:900px; margin:0 auto; padding:40px 20px; background:var(--bg); color:var(--text); }
        h1 { text-align:center; font-size:2.5rem; margin-bottom:40px; }
        .grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(280px,1fr)); gap:20px; }
        .card { background:var(--card); border:1px solid var(--border); border-radius:12px; padding:24px; transition:all .3s; text-decoration:none; color:inherit; display:block; }
        .card:hover { transform:translateY(-4px); box-shadow:0 8px 24px rgba(0,0,0,.15); border-color:var(--accent); }
        .card h2 { margin:0 0 10px; font-size:1.3rem; }
        .card p { margin:0; opacity:.8; font-size:.95rem; }
        .icon { font-size:2rem; margin-bottom:12px; }
        .footer { text-align:center; margin-top:40px; opacity:.7; }
        .footer a { color:var(--accent); text-decoration:none; }
    </style>
</head>
<body>
    <h1>🎯 AI 学习幻灯片</h1>
    <div class="grid">
        <a href="/learn-ai/ppts/prompt/" class="card"><div class="icon">✨</div><h2>Prompt Engineering</h2><p>提示工程技巧与实战</p></a>
        <a href="/learn-ai/ppts/mcp/" class="card"><div class="icon">🔌</div><h2>MCP Protocol</h2><p>Model Context Protocol 详解</p></a>
        <a href="/learn-ai/ppts/vibe-coding/" class="card"><div class="icon">🎸</div><h2>Vibe Coding</h2><p>AI 辅助编程新范式</p></a>
    </div>
    <p class="footer"><a href="/learn-ai/">← 返回文档首页</a></p>
</body>
</html>
EOF

# 发布
echo "🚢 Deploying to GitHub Pages..."
cd ${temp_dist}
git init
git add -A
git commit -m 'deploy: ppts and docs'
git push -f ${rep_url} master:gh-pages

echo ""
echo "✅ Done! Deployed URLs:"
for ppt in ${PPT_PROJECTS}; do
    echo "   https://blog.zenheart.site/learn-ai/ppts/${ppt}/"
done
