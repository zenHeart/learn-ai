/**
 * 这个文件演示 VDD (验证驱动开发) 的核心闭环思想：编写测试 -> 运行报错 -> 喂给 AI 修复 -> 测试通过
 */

// 1. 假设这是项目中一个写了一半的工具函数
// 需求：实现一个 throttle 函数，但目前不仅没实现节流，连 trailing (最后一次触发) 参数也没处理
function throttle(
  fn: Function,
  wait: number,
  options: { trailing?: boolean } = {},
) {
  // 故意写错的代码：完全没有节流逻辑，直接调用了
  return function (...args: any[]) {
    fn(...args);
  };
}

// 2. 模拟测试框架的断言逻辑 (Red -> Green)
function runTest() {
  console.log(`\n[🧪 运行测试用例]: 测试 throttle 的 trailing 参数行为...`);

  let callCount = 0;
  const throttledFn = throttle(
    () => {
      callCount++;
    },
    100,
    { trailing: false },
  );

  // 模拟连续高频调用
  throttledFn();
  throttledFn();
  throttledFn();

  try {
    if (callCount > 1) {
      throw new Error(
        `[Assertion Error]: 预期节流内只被调用 1 次，但实际调用了 ${callCount} 次。Trailing 参数支持未实现。`,
      );
    }
    console.log("✅ 测试通过");
    return { success: true, error: null };
  } catch (e: any) {
    console.log(
      `❌ 测试失败: \n   ${e.message}\n   at runTest (examples/4.2-vdd/index.ts:25:19)`,
    );
    return { success: false, error: e.message };
  }
}

// 3. 模拟 Agent 接收测试失败信息并实现代码修复的闭环
function executeVDDLoop() {
  console.log("🚀 验证驱动开发 (VDD) 闭环演示\n");

  console.log("==== 第 1 步: 人类编写并运行测试 (Red) ====");
  const initialRun = runTest();

  if (!initialRun.success) {
    console.log("\n==== 第 2 步: 将报错堆栈和上下文发给 Agent ====");
    console.log(`🤖 Agent 收到报错: "${initialRun.error}"`);
    console.log(`🤖 Agent 正在阅读相关的 throttle 源码并重写修复...`);

    // 我们模拟 Agent 写出了正确的带 trailing 逻辑的 throttle 代码
    console.log(`
  [Agent 修复后的代码片段]:
  function throttle(fn, wait, options) {
      // 完整的 timeout 和 last_call 逻辑...
      // 判断 context, args, 和 options.trailing ...
  }
        `);

    console.log("\n==== 第 3 步: 再次运行测试 (Green) ====");
    console.log(`[🧪 运行测试用例]: (假设代码已被 Agent 修改后重新加载)`);
    console.log("✅ 测试通过 (Agent 完美解决了边界条件)！");
  }
}

executeVDDLoop();
