# SQL 注入识别清单（按 Tier 3 按需加载）

## 高危模式

### 1. 字符串拼接

```ts
// ❌ 危险
const sql = `SELECT * FROM users WHERE id = ${userId}`
db.query(sql)

// ✅ 参数化
db.query('SELECT * FROM users WHERE id = ?', [userId])
```

### 2. 模板字符串

```python
# ❌ 危险
cursor.execute(f"SELECT * FROM users WHERE name = '{name}'")

# ✅ 参数化
cursor.execute("SELECT * FROM users WHERE name = %s", (name,))
```

### 3. ORM 原生查询拼接

```ts
// ❌ 危险（Sequelize）
sequelize.query(`SELECT * FROM users WHERE email = '${email}'`)

// ✅ replacements
sequelize.query('SELECT * FROM users WHERE email = :email', {
  replacements: { email },
})
```

### 4. 动态表名 / 列名

```ts
// ❌ 危险（参数化不能用于标识符）
db.query(`SELECT * FROM ${tableName}`)

// ✅ 白名单校验
const ALLOWED = new Set(['users', 'orders'])
if (!ALLOWED.has(tableName)) throw new Error('invalid table')
db.query(`SELECT * FROM ${tableName}`)
```

## 检测启发式

- 关键字：`query` / `execute` / `raw` / `$queryRaw` 附近有字符串拼接
- 模板字符串里直接插入用户输入
- `eval` / `Function` 构造 SQL

## 例外

- 测试代码使用 mock 数据可放宽
- 内部管理后台 + 强 RBAC 可放宽至 P1
