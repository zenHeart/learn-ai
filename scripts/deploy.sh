#!/usr/bin/env sh

# 配置项
build_dir=dist # 编译输出目录
rep_url=`git remote get-url origin ` # 远程仓库地址

# 确保脚本抛出遇到的错误
set -e

# 生成静态文件
cd ppt
npm run build

# 进入生成的文件夹

cd ${build_dir}


git init
git add -A
git commit -m 'deploy'

# 如果发布到 https://<USERNAME>.github.io
# git push -f git@github.com:<USERNAME>/<USERNAME>.github.io.git master
#如果发布到 https://<USERNAME>.github.io/<REPO>
git push -f ${rep_url} master:gh-pages

cd -