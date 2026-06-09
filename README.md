# Agentic Chat Interface

A production-grade agentic chat interface with IDE-style UI, end-to-end markdown support, and full agentic workflow capabilities.

## Features

✨ **Core Features**
- 🤖 **Agentic Workflow Engine** - Complete agent loop with tool calling and looping
- 💬 **IDE-Style Chat Interface** - VS Code-inspired interface for professional UX
- 📝 **Advanced Markdown Support** - Full markdown rendering with syntax highlighting
- ⚙️ **LLM Provider System** - Support for multiple LLM providers (OpenAI, Anthropic, etc.)
- 🔧 **Tool Registry** - Extensible tool system with MVP tools included
- 🔄 **Streaming Responses** - Real-time message streaming
- 🎯 **Settings Management** - Configure LLM APIs and agent parameters

## Project Structure

```
agentic-chat-interface/
├── src/
│   ├── server/
│   │   ├── index.ts                 # Express server entry point
│   │   ├── config/
│   │   │   ├── env.ts              # Environment configuration
│   │   │   └── logger.ts           # Winston logger setup
│   │   ├── providers/
│   │   │   ├── base.provider.ts    # Base LLM provider class
│   │   │   ├── openai.provider.ts  # OpenAI implementation
│   │   │   └── anthropic.provider.ts # Anthropic implementation
│   │   ├── tools/
│   │   │   ├── base.tool.ts        # Base tool class
│   │   │   ├── registry.ts         # Tool registry
│   │   │   ├── mvp-tools/
│   │   │   │   ├── web-search.tool.ts
│   │   │   │   ├── calculator.tool.ts
│   │   │   │   └── file-reader.tool.ts
│   │   ├── agent/
│   │   │   ├── engine.ts           # Agentic loop engine
│   │   │   ├── executor.ts         # Tool executor
│   │   │   └── types.ts            # Agent types
│   │   ├── api/
│   │   │   ├── routes/
│   │   │   │   ├── chat.routes.ts
│   │   │   │   ├── settings.routes.ts
│   │   │   │   └── tools.routes.ts
│   │   │   └── middleware/
│   │   │       └── error.middleware.ts
│   │   └── utils/
│   │       ├── validators.ts
│   │       └── helpers.ts
│   ├── client/
│   │   ├── src/
│   │   │   ├── index.tsx
│   │   │   ├── App.tsx
│   │   │   ├── components/
│   │   │   │   ├── ChatInterface/
│   │   │   │   ├── MessageDisplay/
│   │   │   │   ├── Settings/
│   │   │   │   └── MarkdownRenderer/
│   │   │   ├── hooks/
│   │   │   ├── services/
│   │   │   ├── types/
│   │   │   ├── styles/
│   │   │   └── context/
│   │   └── package.json
├── docker/
│   ├── Dockerfile
│   └── docker-compose.yml
├── tests/
│   ├── unit/
│   └── integration/
├── package.json
├── tsconfig.json
└── README.md
```

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn
- Docker (optional)

### Installation

1. Clone the repository
```bash
git clone https://github.com/RaviSingh-039/agentic-chat-interface.git
cd agentic-chat-interface
```

2. Install dependencies
```bash
npm install
cd client && npm install && cd ..
```

3. Configure environment
```bash
cp .env.example .env
# Edit .env with your LLM API keys
```

4. Start development servers
```bash
npm run dev
```

The application will be available at:
- Frontend: http://localhost:5173
- Backend API: http://localhost:3001

## Usage

### Starting a Chat Session

```bash
POST /api/chat/conversation
Content-Type: application/json

{
  "message": "What's the weather like today?",
  "conversationId": "optional-id"
}
```

### Configuring LLM Provider

1. Open Settings in the UI
2. Select your preferred LLM provider
3. Enter your API key
4. Save settings

### Adding Custom Tools

1. Create a new tool class extending `BaseTool`
2. Register in the tool registry
3. Define schema and execution logic
4. Restart the agent

## Architecture

### Agentic Workflow

