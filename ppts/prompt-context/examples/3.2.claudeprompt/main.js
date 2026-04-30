/**
 * .claudeprompt Parser Demo
 *
 * This script demonstrates how to parse and extract information
 * from a .claudeprompt file structure.
 */

// ============================================================
// Sample .claudeprompt structure (simulating file content)
// ============================================================
const sampleClaudeprompt = `---
name: vue-component-generator
description: 生成 Vue 3 组件代码
version: "1.0"
type: component

instruction: |
  你是一个 Vue 3 组件生成器。根据用户需求生成高质量的 Vue 3 Composition API 组件代码。
  使用 <script setup> 语法和 TypeScript。

examples:
  - description: 简单按钮组件
    input: |
      生成一个简单的按钮组件，支持 primary 和 secondary 两种类型
    output: |
      <script setup lang="ts">
      interface Props {
        type?: 'primary' | 'secondary'
      }
      withDefaults(defineProps<Props>(), { type: 'primary' })
      </script>

constraints:
  - 必须使用 TypeScript
  - 必须使用 <script setup> 语法
  - 组件必须可复用

output_format:
  type: code
  language: vue
  schema:
    script: 组件脚本部分
    template: 组件模板部分
---

<template>
  <button :class="['app-button', type]">
    <slot />
  </button>
</template>

<script setup lang="ts">
interface Props {
  type?: "primary" | "secondary"
}
withDefaults(defineProps<Props>(), { type: "primary" })
</script>
`;

// ============================================================
// Simple Parser Functions
// ============================================================

/**
 * Parse YAML frontmatter from content
 */
function parseFrontmatter(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---\n/);
  if (!match) return { raw: "", content };

  return { raw: match[1], content: content.replace(/^---\n[\s\S]*?\n---\n/, "") };
}

/**
 * Extract simple key: value pairs
 */
function extractMetadata(raw) {
  const result = {};
  const lines = raw.split("\n");
  let currentKey = null;
  let currentValue = [];
  let inMultiline = false;

  for (const line of lines) {
    // Check for multiline value start (key: |)
    const multilineMatch = line.match(/^(\w+):\s*\|$/);
    if (multilineMatch) {
      if (currentKey) {
        result[currentKey] = currentValue.join("\n").trim();
      }
      currentKey = multilineMatch[1];
      currentValue = [];
      inMultiline = true;
      continue;
    }

    // Check for simple key: value
    const simpleMatch = line.match(/^(\w+):\s*(.*)$/);
    if (simpleMatch && !inMultiline) {
      if (currentKey) {
        result[currentKey] = currentValue.join("").trim() || simpleMatch[2];
      }
      currentKey = simpleMatch[1];
      currentValue = simpleMatch[2] ? [simpleMatch[2]] : [];
      if (!simpleMatch[2]) {
        inMultiline = false; // Empty value, not multiline
      }
      continue;
    }

    // Continuation of multiline value
    if (inMultiline && (line.startsWith("  ") || line === "")) {
      currentValue.push(line.replace(/^  /, ""));
      continue;
    }

    // End of multiline
    if (inMultiline && currentKey && !line.startsWith("  ")) {
      result[currentKey] = currentValue.join("\n").trim();
      currentKey = null;
      currentValue = [];
      inMultiline = false;
    }

    // Array item (- something)
    const arrayMatch = line.match(/^\s+-\s+(.*)$/);
    if (arrayMatch) {
      if (!result.examples) result.examples = [];
      if (!currentKey) {
        result.examples.push({ description: arrayMatch[1] });
      } else if (currentKey === "examples") {
        const lastExample = result.examples[result.examples.length - 1];
        if (lastExample && Object.keys(lastExample).length === 1) {
          lastExample.description = arrayMatch[1];
        }
      }
    }

    // Key: value inside object (indent 4+ spaces)
    const nestedMatch = line.match(/^\s{4,}(\w+):\s*(.*)$/);
    if (nestedMatch && currentKey === "examples") {
      const lastExample = result.examples[result.examples.length - 1];
      if (lastExample) {
        lastExample[nestedMatch[1]] = nestedMatch[2];
      }
    }
  }

  // Close last multiline
  if (currentKey) {
    result[currentKey] = currentValue.join("\n").trim();
  }

  return result;
}

/**
 * Parse constraints section
 */
