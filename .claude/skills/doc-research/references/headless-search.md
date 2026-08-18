# 无头搜索 CLI

> 交叉验证时的可选增强，**不能替代**官方 docs 抓取。命令写在 PATH 里的二进制名，不要写本机绝对路径。

## Grok

```bash
# 位置参数，不要把 prompt 丢给错误的 flag
grok --output-format json "官方产品家族清单 + 只引用官方 URL"

# 部分版本用 -p 表示无头
grok -p --output-format text "…"
```

非 TTY 若报 `Device not configured`：

```bash
script -q /dev/null grok --output-format json "…"
```

超时或失败：放弃无头，改抓官方页。不要用失败结果编造产品。

## 其他无头 Agent CLI

本机若装了兼容的 print 模式 CLI（常见短名如 `agy`），用：

```bash
agy --print --output-format text --print-timeout 3m "列出官方一级产品，只给官方 URL"
```

以该 CLI 自己的 `--help` 为准。调不通就跳过。

## 不要做

- 把 `~/.grok/bin/grok` 这类家目录路径写进仓库
- 把无头输出里的三方博客当官方
- 无头超时后改用「应该还有个产品」补全
