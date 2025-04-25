import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import AppRoutes from './router/AppRoutes'
import { Toaster } from 'sonner'
import { UserProvider } from './shared/context/UserContext'

import { Analytics } from "@vercel/analytics/react"

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

export const queryClient = new QueryClient()

const theme = extendTheme({
    fonts: {
        body: 'Montserrat',
        heading: 'Montserrat'
    }
})

const App = () => {
    return (
        <ChakraProvider theme={theme}>
            <Analytics />
            <Toaster richColors />
            <QueryClientProvider client={queryClient}>
                <UserProvider>
                    <AppRoutes />
                </UserProvider>
            </QueryClientProvider>
        </ChakraProvider>
    )
}

export default App