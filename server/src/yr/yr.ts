import axios from "axios";
import { getServerLocation } from "./utils";
import { WeatherForecast } from "./types";
import { GPTFunction } from "../gpt/types";

const baseUrl = 'https://api.met.no/weatherapi/locationforecast/2.0/compact'
const headers = {
    'User-Agent': 'Jarvis home Assistant'
};

export async function getWeatherHere () {
    // this gets the loc of the machine hosting the server, not client device
    const location = await getServerLocation()
    
    const url = `${baseUrl}?lat=${location.latitude}&lon=${location.longitude}`
    
    const response = await axios.get(url, { headers })
    if(response.status !== 200) {
        throw new Error(`failed at fetching weather ${response}`)
    }
    const weatherData = response.data as WeatherForecast
    return weatherNow(weatherData)
}

const weatherNow = (weatherForecast: WeatherForecast): WeatherForecast => {
    const filteredTimeseries = [weatherForecast.properties.timeseries[0]]
    return {
        ...weatherForecast,
        properties: {
            ...weatherForecast.properties,
            timeseries: filteredTimeseries
        }
    };
}

export const yrFunctions: GPTFunction[] = [
    {
        func: getWeatherHere,
        name: getWeatherHere.name,
        description: 'Gets weather information about the current location',
        parameters: {
            type:'object',
            properties: {}
        }
    }
]
