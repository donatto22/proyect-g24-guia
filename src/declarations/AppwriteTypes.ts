import { Models } from 'appwrite'

export type AppwriteResponse = {
    documents: Array<object>
    total: number
}

export interface Product extends Models.Document {
    title: string
    price: number
    stock: number
    active: boolean
}