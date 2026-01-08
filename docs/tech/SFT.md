# SFT (Supervised Fine-Tuning)

## What is Fine-Tuning?

**Supervised Fine-Tuning (SFT)** is the process of training an existing pre-trained model on your specific data to adapt it to your domain or task. It adjusts the model's parameters to specialize in your use case.

**The Core Idea**: Take a general-purpose LLM → Train it on your data → Get a specialized model

**Why Fine-Tuning**:
- Improve performance on domain-specific tasks
- Learn specialized terminology and patterns
- Reduce prompt engineering needs
- Better consistency in outputs

**Trade-off**: High cost and complexity vs better performance on specific tasks

## SFT vs RAG vs Prompt Engineering

| Aspect | Prompt Engineering | RAG | Fine-Tuning (SFT) |
|--------|-------------------|-----|-------------------|
| **Cost** | Very Low (free) | Low (inference + retrieval) | Very High (GPU training) |
| **Setup Time** | Minutes | Hours to days | Days to weeks |
| **Data Needed** | None (just prompts) | Documents for retrieval | 100s-1000s labeled examples |
| **Speed** | Fast | Medium (retrieval overhead) | Fast (after training) |
| **Updates** | Instant | Instant (update knowledge base) | Requires retraining |
| **Best For** | General tasks | Dynamic knowledge | Specialized domains |
| **Maintenance** | Easy | Medium | Hard |

**Frontend Engineer Recommendation**:
- Start with **Prompt Engineering**
- Add **RAG** when you need external knowledge
- Only use **SFT** when you've maxed out the other approaches

## When to Use Fine-Tuning

### ✅ Good Use Cases

1. **Specialized Domain Language**
   - Medical diagnosis (medical terminology)
   - Legal document analysis (legal jargon)
   - Scientific research (domain-specific knowledge)

2. **Consistent Output Format**
   - Always need specific JSON structure
   - Code generation in proprietary framework
   - Custom business logic patterns

3. **Style and Tone**
   - Brand-specific writing style
   - Consistent personality across responses
   - Cultural/regional adaptations

4. **Performance Optimization**
   - Latency-critical applications
   - High-volume queries (cost per request matters)
   - Need smaller model with specialized capability

### ❌ Bad Use Cases (Use RAG Instead)

1. **Frequently Changing Information**
   - Product catalogs
   - News and updates
   - Documentation

2. **Large Knowledge Bases**
   - Company wikis
   - Technical manuals
   - Historical data

3. **Limited Budget**
   - Startups without GPU access
   - Prototype/MVP stage
   - Low request volume

## The Fine-Tuning Process

### Step 1: Prepare Training Data

**Requirements**:
- Minimum: 50-100 examples (more is better)
- Recommended: 1,000-10,000 examples
- Format: Input-output pairs in JSON

**Example Training Data Format (OpenAI)**:

```json
{
  "messages": [
    {
      "role": "system",
      "content": "You are a customer support agent for Acme Corp."
    },
    {
      "role": "user",
      "content": "How do I reset my password?"
    },
    {
      "role": "assistant",
      "content": "To reset your password:\n1. Go to acme.com/reset\n2. Enter your email\n3. Click the link in your email\n4. Create a new password\n\nIf you need further assistance, contact support@acme.com"
    }
  ]
}
```

**Data Quality Checklist**:
- ✅ Diverse examples covering all scenarios
- ✅ Consistent format and style
- ✅ High-quality, accurate outputs
- ✅ Representative of real-world use
- ❌ No duplicate or near-duplicate examples
- ❌ No conflicting information

**Generate Training Data Script**:

```javascript
import { OpenAI } from 'openai';
import fs from 'fs';

const openai = new OpenAI();

async function generateTrainingData(topic, numExamples = 100) {
  const trainingData = [];

  for (let i = 0; i < numExamples; i++) {
    const response = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: `Generate a realistic customer support conversation about ${topic}. Return as JSON with "user" and "assistant" fields.`
        },
        {
          role: 'user',
          content: `Generate example ${i + 1}`
        }
      ],
      response_format: { type: 'json_object' }
    });

    const example = JSON.parse(response.choices[0].message.content);

    trainingData.push({
      messages: [
        {
          role: 'system',
          content: 'You are a helpful customer support agent.'
        },
        {
          role: 'user',
          content: example.user
        },
        {
          role: 'assistant',
          content: example.assistant
        }
      ]
    });

    console.log(`Generated ${i + 1}/${numExamples}`);
  }

  // Save to JSONL format
  const jsonl = trainingData.map(item => JSON.stringify(item)).join('\n');
  fs.writeFileSync('training_data.jsonl', jsonl);

  console.log('Training data saved to training_data.jsonl');
}

// Usage
await generateTrainingData('password resets', 100);
```

