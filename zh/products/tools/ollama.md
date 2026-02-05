# Ollama

## 简介

[Ollama](https://github.com/ollama/ollama) 类似于包管理器（类比于 `pip`、`brew` 等），降低了模型下载、安装、使用和管理的成本。

## 安装

1. 官网下载客户端：[ollama](https://ollama.com/download)
2. 客户端下载成功后，安装命令行工具 `ollama`
3. 在终端安装模型，例如 `ollama run deepseek-r1:8b`
4. 模型下载成功后，直接输入文本回车和模型交互，具体终端使用详见[命令行交互](#命令行交互)

## 常用命令

```bash
# 查看帮助
ollama help

# 列出本地模型
ollama list

# 运行某个模型
ollama run deepseek-r1:8b
```

## 命令行交互

本地模型运行后可以直接输入文本，回车后模型会给出回答。除此之外常用默认指令有：

```bash
/help 帮助
/bye 退出
/clear 清除
/exit 退出
```

## 创建自定义模型

1. 新建 `Modelfile` 文件

```dockerfile
# 继承 deepseek-r1:8b 模型
FROM deepseek-r1:8b

# 设置温度参数 
PARAMETER temperature 0.8

# 设置上下文长度
PARAMETER num_ctx 4096

# 自定义 prompt
# 设置自定义系统消息以指定聊天助手的行为
SYSTEM You are Mario from super mario bros, acting as an assistant.
```

2. 创建模型

```bash
# 项目根目录执行
ollama create teaching

# 创建成功后，会生成一个 teaching 模型, 查找模型 name
ollama list

# 运行自定义模型，假设模型名称为 mymodel:latest
ollama run mymodel:latest
```

## 参考资料

- [Ollama 介绍](https://datawhalechina.github.io/handy-ollama/#/C1/1.%20Ollama%20%E4%BB%8B%E7%BB%8D)