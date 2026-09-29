## 🚀 Features

- Gemini LLM API integration
- Prompt engineering with structured prompts
- System instructions for AI behavior
- Streaming AI responses
- Express.js backend
- React frontend
- Real-time response rendering
- Loading state while AI is generating
- Error handling
- Environment variable based API key configuration

## 🧠 AI Concepts Implemented

### LLM API
Integrated Google's Gemini API using the `@google/genai` SDK.

### Prompt Engineering
Uses structured prompts with:
- User question
- Requirements
- System instructions

### Streaming
AI responses are streamed from Gemini through the Express backend to the React frontend.

```text
React
  ↓
Express API
  ↓
Gemini
  ↓
Streaming chunks
  ↓
Express res.write()
  ↓
React ReadableStream
  ↓
Live response