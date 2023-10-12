import { controlLightsInRoom, getInfoAboutAllRooms } from "../src/hue/hue"
import dotenv from 'dotenv';
dotenv.config();

describe("controlLightsInRoom", () => {
    it('should turn off ligths', async () => {
        console.log(process.env.HUE_ID)
        const response = await controlLightsInRoom({ roomId: 10, on: false })
        console.log(response)
    })
    it('should turn on ligths', async () => {
        const response = await controlLightsInRoom({ roomId: 10, on: true })

        console.log(response)
    })
})

describe("getInfoAboutAllRooms", () => {
    it('should turn off ligths', async () => {
        const groups = await getInfoAboutAllRooms()

        Object.keys(groups).forEach(k => {
            console.log(groups[k].name)
        })
    })
})