# Vue3 组件生成：Prompt 工程对比

## 核心问题

相同的请求，不同的 Prompt，效果天差地别。

## 对比：裸 Prompt vs 装备 Prompt

### 裸 Prompt（效果差）

```
写一个登录表单组件
```

**问题**：
- 没有指定技术栈（Vue2? Vue3? Options? Composition?）
- 没有说明需要哪些功能（验证？记住密码？第三方登录？）
- 没有设计约束（什么样式？移动端适配？）
- 没有交互细节（错误提示？加载状态？）

模型只能靠猜测，结果往往不符合预期。

---

### 装备 Prompt（ICIO + Examples + Constraints）

**I - Instruction（指令）**
```
使用 Vue 3 Composition API + `<script setup>` 语法，
编写一个移动端优先的登录表单组件。
```

**C - Context（上下文）**
```
场景：电商 App 的用户登录页面
用户群体：普通消费者，需要简洁高效的登录体验
现有系统：使用 Pinia 管理用户状态，表单数据通过 v-model 绑定
```

**I - Input（输入规范）**
```
输入字段：
- username: 用户名，支持手机号或邮箱
- password: 密码，最少 6 位
- rememberMe: 记住登录状态（可选）
```

**O - Output（输出格式）**
```
- 单文件组件 (.vue)
- 包含 <template>、<script setup>、<style scoped>
- 使用 Element Plus 表单组件
- 支持手机号/邮箱格式校验
- 密码错误时显示具体错误信息
```

**Examples（示例）**
```vue
<!-- 成功状态示例 -->
<el-form :model="form" :rules="rules">
  <el-form-item prop="username">
    <el-input v-model="form.username" placeholder="请输入手机号或邮箱" />
  </el-form-item>
</el-form>
```

**Constraints（约束）**
```
- 移动端 viewport 宽度 375px 适配
- 按钮点击后有 1.5s 防重复提交
- 错误信息显示在对应表单项下方
- 密码输入框带眼睛图标切换显示
- 登录成功后跳转到 /dashboard
```

---

## 效果对比

| 维度 | 裸 Prompt | 装备 Prompt |
|------|-----------|-------------|
| 技术栈 | 不确定 | 明确 Vue3 + Composition |
| 功能完整性 | 随机 | 需求全覆盖 |
| 代码质量 | 基础实现 | 生产级代码 |
| 调试成本 | 高 | 低 |
| 迭代次数 | 多 | 少 |

## Prompt 工程 checklist

1. **明确技术栈** - 框架、版本、关键库
2. **说明使用场景** - 谁用、做什么、在哪用
3. **规定输入输出** - 字段、类型、格式
4. **提供参考示例** - 减少模型理解误差
5. **设定约束条件** - 性能、兼容、安全

好的 Prompt = 减少模型猜测 = 降低返工率
