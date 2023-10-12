import { FunctionRegistry } from "../../src/gpt/functionRegistry";
import { createDefaultContext, getDefaultMessages, handleMessages } from "../../src/gpt/gpt"
import dotenv from 'dotenv';
dotenv.config();

jest.setTimeout(60000)
describe('testing GPT', () => {
    it('1', async () => {
        FunctionRegistry.initiate()
        const msgs = getDefaultMessages()
        console.log(FunctionRegistry.getOPENAIReadyFunctions())
        await createDefaultContext(
            process.env.OPENAI_API_KEY!,
            "Hent og lær deg info om alle lysene i huset mitt",
            msgs
        )
        msgs.push({
            role: 'user',
            content: "Hei jeg sitter å spiser, kan du skru på lyset?",
        })
        await handleMessages(
            process.env.OPENAI_API_KEY!,
            msgs
        )
    })
    it('1', async () => {
        FunctionRegistry.initiate()
        const msgs = getDefaultMessages()
        console.log(FunctionRegistry.getOPENAIReadyFunctions())
        await createDefaultContext(
            process.env.OPENAI_API_KEY!,
            "Hent og lær deg info om alle lysene i huset mitt",
            msgs
        )
        msgs.push({
            role: 'user',
            content: "Hei hva er været her jeg er?  ",
        })
        await handleMessages(
            process.env.OPENAI_API_KEY!,
            msgs
        )
    })
})