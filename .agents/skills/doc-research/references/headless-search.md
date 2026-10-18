# 无头搜索 CLI

> 交叉验证时的可选增强，**不能替代**官方 docs 抓取。命令写 PATH 里的二进制名，不要写本机绝对路径。

## 用法

以该 CLI 自己的 `--help` 为准。常见形态：

```bash
# 位置参数 prompt；不要把 prompt 丢给错误的 flag
<cli> --output-format json "官方产品家族清单 + 只引用官方 URL"

# 部分 CLI 用 -p / --print 表示无头
<cli> --print --output-format text "…"
```

非 TTY 若报 `Device not configured`，用 `script -q /dev/null` 包一层。超时或失败：放弃无头，改抓官方页。不要用失败结果编造产品。

## 不要做

- 把 `~/.xxx/bin/<cli>` 这类家目录路径写进仓库
- 把无头输出里的三方博客当官方
- 无头超时后改用「应该还有个产品」补全
