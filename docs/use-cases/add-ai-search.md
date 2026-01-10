# Use Case: Adding AI Search to a Legacy App

**Scenario**: You have a 10-year-old e-commerce site (SQL Database). Search is terrible.
**Goal**: Add "Semantic Search" without rewriting the backend.

## The Strategy: "Sidecar" Index

Do not touch the main database schema. Spin up a separate Vector Database (e.g., Pinecone or a sidecar Postgres).

## Step 1: Backfill (One-time)

Write a script to read all products and push to Vector DB.

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

## Step 2: Dual-Write (Ongoing)

Hook into your CRUD operations. When a product is updated, update the vector.

```typescript
async function updateProduct(id, data) {
  // 1. Update SQL (Source of Truth)
  await sql.update('products', data).where({ id });

  // 2. Update Vector (Search Index) - Fire and forget
  generateEmbedding(data.description).then(vector => {
    vectorDB.upsert({ id, values: vector });
  });
}
```

## Step 3: Frontend Switch

Replace the search API call.

```javascript
// Old
// fetch(`/api/search?q=${query}`)

// New
fetch(`/api/vector-search?q=${query}`)
```

## Zero-Downtime Migration

1.  Deploy Vector DB.
2.  Run Backfill.
3.  Enable Dual-Write.
4.  Switch Frontend to use Vector Search.
5.  (Optional) Keep Keyword Search as fallback.
