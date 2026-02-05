// 示例：常用 prompt 模板封装（可作为团队知识库的一部分）
const prompts = {
  bugFix: (file, err, code) => `背景：项目使用 Node.js，测试失败，错误：${err}\n文件：${file}\n代码：\n${code}\n\n请定位可能原因并给出修复建议。`,
  genTests: (code) => `为下列函数生成 Jest 测试用例，覆盖正常输入、异常输入与边界条件。代码：\n${code}`
};

module.exports = prompts;
