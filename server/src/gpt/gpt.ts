import axios from 'axios'
import FormData from 'form-data'
import * as fs from 'fs';
import { ChatCompletionResponse, GPTFunction, Message } from './types'
import _ from 'lodash'
import { FunctionRegistry } from './functionRegistry'

const baseContext: Message[] = [
  {
    role: "system",
    content: "Du er en AI assistent. Svarene dine vil være korte, presise og høflige"
  },
  {
    role: "system",
    content: "Gi en hyggelig velkomstmelding til din første bruker"
  }
]

export const transcribeAudio = async (openAIKey: string, filePath: string, model: string): Promise<any> => {
  // Create a new FormData instance
  const form = new FormData()

  // Add file and model to the form
  form.append('file', fs.createReadStream(filePath))
  form.append('model', model)
  form.append('language', 'no')

  // Make the request to the OpenAI API
  try {
    
    const response = await axios.post('https://api.openai.com/v1/audio/transcriptions', form, {
      headers: {
        ...form.getHeaders(),
        'Authorization': `Bearer ${openAIKey}`,
      },
    })

    return response.data.text
  } catch (error) {
    console.error(`Fetch to OpenAI API failed: ${error}`)
    throw error
  }
}

const chatCompletion = async (
  openAIKey: string, 
  messages: Message[],
  functionRegistry: FunctionRegistry
  ): Promise<ChatCompletionResponse> => {
  const response = await axios.post(
    'https://api.openai.com/v1/chat/completions',
    {
      model: "gpt-3.5-turbo-0613",
      messages: messages,
      functions: functionRegistry.getOPENAIReadyFunctions()
    },
    {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${openAIKey}`
      },
    }
  )
  if(response.status !== 200) {
    throw new Error(`Failed when communicating with OPENAI API ${response}`)
  }
  return response.data
}

export const handleGptResponse = async (
  openAIKey: string, 
  response: ChatCompletionResponse, 
  messages: Message[], 
  functionRegistry: FunctionRegistry
  ): Promise<number> => {
    const functionCall = response.choices[0].message.function_call

    if(!functionCall) { // GPT does not suggest any function
      messages.push({
        role: response.choices[0].message.role,
        content: response.choices[0].message.content
      })
      return response.usage.total_tokens
    }
    // Extract arguments from the suggested function call
    const args = functionCall.arguments

    // Retrieve the actual function from the function registry
    const requestedFunction = functionRegistry.getRequestedFuntion(functionCall.name)
    
    if(!requestedFunction) {
      messages.push({
        role: 'system',
        content: `The function does not exist, dont try calling it again!'}`
      })
    } else {
      const relatedMessages = await callFunction(requestedFunction, args)
      messages.push(...relatedMessages)
    }
    const gptResponse = await chatCompletion(openAIKey, messages, functionRegistry)
    await handleGptResponse(openAIKey, gptResponse, messages, functionRegistry)
    return response.usage.total_tokens
}

export const handleMessages = async (
  openAIKey: string,
  messages: Message[], 
  functionRegistry: FunctionRegistry
  ): Promise<number> => {
    const gptResponse = await chatCompletion(openAIKey, messages, functionRegistry)
    return await handleGptResponse(openAIKey, gptResponse, messages, functionRegistry)
}

export const getDefaultMessages = (): Message[] => {
  return _.cloneDeep(baseContext)
} 

const callFunction = async (gptFunction: GPTFunction, args: string): Promise<Message[]> => {
  const messages: Message[] = []
  messages.push({
    role: 'system',
    content: `You called this function ${gptFunction.name} with these arguments ${args}`
  })
  try {
    const result = await gptFunction.func(JSON.parse(args))
    messages.push({
      role: 'system',
      content: `Result of the functioncall: ${JSON.stringify(result)}`
    })
  } catch (error: unknown) {
    console.log(`Functioncall failed ${(error as Error).message}`)
    messages.push({
      role: 'system',
      content: `Dont try this function ${gptFunction.name} with these arguments ${args} again!`
    })
  }
  return messages
}