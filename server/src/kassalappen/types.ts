export type Product = {
    id: number;
    name: string;
    brand: string;
    vendor?: string;
    ean?: string;
    url?: string;
    image?: string;
    description?: string | null;
    ingredients?: string;
    current_price?: number;
    store?: Store;
    price_history?: PriceHistoryItem[];
    allergens?: string[];
    nutrition?: NutritionItem[];
    created_at?: string;
    updated_at?: string;
};

type Store = {
    name: string;
    code: string;
    url: string;
    logo: string;
};

type PriceHistoryItem = {
    price: number;
    date: string;
};

type NutritionItem = {
    code: string;
    display_name: string;
    amount: number;
    unit: string;
};