### Step 2: Upload Training Data

```javascript
import { OpenAI } from 'openai';
import fs from 'fs';

const openai = new OpenAI();

async function uploadTrainingFile(filePath) {
  const file = await openai.files.create({
    file: fs.createReadStream(filePath),
    purpose: 'fine-tune'
  });

  console.log('File uploaded:', file.id);
  return file.id;
}

const fileId = await uploadTrainingFile('training_data.jsonl');
```

### Step 3: Start Fine-Tuning Job

```javascript
async function startFineTuning(trainingFileId, model = 'gpt-3.5-turbo') {
  const fineTune = await openai.fineTuning.jobs.create({
    training_file: trainingFileId,
    model: model,
    hyperparameters: {
      n_epochs: 3, // Number of training passes
      batch_size: 4, // Adjust based on data size
      learning_rate_multiplier: 0.1 // Learning rate
    }
  });

  console.log('Fine-tuning job started:', fineTune.id);
  return fineTune.id;
}

const jobId = await startFineTuning(fileId);
```

### Step 4: Monitor Training

```javascript
async function monitorFineTuning(jobId) {
  let status = 'running';

  while (status === 'running' || status === 'pending') {
    const job = await openai.fineTuning.jobs.retrieve(jobId);
    status = job.status;

    console.log(`Status: ${status}`);

    if (status === 'succeeded') {
      console.log('Fine-tuning complete!');
      console.log('Fine-tuned model:', job.fine_tuned_model);
      return job.fine_tuned_model;
    }

    if (status === 'failed') {
      console.error('Fine-tuning failed:', job.error);
      throw new Error('Fine-tuning failed');
    }

    // Wait 60 seconds before checking again
    await new Promise(resolve => setTimeout(resolve, 60000));
  }
}

const modelId = await monitorFineTuning(jobId);
```

### Step 5: Use Fine-Tuned Model

```javascript
async function useFineTunedModel(modelId, userMessage) {
  const response = await openai.chat.completions.create({
    model: modelId, // Your fine-tuned model ID
    messages: [
      {
        role: 'system',
        content: 'You are a helpful customer support agent.'
      },
      {
        role: 'user',
        content: userMessage
      }
    ]
  });

  return response.choices[0].message.content;
}

const answer = await useFineTunedModel(
  'ft:gpt-3.5-turbo-0613:acme-corp::AbCdEfGh',
  'How do I reset my password?'
);
console.log(answer);
```

## Complete Fine-Tuning Workflow

```javascript
// complete-fine-tuning.js
import { OpenAI } from 'openai';
import fs from 'fs';

const openai = new OpenAI();

async function completeFineTuningWorkflow() {
  try {
    // 1. Prepare training data (already in training_data.jsonl)
    console.log('Step 1: Training data ready');

    // 2. Upload training file
    console.log('\nStep 2: Uploading training data...');
    const file = await openai.files.create({
      file: fs.createReadStream('training_data.jsonl'),
      purpose: 'fine-tune'
    });
    console.log('File uploaded:', file.id);

    // 3. Start fine-tuning
    console.log('\nStep 3: Starting fine-tuning job...');
    const fineTune = await openai.fineTuning.jobs.create({
      training_file: file.id,
      model: 'gpt-3.5-turbo',
      hyperparameters: {
        n_epochs: 3
      }
    });
    console.log('Job started:', fineTune.id);

    // 4. Monitor progress
    console.log('\nStep 4: Monitoring training...');
    let status = 'running';

    while (status === 'running' || status === 'pending') {
      const job = await openai.fineTuning.jobs.retrieve(fineTune.id);
      status = job.status;

      console.log(`Status: ${status} (${new Date().toLocaleTimeString()})`);

      if (status === 'succeeded') {
        console.log('\n✅ Fine-tuning complete!');
        console.log('Model ID:', job.fine_tuned_model);

        // 5. Test the model
        console.log('\nStep 5: Testing fine-tuned model...');
        const response = await openai.chat.completions.create({
          model: job.fine_tuned_model,
          messages: [
            { role: 'user', content: 'How do I reset my password?' }
          ]
        });

        console.log('\nTest Response:');
        console.log(response.choices[0].message.content);

        return job.fine_tuned_model;
      }

      if (status === 'failed') {
        console.error('❌ Fine-tuning failed');
        throw new Error('Training failed');
      }

      await new Promise(resolve => setTimeout(resolve, 60000));
    }
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}

// Run the workflow
completeFineTuningWorkflow();
```

