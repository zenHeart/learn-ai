# 用例：为遗留应用添加 AI 搜索

**场景**: 你有一个 10 年历史的电商网站 (SQL 数据库)。搜索功能很糟糕。
**目标**: 添加“语义搜索”，而不重写后端。

## 策略：“Sidecar” (边车) 索引

不要触碰主数据库模式。启动一个独立的向量数据库 (例如 Pinecone 或 Sidecar Postgres)。

## 步骤 1: 回填 (一次性)

编写脚本读取所有产品并推送到向量数据库。

```typescript
// scripts/backfill.ts
const products = await sql.query('SELECT id, name, description FROM products');

for (const p of products) {
  const embedding = await generateEmbedding(`${p.name}: ${p.description}`);
  await vectorDB.upsert({
    id: p.id,
    values: embedding,
    metadata: { name: p.name }
  });
}
```

## 步骤 2: 双写 (持续进行)

挂钩到你的 CRUD 操作中。当产品更新时，更新向量。

```typescript
async function updateProduct(id, data) {
  // 1. 更新 SQL (数据源)
  await sql.update('products', data).where({ id });

  // 2. 更新向量 (搜索索引) - 发后即忘
  generateEmbedding(data.description).then(vector => {
    vectorDB.upsert({ id, values: vector });
  });
}
```

## 步骤 3: 前端切换

替换搜索 API 调用。

```javascript
// 旧的
// fetch(`/api/search?q=${query}`)

// 新的
fetch(`/api/vector-search?q=${query}`)
```

## 零停机迁移

1.  部署向量数据库。
2.  运行回填。
3.  启用双写。
4.  切换前端以使用向量搜索。
5.  (可选) 保留关键词搜索作为后备。