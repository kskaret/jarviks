# Server - J.A.R.V.I.K.S Backend

The server-side component of the J.A.R.V.I.K.S project. 
It provides API endpoints for the frontend and handles communication with the OpenAI APIs.

## Extending the chatbot
To add new functionality to the chatbot you need to perform the following steps:

1. **Define a New Function**: Create a new function based on the desired functionality.
2. **Describe the Function**: Add a description of that function in an array and export it. (this description must adhere to a format defined by OpenAI, the type GPTFunction tries to emulate this)
3. **Register the Function**: Incorporate the function description into the `FunctionRegistry`.
4. **Backend Integration**: Now, when GPT think it is wise, it will suggest using your function (and provide the input) to the backend. The backend, in turn, will execute it automatically.

### EXAMPLE step 1 and 2

`server/example/addTwoNumbers.ts`
```typescript
const addTwoNumbers = (input: {number1: number, number2: number}) => {
    const {number1, number2} = input;
    return number1 + number2;
};

export const exampleFunctions: GPTFunction[] = [
    {
        func: addTwoNumbers,
        name: addTwoNumbers.name,
        description: 'Returns the result of adding two numbers',
        parameters: {
            type:'object',
            properties: {
                number1: {
                    type: "number",
                },
                number2: {
                    type: "number",
                },
            },
            required: ['number1', 'number2']
        }
    }
];
```

### EXAMPLE step 3
`server/server.ts`
```typescript
const functionRegistry = new FunctionRegistry()
functionRegistry.registerFunctions(yrFunctions)
functionRegistry.registerFunctions(exampleFunctions)
```