## Cost Estimation

### OpenAI Fine-Tuning Pricing (GPT-3.5)

```javascript
function estimateFineTuningCost(numExamples, avgTokensPerExample = 200) {
  const trainingTokens = numExamples * avgTokensPerExample;

  // Training cost: $0.008 per 1K tokens
  const trainingCost = (trainingTokens / 1000) * 0.008;

  // Inference cost (per 1M tokens): $0.012 input, $0.016 output
  const inferenceInputCost = 0.012; // per 1K
  const inferenceOutputCost = 0.016; // per 1K

  console.log('Cost Estimation:');
  console.log(`Training: $${trainingCost.toFixed(2)}`);
  console.log(`Inference (per 1K requests): ~$${((inferenceInputCost + inferenceOutputCost) * 200 / 1000).toFixed(2)}`);

  return {
    training: trainingCost,
    inferencePerRequest: (inferenceInputCost + inferenceOutputCost) * 200 / 1000
  };
}

// Example: 1000 training examples
estimateFineTuningCost(1000);
// Training: ~$1.60
// Inference: ~$0.0056 per request
```

## Fine-Tuning vs RAG: Decision Matrix

**Use Fine-Tuning when**:
- Need consistent specialized terminology
- Stable knowledge that rarely changes
- Latency is critical (< 100ms response time)
- High request volume (>10M requests/month)
- Have budget for GPU training
- Can afford retraining cycles

**Use RAG when**:
- Knowledge changes frequently
- Need to cite sources
- Limited training data
- Cost-sensitive (startup budget)
- Rapid iteration needed
- Transparency required

**Use Both when**:
- Specialized domain + dynamic knowledge
- Example: Medical diagnosis (SFT for terminology) + latest research (RAG)

## Best Practices

1. **Data Quality > Quantity**: 100 great examples better than 1000 mediocre ones
2. **Validate Before Training**: Test examples manually
3. **Start Small**: Try 50-100 examples first, scale if needed
4. **Version Control**: Track training data and model versions
5. **A/B Test**: Compare fine-tuned vs base model
6. **Monitor Performance**: Track accuracy, latency, cost
7. **Regular Retraining**: Update model as patterns change
8. **Document Everything**: Training params, data sources, performance metrics

## Alternatives to Fine-Tuning

### 1. Few-Shot Learning

Instead of fine-tuning, provide examples in the prompt:

```javascript
const prompt = `You are a customer support agent. Here are examples:

Example 1:
User: How do I reset my password?
Agent: Go to acme.com/reset and follow the instructions.

Example 2:
User: Where is my order?
Agent: Check your email for the tracking link.

Now answer:
User: ${userQuestion}`;
```

### 2. Prompt Engineering

Carefully crafted prompts can often replace fine-tuning:

```javascript
const systemPrompt = `You are an expert customer support agent for Acme Corp.

Guidelines:
- Be concise and friendly
- Provide step-by-step instructions
- Always include relevant links
- Escalate complex issues to support@acme.com

Product Knowledge:
- Password reset: acme.com/reset
- Order tracking: acme.com/orders
- Returns: acme.com/returns (30-day policy)`;
```

### 3. RAG with Prompt Templates

Combine retrieval with structured prompts:

```javascript
const answer = await ragQuery(userQuestion, {
  systemPrompt: 'You are a customer support agent. Use the provided documentation to answer accurately.',
  temperature: 0.3 // Low temperature for consistency
});
```

## Next Steps

- **Evaluate if you really need SFT** (try RAG first)
- **Collect high-quality training data** (100+ examples)
- **Start with OpenAI's fine-tuning API** (easiest)
- **A/B test** against base model + RAG
- **Monitor costs** and iterate

Fine-tuning is powerful but complex. Exhaust simpler approaches (Prompt Engineering, RAG) before investing in SFT. When you do fine-tune, start small and scale methodically.
