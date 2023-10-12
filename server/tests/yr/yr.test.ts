import { getWeatherHere } from "../../src/yr/yr";
jest.setTimeout(60000)
describe(getWeatherHere, ()=>{
    it('1', async () => {
        const weather = await getWeatherHere()
        console.log(JSON.stringify(weather))
    })
})

//https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=59.95&lon=10.75
