#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

# 配置项
rep_url=$(git remote get-url origin)
temp_dist="/tmp/learn-ai-dist"
# 动态发现所有有 package.json 的 PPT 项目
PPT_PROJECTS=$(for dir in ppts/*/; do
    if [ -f "${dir}package.json" ]; then
        basename "${dir}"
    fi
done | tr '\n' ' ' | sed 's/ $//')

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

# 复制 PPT 导航页
echo "🎨 Copying PPT navigation..."
cp ppts/index.html ${temp_dist}/ppts/index.html

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
