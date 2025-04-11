import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import AppRoutes from './router/AppRoutes'
import { Toaster } from 'sonner'
import { UserProvider } from './shared/context/UserContext'

const theme = extendTheme({
    fonts: {
        body: 'Montserrat',
        heading: 'Montserrat'
    }
})

const App = () => {
    return (
        <ChakraProvider theme={theme}>
            <Toaster richColors />
            <UserProvider>
                <AppRoutes />
            </UserProvider>
        </ChakraProvider>
    )
}

export default App