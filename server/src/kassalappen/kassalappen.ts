import axios from "axios";
import { Product } from "./types";
import dotenv from 'dotenv';
import { GPTFunction } from "../gpt/types";
dotenv.config();

const baseUrl = 'https://kassal.app/api/v1'
const apiKey = process.env.KASSALAPP_API_KEY!
type getProductInput = {
    productName: string,
    brand?: string
} 

export async function getProduct(input: getProductInput): Promise<string | undefined> {
    const {productName, brand} = input

    let url = `${baseUrl}/products?search=${productName}&sort=price_desc&unique`
    if(brand) {
        url += `&brand=${brand}`
    }
    console.log(url)
    const response = await axios.get(url, {
        headers: {
            'Authorization': `Bearer ${apiKey}`
        }
    });
    if(response.status !== 200) {
        return response.statusText
    }

    const products: Product[] = (response.data.data as Product[]).map(product => {
        return {
            ...product,
            price_history: []
        }
    })
    return products.length > 0 ? JSON.stringify(products[0]) : undefined
}

export async function getProductAndPriceFromAllBrands(input: {productName: string}): Promise<string | undefined> {
    let url = `${baseUrl}/products?search=${input.productName}&sort=price_asc&price_min=1&unique&size=100`
    console.log(url)
    const response = await axios.get(url, {
        headers: {
            'Authorization': `Bearer ${apiKey}`
        }
    });
    if(response.status !== 200) {
        return response.statusText
    }
    console.log(JSON.stringify(response.data.data))
    let products = (response.data.data as Product[]).filter(
        p => p.current_price || 
        (p.price_history && p.price_history.length > 0)
    ).filter(p => p.brand != null)
    products = products.map(product => {
        const price = product.current_price || product.price_history![0].price
        return {
            name: product.name,
            brand: product.brand,
            current_price: price,
            id: product.id,
            vendor: product.vendor
        }
    })
    return JSON.stringify(products)
}

export const kassalappenFunctions: GPTFunction[] = [
    {
        func: getProduct,
        name: getProduct.name,
        description: 'Gets information regarding a product, if it exists',
        parameters: {
            type:'object',
            properties: {
                productName: {
                    type: "string",
                    description: "Search for all words in the product name, fuccy matching"
                },
                brand: {
                    type: "string",
                    description: "Filter products that is of a certain brand , e.g Tine"
                },
            },
            required: ['productName']
        }
    },
    {
        func: getProductAndPriceFromAllBrands,
        name: getProductAndPriceFromAllBrands.name,
        description: 'Gets the available price, brands and vendors of a product, if it exists',
        parameters: {
            type:'object',
            properties: {
                productName: {
                    type: "string",
                    description: "Search for all words in the product name, fuccy matching"
                }
            },
            required: ['productName']
        }
    }
]