/**
 * 这是一个不完整的 throttle 实现。
 * 需求：实现一个节流函数，并且支持 trailing 参数（是否在节流周期结束后额外执行最后一次）。
 * 目前的代码是有 Bug 的，运行测试会看到红色的报错。
 */
export function throttle(
  fn: Function,
  wait: number,
  options: { trailing?: boolean } = { trailing: true },
) {
  let lastCallTime = 0;

  return function (...args: any[]) {
    const now = Date.now();
    // 基础防抖有了，但是完全没有实现 trailing（最后一次兜底执行）以及 context (this) 的绑定
    if (now - lastCallTime >= wait) {
      lastCallTime = now;
      fn(...args);
    }
  };
}
