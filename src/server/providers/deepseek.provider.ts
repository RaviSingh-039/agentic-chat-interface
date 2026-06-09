import axios, { AxiosInstance } from 'axios';
import { BaseLLMProvider, LLMProviderConfig, LLMResponse } from './base.provider';
import { Message, ToolDefinition } from '../types';
import logger from '../config/logger';

export class DeepSeekProvider extends BaseLLMProvider {
  private client: AxiosInstance;

  constructor(config: LLMProviderConfig) {
    super(config, 'deepseek');
    this.client = axios.create({
      baseURL: config.baseUrl,
      headers: {
        'Authorization': `Bearer ${config.apiKey}`,
        'Content-Type': 'application/json',
      },
    });
  }

  async generateResponse(
    messages: Message[],
    tools?: ToolDefinition[],
    streaming: boolean = false
  ): Promise<LLMResponse> {
    try {
      const payload: any = {
        model: this.config.model,
        messages: messages.map((msg) => ({
          role: msg.role,
          content: msg.content,
        })),
        temperature: 0.7,
      };

      if (tools && tools.length > 0) {
        payload.tools = tools.map((tool) => ({
          type: 'function',
          function: {
            name: tool.name,
            description: tool.description,
            parameters: tool.parameters,
          },
        }));
      }

      const response = await this.client.post('/chat/completions', payload);

      const data = response.data.choices[0];
      const toolCalls = data.message.tool_calls
        ? data.message.tool_calls.map((tc: any) => ({
            id: tc.id,
            name: tc.function.name,
            arguments: JSON.parse(tc.function.arguments),
          }))
        : undefined;

      return {
        content: data.message.content || '',
        toolCalls,
        stopReason: data.finish_reason === 'tool_calls' ? 'tool_calls' : 'end_turn',
        usage: {
          inputTokens: response.data.usage.prompt_tokens,
          outputTokens: response.data.usage.completion_tokens,
        },
      };
    } catch (error) {
      logger.error('DeepSeek API error', error);
      throw new Error(`DeepSeek API error: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  async validateConfig(): Promise<boolean> {
    try {
      if (!this.validateApiKey()) return false;
      const response = await this.client.post('/chat/completions', {
        model: this.config.model,
        messages: [{ role: 'user', content: 'test' }],
        max_tokens: 1,
      });
      return !!response.data.choices;
    } catch {
      return false;
    }
  }

  async getAvailableModels(): Promise<string[]> {
    return ['deepseek-coder', 'deepseek-chat'];
  }
}
