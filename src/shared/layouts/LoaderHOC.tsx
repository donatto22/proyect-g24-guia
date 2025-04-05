import { Box } from '@chakra-ui/react'
import { ComponentType, Suspense } from 'react'
import { MoonLoader } from 'react-spinners'

const LoaderHOC = (Component: ComponentType) => {
    return () => {
        return (
            <Suspense fallback={<Box w='100%' h='500px' display='flex' justifyContent='center' alignItems='center'><MoonLoader /></Box>}>
                <Component />
            </Suspense>
        )
    }
}

export default LoaderHOC