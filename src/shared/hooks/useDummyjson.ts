import { DummyCategory, DummyProduct, DummyResult } from '../../declarations/Dummyjson'

const useDummyjson = () => {
    const API = 'https://dummyjson.com'

    async function dummyLogin(username: string, password: string) {
        const response = await fetch(`${API}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username: username,
                password: password
            })
        })

        const data = await response.json()

        return data
    }

    async function getDummyProducts() {
        const response = await fetch(`${API}/products`)

        const data = await response.json()

        return data as DummyResult
    }

    async function getSingleProduct(id: number) {
        const response = await fetch(`${API}/products/${id}`)

        const data = await response.json()

        return data as DummyProduct
    }

    async function getProductsCategories() {
        const response = await fetch(`${API}/products/categories`)

        const data = await response.json()

        return data as Array<DummyCategory>
    }

    async function getProductsByCategory(category: string) {
        const response = await fetch(`${API}/products/category/${category}`)

        const data = await response.json()

        return data as DummyResult
    }

    return {
        dummyLogin, getDummyProducts, getSingleProduct, getProductsCategories, getProductsByCategory
    }
}

export default useDummyjson