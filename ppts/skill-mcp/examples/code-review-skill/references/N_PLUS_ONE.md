# N+1 查询识别清单（按 Tier 3 按需加载）

## 高危模式

### 1. 循环里查 ORM

```ts
// ❌ 1 + N
const orders = await Order.findAll()
for (const o of orders) {
  o.user = await User.findById(o.userId)  // N 次查询
}

// ✅ 批量 + Map
const orders = await Order.findAll()
const userIds = [...new Set(orders.map(o => o.userId))]
const users = await User.findAll({ where: { id: userIds } })
const map = new Map(users.map(u => [u.id, u]))
orders.forEach(o => { o.user = map.get(o.userId) })
```

### 2. for-await 串行

```ts
// ❌ 串行 N 次
for (const id of ids) {
  await fetchDetail(id)
}

// ✅ 并行
await Promise.all(ids.map(id => fetchDetail(id)))
```

### 3. 关联查询缺失 include

```ts
// ❌ 触发 N+1
const posts = await Post.findAll()
for (const p of posts) {
  p.author = await p.getAuthor()  // 每个 Post 一次查询
}

// ✅ eager loading
const posts = await Post.findAll({ include: [User] })
```

## 检测启发式

- `for` / `forEach` / `map` 里有 `await` + 数据库 / API 调用
- ORM 关联属性访问触发了 lazy load
- 同一类型对象在循环里被反复加载

## 例外

- 循环数 ≤ 5（如分页 size）可放宽
- 显式注释 `// intentional sequential` 表明有依赖关系
