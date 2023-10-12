import axios from "axios"
import { Room, RoomAction, RoomActionWithId, RoomActionWithIds, RoomsData, SuccessResponse } from "./types"
import { GPTFunction } from "../gpt/functionRegistry"
import dotenv from 'dotenv'
dotenv.config()

const baseUrl = 'http://192.168.1.3/api'
const hueUser = process.env.HUE_ID

async function controlLightsInRoom (input: RoomActionWithId) {
    const {roomId, ...rest} = input
    const roomInfo = await getRoomInfo(roomId)

    const responses = []
    for(let light of roomInfo.lights) {
        const response = await alterLight(light, rest)
        responses.push(response)
    }
    return responses
}
async function controlSeveralRooms (input: RoomActionWithIds) {
    const {roomIds, ...rest} = input
    const promises = roomIds.map(id => {
        return getRoomInfo(id)
    })

    const infos = await Promise.all(promises)

    const roomPromises: Promise<SuccessResponse>[] = []
    infos.forEach(roomInfo => {
        for(let light of roomInfo.lights) {
            roomPromises.push(alterLight(light, rest))
        }
    })
    const responses = await Promise.all(roomPromises)
    return responses
}
async function getInfoAboutAllRooms (): Promise<RoomsData> {
    const url = `${baseUrl}/${hueUser}/groups`
    const response = await axios.get(url)
    return response.data
}

const getRoomInfo = async (groupId: number): Promise<Room> => {
    const url = `${baseUrl}/${hueUser}/groups/${groupId}`
    const response = await axios.get(url)
    return response.data
}

 const alterLight = async (lightId: string, roomaction: RoomAction): Promise<SuccessResponse> => {
    const url = `${baseUrl}/${hueUser}/lights/${lightId}/state`
    return (await axios.put(url, roomaction)).data
}

export const hueFunctions: GPTFunction[] = [
    {
        func: getInfoAboutAllRooms,
        name: getInfoAboutAllRooms.name,
        description: 'Gets info regarding all rooms and their lights from the Philips HUE api',
        parameters: {
            type:'object',
            properties: {}
        }
    },
    {
        func: controlSeveralRooms,
        name: controlSeveralRooms.name,
        description: 'Allows the user to control the lights in several rooms at ones',
        parameters: {
                type:'object',
                properties: {
                    roomIds: {
                        type: "number",
                        description: "An array of ids of the rooms we want to modify the lights "
                    },
                    on: {
                        type: "boolean",
                        description: "whether we want to turn off or on the lights"
                    },
                },
                
        }
    },
    {
        func: controlLightsInRoom,
        name: controlLightsInRoom.name,
        description:'Control the Hue lights in a room, can turn on and off the lights and change various settings',
        parameters: {
            type:'object',
            properties: {
                roomId: {
                    type: 'number',
                    description: 'The id, the ID is an Integer, of the room we want to change the lights in'
                },
                on: {
                    type: "boolean",
                    description: "whether we want to turn off or on the lights"
                },
                bri: {
                    type: "number", 
                    description: "Value between 0 and 254, indicating how bright the light is"
                }
            },
            required: ['roomId']
        }
    }
]
export {
    controlLightsInRoom,
    controlSeveralRooms,
    getInfoAboutAllRooms
}