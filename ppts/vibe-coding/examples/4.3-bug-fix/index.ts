import fs from "fs";
import path from "path";

/**
 * 本文件演示了线上疑难 Bug 定位与修复的思想。
 * 在复杂的项目中，大模型最擅长对长文本（如系统报错日志、堆栈跟踪）进行“外科手术式”的切割、分析和总结。
 */

// 1. 模拟一段从 Sentry 等日志平台拉取到的混杂的堆栈报错文本
const rawSentryLog = `
2026-02-21 10:15:32 ERROR [server]: Unhandled Promise Rejection
Traceback (most recent call last):
  at async fetchData (/app/src/services/api.js:42:15)
  at async handleRequest (/app/src/controllers/userController.js:18:22)
TypeError: Cannot read properties of undefined (reading 'map')
  at normalizeData (/app/src/utils/transformers.js:112:35)
  at Object.getUserProfile (/app/src/services/userService.js:89:12)
>> User Context: userId=U-89211, device=Mobile_iOS, endpoint=/api/v1/users/profile
`;

// 2. 模拟一段存在 Bug 的源码 (在 transformers.js 文件里)
const mockSourceCode = `
// transformers.js
export function normalizeData(payload) {
    // 危险：payload 可能因为上游 API 故障而返回 undefined
    const items = payload.data.map(item => ({
        id: item.userId,
        name: item.userName
    }));
    return items;
}
`;

// 3. 模拟 Agent 接收报错和提取相关代码的过程
function analyzeAndFixBug(log: string, code: string) {
  console.log(
    `\n👨‍💻 开发人员把日志丢给 Agent，并附加命令: \n"请帮我看看这个线上 /api/v1/users/profile 接口报的 500 是怎么回事，给出修复代码。"`,
  );
  console.log(`\n🤖 Agent 正在解析报错日志...`);

  // 这一步在现实中是 Agent 自动执行 grep 或正则提取堆栈信息，然后跨文件去读取代码
  const errorMatch = log.match(/TypeError: (.+)/);
  const locationMatch = log.match(/at normalizeData \((.+)\)/);

  const errorMsg = errorMatch ? errorMatch[1] : "Unknown Error";
  const errorLocation = locationMatch ? locationMatch[1] : "Unknown Location";

  console.log(`  [🔍 提取核心报错]: ${errorMsg}`);
  console.log(`  [📍 提取定位点]: ${errorLocation}`);

  console.log(
    `\n🤖 Agent 后台执行动作: \`cat ${errorLocation.split(":")[0]}\``,
  );
  console.log(`  (查看到引发错误的函数内容如下):`);
  console.log(code.trim());

  console.log(`\n🤖 Agent 推理过程:`);
  console.log(`  >> 错误是 "${errorMsg}"`);
  console.log(
    `  >> 这说明在执行 payload.data.map 的时候，payload 或者 payload.data 是 undefined 或 null。`,
  );
  console.log(`  >> 原因很可能是请求后端数据时没有做判空导致应用崩溃。`);

  console.log(`\n🤖 Agent 生成的修复补丁 (Diff / Patch):`);
  console.log(`
// 建议修改后的 transformers.js
export function normalizeData(payload) {
    // 【修复】: 添加了空值安全防范 (Optional Chaining 与默认空数组)
    if (!payload || !Array.isArray(payload.data)) {
        console.warn("normalizeData 接收到了非法 payload:", payload);
        return [];
    }

    const items = payload.data.map(item => ({
        id: item.userId,
        name: item.userName
    }));
    return items;
}
    `);
}

console.log("🚀 疑难 Bug 定位与修复 演示程序\n");
analyzeAndFixBug(rawSentryLog, mockSourceCode);
