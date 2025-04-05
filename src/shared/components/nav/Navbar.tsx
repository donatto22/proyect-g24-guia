import { Button, HStack, useDisclosure } from '@chakra-ui/react'
import { Link, useNavigate } from 'react-router-dom'
import NavContainer from './NavContainer'
import ShoppingCartDrawer from './ShoppingCartDrawer'
import { FiShoppingCart } from 'react-icons/fi'
import { useEffect, useState } from 'react'
import { account } from '../../../lib/appwrite'
import { toast } from 'sonner'
import { Paths } from '../../../router/routes'

const Navbar = () => {
    const [session, setSession] = useState<string>()
    const { isOpen, onOpen, onClose } = useDisclosure()
    const navigate = useNavigate()

    const appwriteSession = localStorage.getItem('appwriteSessionId')

    useEffect(() => {
        if (appwriteSession) {
            setSession(appwriteSession)
        }
    }, [])

    const logout = async () => {
        await account.deleteSession(appwriteSession!).then(() => {
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