import { ReactElement } from 'react'
import Navbar from '../components/nav/Navbar'
import { Box } from '@chakra-ui/react'

const BaseLayout = ({ children }: {
    children: ReactElement
}) => {
    return (
        <>
            <Box h='100vh'>
                <Navbar />
                {children}
            </Box>
        </>
    )
}

export default BaseLayout