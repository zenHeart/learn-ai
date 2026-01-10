# Example 05: Full Stack AI SaaS

A complete starting point for building a production AI application.

## Stack

- **Framework**: Next.js 14 (App Router)
- **Auth**: Clerk
- **Payments**: Stripe
- **Database**: Postgres (Prisma)
- **AI**: Vercel AI SDK + OpenAI

## Features

- 🔐 User Authentication
- 💳 Subscription Management (Stripe Webhooks)
- 🗄️ Database Schema for User/Chats
- 🛡️ API Route Protection

## Setup

1.  **Environment Variables**:
    ```
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=...
    CLERK_SECRET_KEY=...
    STRIPE_SECRET_KEY=...
    STRIPE_WEBHOOK_SECRET=...
    DATABASE_URL=...
    OPENAI_API_KEY=...
    ```

2.  **Database**:
    ```bash
    npx prisma push
    ```

3.  **Run**:
    ```bash
    npm run dev
    ```

## Key Files

- `prisma/schema.prisma`: Database definition.
- `app/api/webhooks/stripe/route.ts`: Handles subscription updates.
- `middleware.ts`: Protects routes using Clerk.
