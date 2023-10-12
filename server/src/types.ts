import { Message } from "./gpt/types"

export type UploadAudioData = {
    audioFile: string,
    messages: Message[] 
}