#!/usr/bin/env sh

# 配置项
rep_url=`git remote get-url origin` # 远程仓库地址
temp_dist="/tmp/learn-ai-dist"

# 确保脚本抛出遇到的错误
set -e

# 清理并创建临时构建目录
rm -rf ${temp_dist}
mkdir -p ${temp_dist}/ppts/prompt
mkdir -p ${temp_dist}/ppts/mcp

# 1. 构建 Prompt PPT
echo "Building Prompt PPT..."
cd ppts/prompt
npm install
npm run build -- --out ../../${temp_dist}/ppts/prompt
cd ../..

# 2. 构建 MCP PPT
echo "Building MCP PPT..."
cd ppts/mcp
npm install
npm run build -- --out ../../${temp_dist}/ppts/mcp
cd ../..

# 3. 准备 Docs 文档
# 注意：这里假设 docs 是静态文件。如果需要 markdown 渲染，通常需要集成构建工具。
# 为了满足 /ppts 访问要求，我们将 ppts.md 复制并重命名为 ppts/index.html (如果它是静态的)
# 或者如果用户使用 GitHub Pages 默认渲染，我们保持结构。
echo "Preparing Docs..."
cp -r docs/* ${temp_dist}/

# 特殊处理：将 ppts.md 映射为 /ppts 路径下的内容
# 如果是纯静态部署且没有渲染器，我们创建一个简单的 HTML 导航页作为兜底
cat > ${temp_dist}/ppts/index.html <<EOF
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>AI PPTs Navigation</title>
    <style>
        body { font-family: sans-serif; line-height: 1.6; max-width: 800px; margin: 40px auto; padding: 0 20px; }
        h1 { border-bottom: 1px solid #eee; padding-bottom: 10px; }
        .card { border: 1px solid #ddd; border-radius: 8px; padding: 20px; margin-bottom: 20px; transition: transform 0.2s; }
        .card:hover { transform: translateY(-5px); box-shadow: 0 5px 15px rgba(0,0,0,0.1); }
        .card h2 { margin-top: 0; }
        .btn { display: inline-block; background: #007bff; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; }
    </style>
</head>
<body>
    <h1>AI 学习幻灯片 (PPTs)</h1>
    <div class="card">
        <h2>Prompt Engineering</h2>
        <p>深度解析提示工程的技巧与实战。</p>
        <a href="/learn-ai/ppts/prompt/" class="btn">查看 PPT</a>
    </div>
    <div class="card">
        <h2>Model Context Protocol</h2>
        <p>详解 MCP 协议架构、原理与全流程开发。</p>
        <a href="/learn-ai/ppts/mcp/" class="btn">查看 PPT</a>
    </div>
    <p><a href="/learn-ai/">返回文档首页</a></p>
</body>
</html>
EOF

# 4. 发布到 GitHub Pages
echo "Deploying to GitHub Pages..."
cd ${temp_dist}
git init
git add -A
git commit -m 'deploy: multi-path ppts and docs with navigation'
git push -f ${rep_url} master:gh-pages

echo "Deployment complete!"
