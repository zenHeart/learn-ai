#!/usr/bin/env node
/** One-shot contextual repair for docs/zh/products/openclaw/cli.md (U+FFFD corruption from a lossy rebase). */
import { readFileSync, writeFileSync } from 'node:fs'

const file = 'docs/zh/products/openclaw/cli.md'
let t = readFileSync(file, 'utf8')

// Ordered find→replace pairs. �? is the corruption artifact (U+FFFD + '?').
const pairs = [
  ['命令参�?', '命令参考'],
  ['本章节提�?', '本章节提供'],
  ['OpenClaw 所�?', 'OpenClaw 所有'],
  ['按功能模块组织�?>', '按功能模块组织。\n>'],
  ['基本概念�?', '基本概念。'],
  ['帮助与版�?', '帮助与版本'],
  ['状态检�?', '状态检查'],
  ['运行状�?openclaw status', '运行状态\nopenclaw status'],
  ['诊断检�?openclaw doctor', '诊断检查\nopenclaw doctor'],
  ['启动与停�?', '启动与停止'],
  ['默认端�?18789�?openclaw gateway', '默认端口 18789）\nopenclaw gateway'],
  ['模式启�?openclaw gateway --allow-unconfigured', '模式启动\nopenclaw gateway --allow-unconfigured'],
  ['日志启�?openclaw gateway --verbose', '日志启动\nopenclaw gateway --verbose'],
  ['安装与管�?', '安装与管理'],
  ['后台运行�?openclaw onboard --install-daemon', '后台运行）\nopenclaw onboard --install-daemon'],
  ['daemon 状�?openclaw gateway status', 'daemon 状态\nopenclaw gateway status'],
  ['热重载模式�?', '热重载模式：'],
  ['都重�?Gateway', '都重启 Gateway'],
  ['禁用热重�?|', '禁用热重载 |'],
  ['飞书登�?openclaw channels login', '飞书登录\nopenclaw channels login'],
  ['通道状�?openclaw channels status', '通道状态\nopenclaw channels status'],
  ['配对请�?openclaw pairing list', '配对请求\nopenclaw pairing list'],
  ['通道最�?3 个待处理请求�?', '通道最多 3 个待处理请求。'],
  ['列表与状�?', '列表与状态'],
  ['可用模�?openclaw models list', '可用模型\nopenclaw models list'],
  ['使用状�?openclaw models status', '使用状态\nopenclaw models status'],
  ['默认主模�?openclaw models set', '默认主模型\nopenclaw models set'],
  ['所有别�?openclaw models aliases list', '所有别名\nopenclaw models aliases list'],
  ['列表与查�?', '列表与查询'],
  ['所有会�?openclaw sessions list', '所有会话\nopenclaw sessions list'],
  ['键格�?# 私聊', '键格式\n# 私聊'],
  ['maintenance 配置�?openclaw sessions prune', 'maintenance 配置）\nopenclaw sessions prune'],
  ['所有会�?openclaw sessions prune --all', '所有会话\nopenclaw sessions prune --all'],
  ['配置编辑�?', '配置编辑器'],
  ['配置向�?openclaw configure', '配置向导\nopenclaw configure'],
  ['首次配�?openclaw onboard', '首次配置\nopenclaw onboard'],
  ['配置�?openclaw config get <key>', '配置键\nopenclaw config get <key>'],
  ['配置�?openclaw config set <key> <value>', '配置键\nopenclaw config set <key> <value>'],
  ['配置�?openclaw config unset <key>', '配置键\nopenclaw config unset <key>'],
  ['（脱敏后�?openclaw config show', '（脱敏后）\nopenclaw config show'],
  ['可用工�?openclaw tools list', '可用工具\nopenclaw tools list'],
  ['连接状�?openclaw mcp status', '连接状态\nopenclaw mcp status'],
  ['列出可用�?MCP 工具', '列出可用的 MCP 工具'],
  ['插件列表与状�?', '插件列表与状态'],
  ['已安装插�?openclaw plugins list', '已安装插件\nopenclaw plugins list'],
  ['详细状�?openclaw plugins status <plugin-id>', '详细状态\nopenclaw plugins status <plugin-id>'],
  ['安装与卸�?', '安装与卸载'],
  ['所有插�?openclaw plugins update --all', '所有插件\nopenclaw plugins update --all'],
  ['启用与禁�?', '启用与禁用'],
  ['定时任�?', '定时任务'],
  ['列出所�?Cron 任务', '列出所有 Cron 任务'],
  ['延迟执行�?openclaw cron schedule', '延迟执行）\nopenclaw cron schedule'],
  ['工作区管�?', '工作区管理'],
  ['工作区操�?', '工作区操作'],
  ['工作区结�?openclaw workspace validate', '工作区结构\nopenclaw workspace validate'],
  ['备份工作�?openclaw workspace backup', '备份工作区\nopenclaw workspace backup'],
  ['恢复工作�?openclaw workspace restore', '恢复工作区\nopenclaw workspace restore'],
  ['工作区文�?', '工作区文件'],
  ['工作区目�?openclaw workspace open', '工作区目录\nopenclaw workspace open'],
  ['仪表�?', '仪表盘'],
  ['仪表板访�?', '仪表板访问'],
  ['仪表板功�?', '仪表板功能'],
  ['消息�?| 监控消息处理状�?|', '消息监控 | 监控消息处理状态 |'],
  ['模型状�?|', '模型状态 |'],
  ['通道状�?|', '通道状态 |'],
  ['升级与维�?', '升级与维护'],
  ['检查更�?openclaw update check', '检查更新\nopenclaw update check'],
  ['指定版�?openclaw update install --version <version>', '指定版本\nopenclaw update install --version <version>'],
  ['快速命令索�?', '快速命令索引'],
  ['查看运行状�?|', '查看运行状态 |']
]

let applied = 0
for (const [find, rep] of pairs) {
  const before = t
  t = t.split(find).join(rep)
  if (t !== before) applied++
}

// Frontmatter was lost together with the encoding.
if (!t.startsWith('---\n')) {
  t = `---\ntitle: "OpenClaw CLI 命令参考"\ndescription: "OpenClaw CLI 命令参考：网关、通道、模型、会话、插件、定时任务与工作区管理的命令速查。"\ndomain: product\ntags:\n  - openclaw\n  - cli\nstatus: canonical\n---\n\n` + t
}

writeFileSync(file, t)
const remaining = (t.match(/�/g) || []).length
console.log(`applied ${applied}/${pairs.length} pairs; remaining U+FFFD: ${remaining}`)
process.exit(remaining > 0 ? 1 : 0)
