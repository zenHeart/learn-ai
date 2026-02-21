import { test, describe } from "node:test";
import assert from "node:assert";
import { throttle } from "./throttle.js";

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

describe("🧪 Throttle Function Tests (VDD Practice)", () => {
  test("1. 基本节流功能 (Leading Edge)", () => {
    let count = 0;
    const throttled = throttle(() => {
      count++;
    }, 100);

    throttled();
    throttled();
    throttled();

    assert.strictEqual(
      count,
      1,
      "在 100ms 内同步连续调用 3 次，应该只执行 1 次",
    );
  });

  test("2. 应该支持 trailing 配置 (在最后一次调用结束后兜底执行)", async () => {
    let count = 0;
    const throttled = throttle(
      () => {
        count++;
      },
      100,
      { trailing: true },
    );

    throttled(); // 0ms (执行，count=1)
    setTimeout(throttled, 30); // 30ms (被节流)
    setTimeout(throttled, 60); // 60ms (被节流，但因为 trailing=true，应该在 100ms 时兜底执行一次)

    // 等待 150ms 走完一个完整的节流周期
    await sleep(150);

    assert.strictEqual(
      count,
      2,
      "启用了 trailing:true 时，60ms 的那次调用应该在 100ms 周期的时刻被兜底执行，总执行次数应为 2",
    );
  });

  test("3. 正确绑定 this 上下文", () => {
    const obj = {
      val: 0,
      increment: function () {
        this.val++;
      },
    };

    const throttledInc = throttle(obj.increment, 100);
    const boundFn = throttledInc.bind(obj);

    boundFn();
    assert.strictEqual(obj.val, 1, "函数内部的 this 应该正确指向调用者对象");
  });
});
