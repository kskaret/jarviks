import axios from 'axios'
import geoip from 'geoip-lite'

export async function getServerLocation(): Promise<{latitude: number, longitude: number}> {
    const ip = await getPublicIp()
    const geo = geoip.lookup(ip)
    console.log(geo)
    if(!geo) {
        throw new Error(`Failed at fetching geolocation`)
    }
    return {
        latitude: geo.ll[0],
        longitude: geo.ll[1]
    }
}

async function getPublicIp() {
    try {
        const response = await axios.get('https://httpbin.org/ip')
        return response.data.origin
    } catch (error) {
        console.error('Error fetching public IP:', error)
        return null
    }
}