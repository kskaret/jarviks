import { GPTFunction, GPTFunctionMetadata } from './types';

export class FunctionRegistry {
  private apiFunctions: Record<string, GPTFunction> = {};

  registerFunctions = (functions: GPTFunction[]) => {
    functions.forEach(f => {
      const functionAlreadyRegistered = f.name in this.apiFunctions
      if(functionAlreadyRegistered) {
        return
      }
      this.apiFunctions[f.name] = {
          name: f.name,
          description: f.description,
          parameters: f.parameters,
          func: f.func
      }
    })
  }

  getOPENAIReadyFunctions = (): GPTFunctionMetadata[] => {
    // We are just returning the metadata, not the function itself
    // GPT only uses the metadata
    return Object.values(this.apiFunctions).map(gptFunction => {
      const { func, ...OPENAIobject } = gptFunction;
      return OPENAIobject
    })
  }

  getRequestedFuntion = (functionName: string): GPTFunction | undefined => {
    if(functionName in this.apiFunctions) {
      return this.apiFunctions[functionName]
    }
    return undefined
  }
}