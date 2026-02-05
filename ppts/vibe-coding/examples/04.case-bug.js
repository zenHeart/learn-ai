// Bug 示例：函数行为异常
function sumArray(arr) {
  // 预期：计算数组所有数字之和
  return arr.reduce((a, b) => a + b, 0);
}

// 故意的 bug 例子：传入 undefined 时会抛出
module.exports = { sumArray };
