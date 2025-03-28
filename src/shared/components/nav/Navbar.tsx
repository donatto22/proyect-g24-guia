import { Box, Button, HStack, Image, Text, useDisclosure } from '@chakra-ui/react'
import { Link, useNavigate } from 'react-router-dom'
import { DummySession } from '../../../declarations/Dummyjson'
import NavContainer from './NavContainer'
import ShoppingCartDrawer from './ShoppingCartDrawer'
import { FiShoppingCart } from 'react-icons/fi'
import { useState } from 'react'

const Navbar = () => {
    const [session, setSession] = useState<DummySession>()
    const { isOpen, onOpen, onClose } = useDisclosure()

    const dummySession = localStorage.getItem('dummySession')

    if (dummySession) {
        setSession(JSON.parse(dummySession))
    }

    const navigate = useNavigate()

    const logout = () => {
        localStorage.removeItem('dummySession')
    }

    return (
        <NavContainer>
            <>
                {
                    session ? <HStack>
                        <Image w='40px' src={session.image} alt={session.username} />
                        <Text>{session.username}</Text>
                    </HStack> : <Box></Box>
                }
                <HStack>
                    <Link to='/'>Home</Link>
                    <Link to='/products'>Products</Link>
                    <Link to='#' onClick={onOpen}><FiShoppingCart /></Link>
                    {
                        session ? <Button onClick={logout}>Logout</Button> : <Button onClick={() => navigate('/login')}>Login</Button>
                    }

                </HStack>

                <ShoppingCartDrawer isOpen={isOpen} onClose={onClose} />
            </>
        </NavContainer>
    )
}

export default Navbar