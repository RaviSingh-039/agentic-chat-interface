import { LLMModel, LLMProvider } from '../types';

export const MODEL_REGISTRY: Record<LLMProvider, LLMModel[]> = {
  openai: [
    {
      id: 'gpt-4-turbo',
      name: 'GPT-4 Turbo',
      provider: 'openai',
      description: 'Most capable model. Best for complex tasks requiring reasoning.',
      contextWindow: 128000,
      costPer1kTokens: { input: 0.01, output: 0.03 },
      capabilities: {
        chat: true,
        streaming: true,
        vision: true,
        functionCalling: true,
      },
    },
    {
      id: 'gpt-4',
      name: 'GPT-4',
      provider: 'openai',
      description: 'Powerful model for complex tasks.',
      contextWindow: 8192,
      costPer1kTokens: { input: 0.03, output: 0.06 },
      capabilities: {
        chat: true,
        streaming: true,
        vision: false,
        functionCalling: true,
      },
    },
    {
      id: 'gpt-3.5-turbo',
      name: 'GPT-3.5 Turbo',
      provider: 'openai',
      description: 'Fast and efficient model.',
      contextWindow: 4096,
      costPer1kTokens: { input: 0.0005, output: 0.0015 },
      capabilities: {
        chat: true,
        streaming: true,
        vision: false,
        functionCalling: true,
      },
    },
  ],
  anthropic: [
    {
      id: 'claude-3-opus-20240229',
      name: 'Claude 3 Opus',
      provider: 'anthropic',
      description: 'Most powerful Claude model. Best for complex reasoning.',
      contextWindow: 200000,
      costPer1kTokens: { input: 0.015, output: 0.075 },
      capabilities: {
        chat: true,
        streaming: true,
        vision: true,
        functionCalling: true,
      },
    },
    {
      id: 'claude-3-sonnet-20240229',
      name: 'Claude 3 Sonnet',
      provider: 'anthropic',
      description: 'Balanced speed and intelligence.',
      contextWindow: 200000,
      costPer1kTokens: { input: 0.003, output: 0.015 },
      capabilities: {
        chat: true,
        streaming: true,
        vision: true,
        functionCalling: true,
      },
    },
    {
      id: 'claude-3-haiku-20240307',
      name: 'Claude 3 Haiku',
      provider: 'anthropic',
      description: 'Fastest Claude model.',
      contextWindow: 200000,
      costPer1kTokens: { input: 0.00025, output: 0.00125 },
      capabilities: {
        chat: true,
        streaming: true,
        vision: true,
        functionCalling: true,
      },
    },
  ],
  google: [
    {
      id: 'gemini-1.5-pro',
      name: 'Gemini 1.5 Pro',
      provider: 'google',
      description: 'Latest Gemini model with long context understanding.',
      contextWindow: 1000000,
      costPer1kTokens: { input: 0.00075, output: 0.003 },
      capabilities: {
        chat: true,
        streaming: true,
        vision: true,
        functionCalling: true,
      },
    },
    {
      id: 'gemini-1.5-flash',
      name: 'Gemini 1.5 Flash',
      provider: 'google',
      description: 'Fast and efficient Gemini model.',
      contextWindow: 1000000,
      costPer1kTokens: { input: 0.000075, output: 0.0003 },
      capabilities: {
        chat: true,
        streaming: true,
        vision: true,
        functionCalling: true,
      },
    },
    {
      id: 'gemini-pro',
      name: 'Gemini Pro',
      provider: 'google',
      description: 'Previous generation Gemini model.',
      contextWindow: 32000,
      costPer1kTokens: { input: 0.0005, output: 0.0015 },
      capabilities: {
        chat: true,
        streaming: true,
        vision: false,
        functionCalling: true,
      },
    },
  ],
  deepseek: [
    {
      id: 'deepseek-coder',
      name: 'DeepSeek Coder',
      provider: 'deepseek',
      description: 'Specialized in code generation and understanding.',
      contextWindow: 4096,
      costPer1kTokens: { input: 0.00014, output: 0.00014 },
      capabilities: {
        chat: true,
        streaming: true,
        vision: false,
        functionCalling: true,
      },
    },
    {
      id: 'deepseek-chat',
      name: 'DeepSeek Chat',
      provider: 'deepseek',
      description: 'General purpose conversational model.',
      contextWindow: 4096,
      costPer1kTokens: { input: 0.00014, output: 0.00014 },
      capabilities: {
        chat: true,
        streaming: true,
        vision: false,
        functionCalling: true,
      },
    },
  ],
  kimi: [
    {
      id: 'moonshot-v1-8k',
      name: 'Kimi K2 (8K Context)',
      provider: 'kimi',
      description: 'Moonshot Kimi K2 model with 8K context window.',
      contextWindow: 8000,
      costPer1kTokens: { input: 0.002, output: 0.006 },
      capabilities: {
        chat: true,
        streaming: true,
        vision: false,
        functionCalling: true,
      },
    },
    {
      id: 'moonshot-v1-32k',
      name: 'Kimi K2 (32K Context)',
      provider: 'kimi',
      description: 'Moonshot Kimi K2 model with 32K context window.',
      contextWindow: 32000,
      costPer1kTokens: { input: 0.006, output: 0.018 },
      capabilities: {
        chat: true,
        streaming: true,
        vision: false,
        functionCalling: true,
      },
    },
    {
      id: 'moonshot-v1-128k',
      name: 'Kimi K2 (128K Context)',
      provider: 'kimi',
      description: 'Moonshot Kimi K2 model with 128K context window.',
      contextWindow: 128000,
      costPer1kTokens: { input: 0.02, output: 0.06 },
      capabilities: {
        chat: true,
        streaming: true,
        vision: false,
        functionCalling: true,
      },
    },
  ],
  'lm-studio': [],  // Dynamically populated from LM Studio local server
  'ollama': [],       // Dynamically populated from Ollama local server
};

export function getModelsByProvider(provider: LLMProvider): LLMModel[] {
  return MODEL_REGISTRY[provider] || [];
}

export function getAllModels(): LLMModel[] {
  return Object.values(MODEL_REGISTRY).flat();
}

export function getModelById(id: string): LLMModel | undefined {
  return getAllModels().find((model) => model.id === id);
}

export function addLocalModel(provider: 'lm-studio' | 'ollama', model: LLMModel): void {
  if (!MODEL_REGISTRY[provider]) {
    MODEL_REGISTRY[provider] = [];
  }
  const exists = MODEL_REGISTRY[provider].some((m) => m.id === model.id);
  if (!exists) {
    MODEL_REGISTRY[provider].push(model);
  }
}

export function removeLocalModel(provider: 'lm-studio' | 'ollama', modelId: string): void {
  if (MODEL_REGISTRY[provider]) {
    MODEL_REGISTRY[provider] = MODEL_REGISTRY[provider].filter((m) => m.id !== modelId);
  }
}

export function updateModelRegistry(provider: 'lm-studio' | 'ollama', models: LLMModel[]): void {
  MODEL_REGISTRY[provider] = models;
}
