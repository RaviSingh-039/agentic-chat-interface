import { Message, ToolDefinition, LLMProvider } from '../types';

export interface LLMProviderConfig {
  apiKey?: string;
  baseUrl: string;
  model: string;
}

export interface LLMResponse {
  content: string;
  toolCalls?: Array<{
    id: string;
    name: string;
    arguments: Record<string, any>;
  }>;
  stopReason: 'end_turn' | 'tool_calls' | 'max_tokens';
  usage: {
    inputTokens: number;
    outputTokens: number;
  };
}

export abstract class BaseLLMProvider {
  protected config: LLMProviderConfig;
  protected provider: LLMProvider;

  constructor(config: LLMProviderConfig, provider: LLMProvider) {
    this.config = config;
    this.provider = provider;
  }

  abstract generateResponse(
    messages: Message[],
    tools?: ToolDefinition[],
    streaming?: boolean
  ): Promise<LLMResponse>;

  abstract validateConfig(): boolean;

  abstract getAvailableModels(): Promise<string[]>;

  protected validateApiKey(): boolean {
    return !!this.config.apiKey || this.provider === 'lm-studio' || this.provider === 'ollama';
  }

  protected createToolDefinitions(tools?: ToolDefinition[]) {
    if (!tools || tools.length === 0) return undefined;
    return tools;
  }
}
