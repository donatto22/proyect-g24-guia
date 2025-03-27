import { ChakraProvider } from '@chakra-ui/react'
import AppRoutes from './router/AppRoutes'
import { Toaster } from 'sonner'

const App = () => {
    return (
        <ChakraProvider>
            <Toaster richColors />
            <AppRoutes />
        </ChakraProvider>
    )
}

export default App