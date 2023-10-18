import {GPTFunction} from "../gpt/types"
import axios from "axios";

const baseUrl = 'https://www.hvakosterstrommen.no/api/v1/prices/'


export async function electricityPrice(input: {year: number, month: number, day: number, area: string}) {
   // return respomse from this api: GET https://www.hvakosterstrommen.no/api/v1/prices/[ÅR]/[MÅNED]-[DAG]_[PRISOMRÅDE].json

    const url = `${baseUrl}${input.year}/${input.month}-${input.day}_${input.area}.json`
  console.log("requesting: " + url)
    const response = await axios.get(url)
    if(response.status !== 200) {
        throw new Error(`failed at fetching electricity price ${response}`)
    }

    return response.data as string

}

export async function dagensDato() {
  console.log("requesting date and time")
  //return date and time
  return new Date().toLocaleString('no-NO', { timeZone: 'Europe/Oslo' })

}

function avg(items: number[], itemCount: number) {
  console.log("calculating average of " + itemCount + " items")
  var sum = 0;
  for (var item of items) {
    sum += item;
  }

  return sum/itemCount;
}

export const electricityPrices: GPTFunction[] = [
    {
        func: electricityPrice,
        name: electricityPrice.name,
        description: 'Returns electricity prices for the given day and area. The area can one of the following: NO1 = Oslo / Øst-Norge\n' +
            'NO5 = Bergen / Vest-Norge. Only historic data, and tomorrow.',
        parameters: {
            type:'object',
            properties: {
                year: {
                    type: "number",
                },
                month: {
                    type: "number",
                },
                day: {
                  type: "number",
                },
                area: {
                  type: "string",
              },
            },
            required: ['year', 'month', 'day', 'area']
        }
    },
  {
    func: dagensDato,
    name: dagensDato.name,
    description: 'Returnerer dagens dato og klokkeslett. Todays date and time now.',
    parameters: {
      type:'object',
      properties: {

      },
      required: []
    }
  }
]