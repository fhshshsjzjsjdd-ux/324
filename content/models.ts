export type Filter = "all" | "flagship" | "fast" | "open";

export type Model = {
  name: string;
  id: string;
  provider: string;
  color: string;
  context: string;
  /** USD за 1 млн входных токенов */
  input: number;
  /** USD за 1 млн выходных токенов */
  output: number;
  tags: Exclude<Filter, "all">[];
};

export const filters: { id: Filter; label: string }[] = [
  { id: "all", label: "Все" },
  { id: "flagship", label: "Флагманы" },
  { id: "fast", label: "Быстрые и недорогие" },
  { id: "open", label: "Открытые веса" },
];

// Витринные данные для лендинга. В проде подтягивайте модели и цены из своего API.
export const models: Model[] = [
  { name: "Claude Sonnet 4.5", id: "anthropic/claude-sonnet-4.5", provider: "Anthropic", color: "#d97757", context: "200K", input: 3, output: 15, tags: ["flagship"] },
  { name: "GPT-5", id: "openai/gpt-5", provider: "OpenAI", color: "#111111", context: "400K", input: 1.25, output: 10, tags: ["flagship"] },
  { name: "Gemini 2.5 Pro", id: "google/gemini-2.5-pro", provider: "Google", color: "#4f7ff0", context: "1M", input: 1.25, output: 10, tags: ["flagship"] },
  { name: "DeepSeek V3.2", id: "deepseek/deepseek-v3.2", provider: "DeepSeek", color: "#4d6bfe", context: "128K", input: 0.28, output: 0.42, tags: ["open", "fast"] },
  { name: "Claude Haiku 4.5", id: "anthropic/claude-haiku-4.5", provider: "Anthropic", color: "#d97757", context: "200K", input: 1, output: 5, tags: ["fast"] },
  { name: "GPT-5 mini", id: "openai/gpt-5-mini", provider: "OpenAI", color: "#111111", context: "400K", input: 0.25, output: 2, tags: ["fast"] },
  { name: "Gemini 2.5 Flash", id: "google/gemini-2.5-flash", provider: "Google", color: "#4f7ff0", context: "1M", input: 0.3, output: 2.5, tags: ["fast"] },
  { name: "Grok 4", id: "x-ai/grok-4", provider: "xAI", color: "#3b3b3b", context: "256K", input: 3, output: 15, tags: ["flagship"] },
  { name: "Llama 4 Maverick", id: "meta-llama/llama-4-maverick", provider: "Meta", color: "#0866ff", context: "1M", input: 0.15, output: 0.6, tags: ["open", "fast"] },
  { name: "Kimi K2", id: "moonshotai/kimi-k2", provider: "Moonshot AI", color: "#6a5acd", context: "128K", input: 0.6, output: 2.5, tags: ["open"] },
  { name: "Mistral Medium 3", id: "mistralai/mistral-medium-3", provider: "Mistral", color: "#fa520f", context: "128K", input: 0.4, output: 2, tags: ["fast"] },
];
