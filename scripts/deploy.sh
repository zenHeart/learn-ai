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

# 3. 复制 Docs 文档到根目录 (假设使用某种工具生成，或者直接复制静态文件)
# 如果 docs 是纯 markdown，这里可能需要集成 vitepress/docusaurus 构建
# 目前根据需求，我们将 docs 视为静态资源或未来构建的目标
echo "Preparing Docs..."
cp -r docs/* ${temp_dist}/

# 4. 发布到 GitHub Pages
echo "Deploying to GitHub Pages..."
cd ${temp_dist}
git init
git add -A
git commit -m 'deploy: multi-path ppts and docs'
git push -f ${rep_url} master:gh-pages

echo "Deployment complete!"
