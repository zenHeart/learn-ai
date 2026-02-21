import { normalizeData } from "./src/utils/transformers.js";

// 模拟调用第三方接口提取数据
async function fetchUserData() {
  // 危险：假设今天由于上游服务宕机，返回的是错误对象而非标准的 { data: [...] }
  return {
    error: "Service Unavailable",
    code: 503,
  };
}

async function handleRequest() {
  console.log("正在处理用户请求...");

  const payload = await fetchUserData();

  // Bug 爆发地：normalizeData 方法假定了 payload 必定存在 data 属性并且是个数组
  // 这将直接导致 TypeError: Cannot read properties of undefined (reading 'map')
  const users = normalizeData(payload);

  console.log("数据处理成功: ", users);
}

handleRequest().catch((err) => {
  console.error("\n❌ [Server Error] 发生了未捕获的严重异常: ");
  console.error(err);
});
