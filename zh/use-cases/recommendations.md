# 用例：AI 推荐

**场景**: Netflix/Spotify 风格的“为你推荐”。
**传统方式**: 协同过滤 (矩阵分解)。难以实现。
**AI 方式**: 向量相似度。

## 概念：用户 Embeddings

1.  **项目 Embedding**: 将每部电影转换为向量（基于描述/类型）。
2.  **用户历史**: "用户看了 Matrix, Inception, Interstellar"。
3.  **用户 Embedding**: 平均他们观看的电影的向量。
    `UserVector = (Matrix + Inception + Interstellar) / 3`

## 实现

### 1. 更新用户画像
每次他们“点赞”一个项目：

```typescript
async function onLike(userId, movieId) {
  const movieVector = await getVector(movieId);
  const userVector = await getUserVector(userId);
  
  // 移动平均更新
  const newVector = (userVector * 0.9) + (movieVector * 0.1);
  
  await saveUserVector(userId, newVector);
}
```

### 2. 生成 Feed 流
使用 **User Vector** 查询向量数据库。

```typescript
const recommendations = await pinecone.query({
  vector: userVector,
  topK: 10,
  filter: { id: { $nin: watchedMovieIds } } // 排除已观看的
});
```

## 冷启动问题
如果用户是新用户怎么办？
**解决方案**: 在入职期间问 3 个问题。“你喜欢什么类型？”-> 从该文本生成初始向量。