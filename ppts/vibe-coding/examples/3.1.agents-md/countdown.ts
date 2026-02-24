// ❌ 初始实现（不符合规范）
// 使用了原生 Date，没有测试

export function getHoursUntilTomorrow() {
  const now = new Date();
  const tomorrow = new Date(now);
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(0, 0, 0, 0);
  return (tomorrow.getTime() - now.getTime()) / (1000 * 60 * 60);
}
