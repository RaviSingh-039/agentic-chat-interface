import dotenv from 'dotenv';
import { z } from 'zod';

dotenv.config();

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.coerce.number().default(3001),
  LOG_LEVEL: z.enum(['debug', 'info', 'warn', 'error']).default('info'),
  
  // LLM Provider Configuration
  DEFAULT_LLM_PROVIDER: z.enum([
    'openai',
    'anthropic',
    'google',
    'deepseek',
    'kimi',
    'lm-studio',
    'ollama'
  ]).default('openai'),
  
  // OpenAI
  OPENAI_API_KEY: z.string().optional(),
  OPENAI_BASE_URL: z.string().default('https://api.openai.com/v1'),
  
  // Anthropic (Claude)
  ANTHROPIC_API_KEY: z.string().optional(),
  ANTHROPIC_BASE_URL: z.string().default('https://api.anthropic.com'),
  
  // Google Gemini
  GOOGLE_API_KEY: z.string().optional(),
  GOOGLE_BASE_URL: z.string().default('https://generativelanguage.googleapis.com/v1beta'),
  
  // DeepSeek
  DEEPSEEK_API_KEY: z.string().optional(),
  DEEPSEEK_BASE_URL: z.string().default('https://api.deepseek.com'),
  
  // Kimi K2
  KIMI_API_KEY: z.string().optional(),
  KIMI_BASE_URL: z.string().default('https://api.moonshot.cn/v1'),
  
  // LM Studio (Local)
  LM_STUDIO_BASE_URL: z.string().default('http://localhost:1234/v1'),
  
  // Ollama (Local)
  OLLAMA_BASE_URL: z.string().default('http://localhost:11434'),
  
  // Agent Configuration
  MAX_LOOP_ITERATIONS: z.coerce.number().default(10),
  TOOL_TIMEOUT_MS: z.coerce.number().default(30000),
  ENABLE_STREAMING: z.enum(['true', 'false']).default('true'),
  
  // Database
  DATABASE_URL: z.string().optional(),
  
  // Web Search Tool
  SEARCH_API_KEY: z.string().optional(),
  
  // Code Execution
  ENABLE_CODE_EXECUTION: z.enum(['true', 'false']).default('false'),
  SANDBOX_TIMEOUT_MS: z.coerce.number().default(5000),
});

export const env = envSchema.parse(process.env);

export type Env = z.infer<typeof envSchema>;
