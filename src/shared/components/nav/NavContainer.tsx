import { HStack } from '@chakra-ui/react'
import { ReactElement } from 'react'

const NavContainer = ({ children }: {
    children: ReactElement
}) => {
    return (
        <HStack justifyContent='space-between' bgColor={{
            sm: 'blue', lg: 'chocolate'
        }} p='1em 2em'>
            {children}
        </HStack>
    )
}

export default NavContainer