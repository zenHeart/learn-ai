// 对 sumArray 生成的 Jest 测试示例
const { sumArray } = require('./04.case-bug');

test('sumArray 正常工作', () => {
  expect(sumArray([1,2,3])).toBe(6);
});

test('sumArray 处理空数组', () => {
  expect(sumArray([])).toBe(0);
});

test('sumArray 忽略非数字或抛出', () => {
  expect(() => sumArray(undefined)).toThrow();
});
