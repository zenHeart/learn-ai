/**
 * Vue3 组件生成：Prompt 对比示例
 * 展示裸 Prompt 和装备 Prompt 的区别
 */

// ============================================
// 1. 裸 Prompt（效果差）
// ============================================

const barePrompt = `写一个登录表单组件`;

// ============================================
// 2. 装备 Prompt（ICIO + Examples + Constraints）
// ============================================

const equippedPrompt = {
  instruction: `使用 Vue 3 Composition API + <script setup> 语法，
编写一个移动端优先的登录表单组件。`,

  context: `场景：电商 App 的用户登录页面
用户群体：普通消费者，需要简洁高效的登录体验
现有系统：使用 Pinia 管理用户状态，表单数据通过 v-model 绑定`,

  input: `输入字段：
- username: 用户名，支持手机号或邮箱
- password: 密码，最少 6 位
- rememberMe: 记住登录状态（可选）`,

  output: `- 单文件组件 (.vue)
- 包含 <template>、<script setup>、<style scoped>
- 使用 Element Plus 表单组件
- 支持手机号/邮箱格式校验
- 密码错误时显示具体错误信息`,

  examples: `<!-- 成功状态示例 -->
<el-form :model="form" :rules="rules">
  <el-form-item prop="username">
    <el-input v-model="form.username" placeholder="请输入手机号或邮箱" />
  </el-form-item>
</el-form>`,

  constraints: `- 移动端 viewport 宽度 375px 适配
- 按钮点击后有 1.5s 防重复提交
- 错误信息显示在对应表单项下方
- 密码输入框带眼睛图标切换显示
- 登录成功后跳转到 /dashboard`
};

// ============================================
// 3. 格式化输出
// ============================================

function printBarePrompt() {
  console.log("=".repeat(60));
  console.log("【版本 1】裸 Prompt（不推荐）");
  console.log("=".repeat(60));
  console.log(`\n${barePrompt}\n`);
  console.log("问题分析：");
  console.log("  ✗ 没有指定技术栈（Vue2? Vue3? Options? Composition?）");
  console.log("  ✗ 没有说明需要哪些功能（验证？记住密码？第三方登录？）");
  console.log("  ✗ 没有设计约束（什么样式？移动端适配？）");
  console.log("  ✗ 没有交互细节（错误提示？加载状态？）");
}

function printEquippedPrompt() {
  console.log("\n" + "=".repeat(60));
  console.log("【版本 2】装备 Prompt（ICIO + Examples + Constraints）");
  console.log("=".repeat(60));

  console.log("\n📋 Instruction（指令）:");
  console.log("─".repeat(40));
  console.log(equippedPrompt.instruction);

  console.log("\n📖 Context（上下文）:");
  console.log("─".repeat(40));
  console.log(equippedPrompt.context);

  console.log("\n📝 Input（输入规范）:");
  console.log("─".repeat(40));
  console.log(equippedPrompt.input);

  console.log("\n🎯 Output（输出格式）:");
  console.log("─".repeat(40));
  console.log(equippedPrompt.output);

  console.log("\n💡 Examples（参考示例）:");
  console.log("─".repeat(40));
  console.log(equippedPrompt.examples);

  console.log("\n⚠️ Constraints（约束条件）:");
  console.log("─".repeat(40));
  console.log(equippedPrompt.constraints);
}

function printComparison() {
  console.log("\n" + "=".repeat(60));
  console.log("对比总结");
  console.log("=".repeat(60));

  const comparison = [
    ["技术栈", "不确定", "Vue3 + Composition API"],
    ["功能完整性", "随机", "需求全覆盖"],
    ["代码质量", "基础实现", "生产级代码"],
    ["调试成本", "高", "低"],
    ["迭代次数", "多", "少"]
  ];

  console.log("\n┌─────────────┬────────────────┬────────────────┐");
  console.log("│ 维度        │ 裸 Prompt      │ 装备 Prompt    │");
  console.log("├─────────────┼────────────────┼────────────────┤");
  comparison.forEach(([dim, bare, equipped]) => {
    const dimPad = dim.padEnd(9);
    const barePad = bare.padEnd(14);
    console.log(`│ ${dimPad} │ ${barePad} │ ${equipped.padEnd(14)} │`);
  });
  console.log("└─────────────┴────────────────┴────────────────┘");
}

// ============================================
// 4. 运行输出
// ============================================

printBarePrompt();
printEquippedPrompt();
printComparison();

console.log("\n" + "=".repeat(60));
console.log("运行完成！复制 Prompt 到 AI 工具中测试效果");
console.log("=".repeat(60));
