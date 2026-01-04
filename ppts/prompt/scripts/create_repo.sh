#!/bin/sh
# set -x

PROJ_DIR=~/Desktop

function random_str() {
    jot -r -c 80 a z | rs -g 0 8
}
function get_commit_nums() {
    local count=$(git log --oneline | wc -l)
    if [[ $? -ne 0 ]]; then
        count=1
    fi
    echo $(( ${count} + 1 ))
}
function init_repo() {
   if [[ -d ".git" ]]; then
      echo 'alredy git repo'
   else
      git init
      echo "Git repository initialized."
   fi
}

#######################################
# 创建提交
# Globals:
#   PROJ_DIR 项目根目录
# Arguments:
#   $1 仓库名
#   $2 提交次数
#   $3 修改的文件名

#######################################
function create_commit() {

    local rep=${1:-_demo}
    local commitTimes=${2:-1}
    local fileName=${3:-text}
    local repDir=${PROJ_DIR}/${rep}

    mkdir -p $repDir
    cd ${repDir}
    if [[ commitTimes -eq reset ]]; then
      rm -rf $repDir
      echo "remove  $repDir success"
      return 0
    fi
    init_repo
    i=1
    while [ $i -le ${commitTimes} ] ; do
        random_str >${fileName}
        git add .
        git commit -am "${rep}:commit $(get_commit_nums)"
        sleep 1
        i=$((i + 1))
    done
}

create_commit $@