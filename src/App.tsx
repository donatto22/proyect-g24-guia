import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import AppRoutes from './router/AppRoutes'
import { Toaster } from 'sonner'

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
            <AppRoutes />
        </ChakraProvider>
    )
}

export default App