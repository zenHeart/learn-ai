# openclaw 微信接入

## 目前只有 ios

1. iOS 微信 >= 8.0.70
2. 执行 `npx -y @tencent-weixin/openclaw-weixin-cli@latest install` 插件会自动找到 openclaw 并添加依赖，显示二维码
3. 进入设置 -> 插件(Plug-in) -> WeixinClawBot
4. 打开扫码扫描步骤 2 的二维码
5. 此时微信机器人即可使用

## 限制

1. 2026.3.22 日只支持 ios 无安卓 MAC
2. 只支持私聊不支持群聊和加入群组