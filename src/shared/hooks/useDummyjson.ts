import { DummyProduct, DummyResult } from '../../declarations/Dummyjson'

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

    return {
        dummyLogin, getDummyProducts, getSingleProduct
    }
}

export default useDummyjson