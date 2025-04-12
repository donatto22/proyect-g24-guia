import { Avatar, Button, Heading, HStack, useDisclosure } from '@chakra-ui/react'
import { Link, useNavigate } from 'react-router-dom'
import NavContainer from './NavContainer'
import ShoppingCartDrawer from './ShoppingCartDrawer'
import { FiShoppingCart } from 'react-icons/fi'
import { useContext } from 'react'

import { Paths } from '../../../router/routes'
import { usuarioContexto } from '../../context/UserContext'
import { account } from '../../../lib/appwrite'
import { toast } from 'sonner'

const Navbar = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const navigate = useNavigate()

    const userContext = useContext(usuarioContexto)

    const logout = async () => {
        await account.deleteSession(userContext?.appwriteSession).then(() => {
            localStorage.removeItem('appwriteSessionId')
            toast.success('Cerraste Sesión')
            navigate(Paths.Login)
        }).catch(() => {
            toast.error('Hubo un error al cerrar sesión')
        })
    }

    return (
        <NavContainer>
            <>
                <HStack>

                    {
                        (userContext?.profile && userContext?.account) &&
                        <>
                            <Avatar name={userContext?.account.name} src={userContext?.profile.profilePhoto} /> :
                            <Heading>{userContext?.account?.name}</Heading>
                        </>
                    }
                </HStack>
                <HStack>
                    <Link to='/'>Home</Link>
                    <Link to='/products'>Products</Link>
                    <Link to='#' onClick={onOpen}><FiShoppingCart /></Link>
                    {
                        userContext?.appwriteSession ? <Button onClick={logout}>Logout</Button> :
                            <>
                                <Button onClick={() => navigate(Paths.Login)}>Login</Button>
                                <Button onClick={() => navigate(Paths.Register)}>Register</Button>
                            </>
                    }
                </HStack>

                <ShoppingCartDrawer isOpen={isOpen} onClose={onClose} />
            </>
        </NavContainer>
    )
}

export default Navbar