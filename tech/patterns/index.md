# AI Engineering Patterns for Frontend Developers

As frontend engineers, we are used to design patterns like *Container/Presenter*, *Hooks*, or *MVC*. AI Engineering has its own set of patterns that act as the building blocks for intelligent applications.

## The 4 Core Patterns

### 1. The Prompt Chain (Sequential Processing)
**Analogy:** Like a Promise chain (`.then().then()`) in JavaScript.
**What:** Breaking a complex task into a sequence of smaller, simpler prompts.
**When to use:**
- Complex transformations (e.g., "Extract data" -> "Format as JSON" -> "Translate").
- Ensuring reliability by verifying step-by-step.
- **Example:** A "Code Reviewer" that first summarizes changes, then checks for bugs, then suggests improvements.

### 2. RAG (Retrieval-Augmented Generation)
**Analogy:** A user searching a database before answering a question.
**What:** Retrieving relevant data (from docs, DBs, APIs) and injecting it into the LLM's context window before asking it to generate an answer.
**When to use:**
- Answering questions about private/proprietary data.
- Bypassing the LLM's knowledge cutoff.
- Reducing hallucinations by grounding the model in facts.
- **Example:** Customer support bot, internal knowledge base search.

### 3. Structured Output (Type-Safe AI)
**Analogy:** TypeScript interfaces for API responses.
**What:** Forcing the LLM to return strictly formatted data (usually JSON) that matches a schema (e.g., Zod).
**When to use:**
- Integrating AI with existing software (function arguments, UI props).
- Data extraction (e.g., parsing resumes, receipts).
- **Example:** A "Receipt Scanner" that outputs `{ total: number, date: string, items: [] }` instead of free text.

### 4. Agents & Tools (Autonomous Execution)
**Analogy:** A background worker or state machine that can call API functions.
**What:** Giving the LLM access to "Tools" (functions) and allowing it to decide *which* tool to call and *when* to solve a problem.
**When to use:**
- Multi-step tasks requiring external actions (e.g., "Book a flight").
- Workflows where the path isn't linear.
- **Example:** A "Personal Assistant" that can check your calendar, send emails, and query weather APIs.

## "Reliable AI" Design Principles

Building production AI is about managing uncertainty.

1.  **Type Safety First:** Never trust raw text. Always validate AI output against a schema (Zod).
2.  **Fail Gracefully:** AI *will* fail. Implement retry logic and fallback UIs (e.g., "I couldn't generate that, try again?").
3.  **Evaluate & Iterate:** You cannot fix what you cannot measure. Use "Evals" (unit tests for AI) to track quality.
4.  **Human in the Loop:** For critical actions, always ask the user for confirmation before execution.

## The Frontend AI Tech Stack

| Layer | Technology | Purpose |
| :--- | :--- | :--- |
| **UI / Framework** | **Next.js / React** | The interface users interact with. |
| **Orchestration** | **Vercel AI SDK** / LangChain | Managing the flow of data between UI and LLM. |
| **Model (Brain)** | **OpenAI / Anthropic** | The intelligence engine. |
| **Context (Memory)** | **Pinecone / pgvector** | Long-term memory for RAG. |
| **Schema (Safety)** | **Zod** | Ensuring data integrity. |

## Next Steps
- **Learn Type-Safe AI:** [Structured Output Guide](/tech/structured-output) (Coming Soon)
- **Build a RAG App:** [RAG Tutorial](/examples/rag-chatbot)
- **Explore Agents:** [MCP Guide](/integration/protocols/mcp)
