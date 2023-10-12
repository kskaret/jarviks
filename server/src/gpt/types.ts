export type ChatCompletionResponse = {
    id: string
    object: string
    created: number
    choices: Array<{
      index: number
      message: {
        role: string
        content: string
        function_call: {
            name: string,
            arguments: string
        }
      }
      finish_reason: string
    
    }>
    usage: {
      prompt_tokens: number
      completion_tokens: number
      total_tokens: number
    }
}

export type Message = {
    role: string
    content: string
}

export type FunctionDescription = {
    name: string
    description: string
    parameters: Parameters
}

export type Property = {
    type: 'string' | 'number' | 'object' | 'array' | 'boolean' | 'any'; // Adjust as needed
    description?: string;
    enum?: string[];
}

export type Parameters = {
    type: 'object';
    properties: {
        [key: string]: Property;
    } | {
        [key: string]: Parameters;
    };
    required?: string[];
};

export type GPTFunction = GPTFunctionMetadata & {
  func: (...args: any[]) => any
}

export type GPTFunctionMetadata = {
  name: string
  description: string
  parameters: Parameters
}

