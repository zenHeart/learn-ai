# Use Case: AI Recommendations

**Scenario**: Netflix/Spotify style "Recommended for You".
**Traditional**: Collaborative Filtering (Matrix Factorization). Hard to implement.
**AI Way**: Vector Similarity.

## Concept: User Embeddings

1.  **Item Embedding**: Turn every movie into a vector (based on description/genre).
2.  **User History**: "User watched Matrix, Inception, Interstellar".
3.  **User Embedding**: Average the vectors of the movies they watched.
    `UserVector = (Matrix + Inception + Interstellar) / 3`

## Implementation

### 1. Update User Profile
Every time they "Like" an item:

```typescript
async function onLike(userId, movieId) {
  const movieVector = await getVector(movieId);
  const userVector = await getUserVector(userId);
  
  // Moving Average update
  const newVector = (userVector * 0.9) + (movieVector * 0.1);
  
  await saveUserVector(userId, newVector);
}
```

### 2. Generate Feed
Query the Vector DB using the **User Vector**.

```typescript
const recommendations = await pinecone.query({
  vector: userVector,
  topK: 10,
  filter: { id: { $nin: watchedMovieIds } } // Exclude watched
});
```

## Cold Start Problem
What if the user is new?
**Solution**: Ask 3 questions during onboarding. "What genres do you like?" -> Generate initial vector from that text.
