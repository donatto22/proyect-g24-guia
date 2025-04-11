import { Avatar, Button, Heading, HStack, useDisclosure } from '@chakra-ui/react'
import { Link, useNavigate } from 'react-router-dom'
import NavContainer from './NavContainer'
import ShoppingCartDrawer from './ShoppingCartDrawer'
import { FiShoppingCart } from 'react-icons/fi'
import { useEffect, useState } from 'react'
import { account, database } from '../../../lib/appwrite'
import { toast } from 'sonner'
import { Paths } from '../../../router/routes'
import { Models, Query } from 'appwrite'
import { Appwrite } from '../../../lib/env'
import { Profile } from '../../../declarations/AppwriteTypes'

const Navbar = () => {
    const [reactAccount, setReactAccount] = useState<Models.User<Models.Preferences>>()
    const [profileImage, setProfileImage] = useState<string>()

    const { isOpen, onOpen, onClose } = useDisclosure()
    const navigate = useNavigate()

    const appwriteSession = localStorage.getItem('appwriteSessionId')

    const logout = async () => {
        await account.deleteSession(appwriteSession!).then(() => {
            localStorage.removeItem('appwriteSessionId')
            toast.success('Cerraste Sesión')
            navigate(Paths.Login)
        }).catch(() => {
            toast.error('Hubo un error al cerrar sesión')
        })
    }


    const getAccount = async () => {
        setReactAccount(await account.get())
    }

    const getProfile = async () => {
        await getAccount()

        const response = await database.listDocuments(Appwrite.databaseId, Appwrite.collections.profile, [
            Query.equal('email', (await account.get()).email)
        ])

        setProfileImage((response.documents[0] as Profile).profilePhoto)
    }


    useEffect(() => {
        getProfile()
    }, [])

    return (
        <NavContainer>
            <>
                <HStack>
                    {
                        profileImage ? <Avatar name={reactAccount?.name} src={profileImage} /> :
                            <Avatar name={reactAccount?.name} />
                    }
                    <Heading>{reactAccount?.name}</Heading>
                </HStack>
                <HStack>
                    <Link to='/'>Home</Link>
                    <Link to='/products'>Products</Link>
                    <Link to='#' onClick={onOpen}><FiShoppingCart /></Link>
                    {
                        appwriteSession ? <Button onClick={logout}>Logout</Button> :
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