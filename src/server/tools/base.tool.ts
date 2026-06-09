import { ToolDefinition } from '../types';

export abstract class BaseTool {
  abstract name: string;
  abstract description: string;
  abstract schema: ToolDefinition['parameters'];

  abstract execute(params: Record<string, any>): Promise<string>;

  getToolDefinition(): ToolDefinition {
    return {
      name: this.name,
      description: this.description,
      parameters: this.schema,
    };
  }
}
