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

    return {
        dummyLogin
    }
}

export default useDummyjson