# AI Cost Calculator

Calculating AI costs is complex because of token ratios.

## The Golden Formula

$$
\text{Total Cost} = (\text{Users} \times \text{Reqs/User}) \times [(\text{Input Tokens} \times P_{in}) + (\text{Output Tokens} \times P_{out})]
$$

## Example Scenario: RAG Chatbot

- **Users**: 1,000 daily active users.
- **Requests**: 10 messages per user.
- **Input**: 2,000 tokens (Context from PDF) = $5.00 / 1M tokens.
- **Output**: 500 tokens (Answer) = $15.00 / 1M tokens.

**Daily Cost**:
1.  Requests = 10,000
2.  Input Cost = 10k * (2000/1M * $5) = $100
3.  Output Cost = 10k * (500/1M * $15) = $75
4.  **Total = $175 / day** ($5,250 / month)

## ROI Analysis (Return on Investment)

Is it worth it?

**Support Bot Example**:
- Cost: $5,250 / month.
- Human Agent: $4,000 / month.
- If the bot replaces **2 human agents**, you save $2,750 / month.

## Interactive Calculator

Build your own calculator in a spreadsheet:

| Variable | Value |
| :--- | :--- |
| Daily Active Users | 1000 |
| Avg Requests / User | 10 |
| Avg Context Length | 2000 |
| Avg Response Length | 500 |
| **Projected Cost** | **$175.00** |

## Model Price Comparison (Estimates)

| Model | Input ($/1M) | Output ($/1M) |
| :--- | :--- | :--- |
| GPT-4o | $5.00 | $15.00 |
| GPT-4o-mini | $0.15 | $0.60 |
| Claude 3.5 Sonnet | $3.00 | $15.00 |
| Gemini 1.5 Flash | $0.35 | $1.05 |