function parseConstraints(raw) {
  const constraints = [];
  let inConstraints = false;

  raw.split("\n").forEach((line) => {
    if (line.trim() === "constraints:") {
      inConstraints = true;
      return;
    }
    if (inConstraints) {
      const match = line.match(/^\s+-\s+(.*)$/);
      if (match) {
        constraints.push(match[1]);
      } else if (!line.startsWith(" ") && line.trim()) {
        inConstraints = false;
      }
    }
  });

  return constraints;
}

/**
 * Parse output_format section
 */
function parseOutputFormat(raw) {
  const outputFormat = {};
  let inSection = false;
  let currentKey = null;

  raw.split("\n").forEach((line) => {
    if (line.trim() === "output_format:") {
      inSection = true;
      return;
    }
    if (inSection) {
      const topMatch = line.match(/^\s{2,3}(\w+):\s*(.*)$/);
      if (topMatch && !line.match(/^\s{6,}/)) {
        currentKey = topMatch[1];
        outputFormat[currentKey] = topMatch[2] || {};
      } else if (line.match(/^\s{6,}\w+:/)) {
        const nestedMatch = line.match(/^\s{6,}(\w+):\s*(.*)$/);
        if (nestedMatch && typeof outputFormat[currentKey] === "object") {
          outputFormat[currentKey][nestedMatch[1]] = nestedMatch[2];
        }
      }
    }
  });

  return outputFormat;
}

/**
 * Main parser function
 */
function parseClaudeprompt(content) {
  const { raw, content: template } = parseFrontmatter(content);
  const metadata = extractMetadata(raw);

  return {
    name: metadata.name || "unnamed",
    description: metadata.description || "",
    version: metadata.version || "0.0",
    type: metadata.type || "prompt",
    instruction: metadata.instruction || "",
    examples: metadata.examples || [],
    constraints: parseConstraints(raw),
    output_format: parseOutputFormat(raw),
    template: template.trim(),
  };
}

// ============================================================
// Demo
// ============================================================
console.log("=".repeat(60));
console.log(".claudeprompt Parser Demo");
console.log("=".repeat(60));

// Parse the sample
const parsed = parseClaudeprompt(sampleClaudeprompt);

// Display parsed structure
console.log("\n📦 解析后的 .claudeprompt 结构：\n");

console.log(`📛 Name: ${parsed.name}`);
console.log(`📝 Description: ${parsed.description}`);
console.log(`🏷️  Version: ${parsed.version}`);
console.log(`📄 Type: ${parsed.type}`);

console.log("\n" + "-".repeat(40));
console.log("📋 Instruction（核心指令）:");
console.log("-".repeat(40));
console.log(parsed.instruction);

console.log("\n" + "-".repeat(40));
console.log("📚 Examples（示例）:");
console.log("-".repeat(40));
parsed.examples.forEach((example, i) => {
  console.log(`\n示例 ${i + 1}: ${example.description || "无描述"}`);
  console.log(`  Input: ${(example.input || "").substring(0, 50)}...`);
  console.log(`  Output: ${(example.output || "").substring(0, 50)}...`);
});

console.log("\n" + "-".repeat(40));
console.log("⚠️  Constraints（约束条件）:");
console.log("-".repeat(40));
parsed.constraints.forEach((constraint, i) => {
  console.log(`  ${i + 1}. ${constraint}`);
});

console.log("\n" + "-".repeat(40));
console.log("📤 Output Format（输出格式）:");
console.log("-".repeat(40));
console.log(JSON.stringify(parsed.output_format, null, 2));

console.log("\n" + "-".repeat(40));
console.log("📄 Template（模板内容）:");
console.log("-".repeat(40));
console.log(parsed.template.substring(0, 200) + "...");

console.log("\n\n" + "=".repeat(60));
console.log("💡 实际使用建议");
console.log("=".repeat(60));
console.log(`
1. 将 .claudeprompt 文件拆分为多个模块：
   - common-instructions.claudeprompt
   - safety-constraints.claudeprompt
   - specific-task.claudeprompt

2. 在项目中引用模块：
   extends:
     - common-instructions
     - safety-constraints

3. 使用版本控制管理提示词变更：
   git log prompts/
   git diff prompts/v1.0..v1.1

4. 在 CI 中验证提示词格式：
   - 检查必需字段是否存在
   - 验证 output_format schema
   - 检查 examples 数量
`);
