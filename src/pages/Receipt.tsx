import { Avatar, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Button, Heading, HStack, Image, Link, Menu, MenuButton, MenuItem, MenuList, Table, TableCaption, TableContainer, Tbody, Td, Tfoot, Th, Thead, Tr, VStack } from '@chakra-ui/react'
import { useCartStore } from '../shared/store/useCartStore'
import QuantityOptions from '../shared/components/nav/QuantityOptions'
import { MdDelete } from 'react-icons/md'
import { Link as RouterLink, Navigate, useNavigate } from 'react-router-dom'
import { Paths } from '../router/routes'
import { useContext } from 'react'
import { usuarioContexto } from '../shared/context/UserContext'
import { CiLogout } from "react-icons/ci"
import { account } from '../lib/appwrite'
import { toast } from 'sonner'
import { useHotkeys } from 'react-hotkeys-hook'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const Receipt = () => {
    const userContext = useContext(usuarioContexto)
    const navigate = useNavigate()

    const { products, deleteProduct, clearCart } = useCartStore()

    useHotkeys('ctrl+q', () => withReactContent(Swal).fire({
        title: 'Estás seguro de cerrar sesión?',
        icon: 'warning',
        showCloseButton: true,
        showConfirmButton: true,
        showDenyButton: true
    }).then((result) => {
        if (result.isConfirmed) {
            logout()
        }
    }))

    const logout = async () => {
        await account.deleteSession(userContext!.appwriteSession).then(() => {
            localStorage.removeItem('appwriteSessionId')
            toast.success('Cerraste Sesión')
            navigate(Paths.Login)
        }).catch(() => {
            toast.error('Hubo un error al cerrar sesión')
        })
    }

    if (products.length == 0) {
        return <Navigate to={Paths.Products} />
    }

    return (
        <VStack w='90%' m='0 auto' alignItems='start'>
            <HStack w='100%' justifyContent='space-between' p='2em 0 4em'>
                <Breadcrumb>
                    <BreadcrumbItem>
                        <BreadcrumbLink as={RouterLink} to={Paths.Home}>Home</BreadcrumbLink>
                    </BreadcrumbItem>

                    <BreadcrumbItem>
                        <BreadcrumbLink as={RouterLink} to={Paths.Products}>Products</BreadcrumbLink>
                    </BreadcrumbItem>
                </Breadcrumb>

                <Menu>
                    <MenuButton borderWidth='1px' p='4px 10px' borderRadius='10px' _hover={{ bg: 'gray.200' }}
                        _expanded={{ bg: 'blue.100' }}
                        _focus={{ boxShadow: 'outline' }}>
                        <HStack>
                            {
                                (userContext?.profile && userContext?.account) &&
                                <>
                                    <Avatar size='sm' name={userContext?.account.name} src={userContext?.profile.profilePhoto} />
                                    <Heading size='sm'>{userContext?.account?.name}</Heading>
                                </>
                            }
                        </HStack>
                    </MenuButton>
                    <MenuList>
                        <MenuItem icon={<MdDelete size={20} />} onClick={clearCart}>Vaciar Carrito</MenuItem>
                        <MenuItem icon={<CiLogout size={20} />} onClick={logout} command='Ctrl + Q'>Cerrar sesión</MenuItem>
                    </MenuList>
                </Menu>
            </HStack>


            <TableContainer w='100%'>
                <Table variant='simple'>
                    <TableCaption>Resumen de Carrito</TableCaption>
                    <Thead>
                        <Tr>
                            <Th>Image</Th>
                            <Th>Title</Th>
                            <Th>Options</Th>
                            <Th isNumeric>Price</Th>
                            <Th>Delete</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {
                            products.map((item) => (
                                <Tr key={item.product.id}>
                                    <Td>
                                        <Image w={100} src={item.product.thumbnail} alt={item.product.title} />
                                    </Td>

                                    <Td>
                                        <Link pb='4px' _hover={{
                                            textDecor: 'none',
                                            boxShadow: '0 1px 1px gray'
                                        }}
                                            as={RouterLink} to={`/products/${item.product.id}`} target='_blank'>{item.product.title}</Link>
                                    </Td>

                                    <Td>
                                        <QuantityOptions p={item} />
                                    </Td>

                                    <Td isNumeric>S/. {item.product.price}</Td>

                                    <Td>
                                        <Button colorScheme='red' onClick={() => deleteProduct(item.product.id)}>
                                            <MdDelete />
                                        </Button>
                                    </Td>
                                </Tr>
                            ))
                        }
                    </Tbody>
                    <Tfoot>
                        <Tr>
                            <Th>Image</Th>
                            <Th>Title</Th>
                            <Th>Options</Th>
                            <Th isNumeric>Price</Th>
                            <Th>Delete</Th>
                        </Tr>
                    </Tfoot>
                </Table>
            </TableContainer>

            <Button colorScheme='blue' onClick={() => navigate(Paths.Payment)}>
                Comprar
            </Button>
        </VStack>
    )
}

export default Receipt