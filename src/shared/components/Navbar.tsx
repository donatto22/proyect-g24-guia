import { Box, Button, HStack, Image, Text } from '@chakra-ui/react'
import { Link, useNavigate } from 'react-router-dom'
import { DummySession } from '../../declarations/Dummyjson'

const Navbar = () => {
    const session = JSON.parse(localStorage.getItem('dummySession')) as DummySession

    const navigate = useNavigate()

    const logout = () => {
        localStorage.removeItem('dummySession')
    }

    return (
        <HStack justifyContent='space-between' bgColor='beige' p='1em 2em'>
            {
                session ? <HStack>
                    <Image w='40px' src={session.image} alt={session.username} />
                    <Text>{session.username}</Text>
                </HStack> : <Box></Box>
            }
            <HStack>
                <Link to='/'>Home</Link>
                <Link to='/products'>Products</Link>
                {
                    session ? <Button onClick={logout}>Logout</Button> : <Button onClick={() => navigate('/login')}>Login</Button>
                }
            </HStack>
        </HStack>
    )
}

export default Navbar