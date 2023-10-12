import 'reflect-metadata';
import { FunctionRegistry } from '../../src/gpt/functionRegistry';
import { hueFunctions } from '../../src/hue/hue';

describe('API Function Registration', () => {
  it.only('should register a function with correct metadata', () => {
    const functionRegistry = new FunctionRegistry()
    functionRegistry.registerFunctions(hueFunctions)
    const registeredFunction = functionRegistry.getRequestedFuntion('getInfoAboutAllRooms')
    console.log(registeredFunction)
    expect(registeredFunction).toBeDefined()
    expect(registeredFunction!.name).toBe('getInfoAboutAllRooms');
  });
});
