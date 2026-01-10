# Example 02: RAG Search

A Retrieval Augmented Generation (RAG) example using Supabase pgvector.

## Features

- 📚 Document ingestion pipeline
- 🔍 Semantic Search
- 💬 Chat with your data
- 🔗 Source citations

## Setup

1.  **Supabase Setup**:
    - Create a new project.
    - Enable `vector` extension.
    - Create `documents` table with `embedding vector(1536)`.

2.  **Environment Variables**:
    ```
    OPENAI_API_KEY=sk-...
    NEXT_PUBLIC_SUPABASE_URL=...
    SUPABASE_SERVICE_ROLE_KEY=...
    ```

3.  **Run**:
    ```bash
    npm install
    npm run dev
    ```

## Key Files

- `scripts/ingest.ts`: Reads `docs/` folder and uploads embeddings.
- `app/api/chat/route.ts`: Performs vector similarity search and calls OpenAI.
