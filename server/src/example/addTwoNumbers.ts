import { GPTFunction } from "../gpt/types"

const addTwoNumbers = (input: {number1: number, number2: number}) => {
    const {number1, number2} = input
    return number1 + number2
}

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
]