```
User Input
    ↓
LLM Processing (with tool definitions)
    ↓
Tool Call Detection
    ↓
Tool Execution
    ↓
Result Processing
    ↓
Loop Decision (Continue/Stop)
    ↓
User Response
```

## API Documentation

### Chat Endpoints

#### POST `/api/chat/conversation`
Create or continue a conversation with agentic workflow

**Request:**
```json
{
  "message": "user message",
  "conversationId": "optional-uuid",
  "systemPrompt": "optional-custom-system-prompt"
}
```

**Response:**
```json
{
  "conversationId": "uuid",
  "messages": [
    {
      "role": "user",
      "content": "user message",
      "timestamp": "2024-01-01T00:00:00Z"
    },
    {
      "role": "assistant",
      "content": "assistant response",
      "toolCalls": [],
      "timestamp": "2024-01-01T00:00:00Z"
    }
  ],
  "agentLoops": 3
}
```

#### GET `/api/chat/history/:conversationId`
Retrieve conversation history

#### POST `/api/tools/execute`
Execute a specific tool (admin only)

### Settings Endpoints

#### GET `/api/settings/provider`
Get current LLM provider configuration

#### POST `/api/settings/provider`
Update LLM provider

**Request:**
```json
{
  "provider": "openai",
  "apiKey": "sk-...",
  "model": "gpt-4-turbo-preview"
}
```

#### GET `/api/settings/available-providers`
List available LLM providers

## Development

### Running Tests
```bash
npm test
```

### Type Checking
```bash
npm run type-check
```

### Building for Production
```bash
npm run build
npm start
```

### Docker Deployment
```bash
docker-compose up -d
```

## Configuration

### Environment Variables

- `NODE_ENV` - Development or production
- `PORT` - Server port (default: 3001)
- `OPENAI_API_KEY` - OpenAI API key
- `ANTHROPIC_API_KEY` - Anthropic API key
- `DEFAULT_LLM_PROVIDER` - Default provider (openai/anthropic)
- `MAX_LOOP_ITERATIONS` - Max agent loops (default: 10)
- `TOOL_TIMEOUT_MS` - Tool execution timeout

## MVP Tools

1. **Web Search** - Search the web using a search API
2. **Calculator** - Perform mathematical calculations
3. **File Reader** - Read and analyze file contents
4. **JSON Parser** - Parse and validate JSON
5. **Text Processor** - Text transformation and analysis

## Extensibility

### Adding a New Tool

```typescript
// src/server/tools/mvp-tools/my-tool.ts
import { BaseTool } from '../base.tool';

export class MyTool extends BaseTool {
  name = 'my_tool';
  description = 'Description of my tool';

  schema = {
    type: 'object',
    properties: {
      // Define parameters
    }
  };

  async execute(params: any): Promise<string> {
    // Implement tool logic
    return 'result';
  }
}
```

### Adding a New LLM Provider

```typescript
// src/server/providers/my-provider.ts
import { BaseLLMProvider } from './base.provider';

export class MyProvider extends BaseLLMProvider {
  async generateResponse(messages, tools) {
    // Implement provider logic
  }
}
```

## Performance Considerations

- **Streaming** - Responses stream by default for better UX
- **Tool Caching** - Tool results cached within a conversation
- **Agent Loop Limits** - Max iterations prevent infinite loops
- **Timeout Protection** - Tools have execution timeouts

## Security

- API keys stored securely in environment variables
- Input validation on all endpoints
- Rate limiting on chat endpoints
- CORS configured for frontend

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Write/update tests
5. Submit a pull request

## License

MIT

## Support

For issues and questions, please open an issue on GitHub.

## Roadmap

- [ ] Database persistence for conversations
- [ ] Multi-model support within single agent
- [ ] Advanced agent strategies (ReAct, Chain-of-Thought)
- [ ] File upload and processing
- [ ] Team collaboration features
- [ ] Analytics and monitoring dashboard
- [ ] Custom domain support
- [ ] Advanced tool marketplace

---

**Built with ❤️ for developers who need intelligent, extensible chat systems**
