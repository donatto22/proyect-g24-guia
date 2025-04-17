import { Button, VStack, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, Text } from '@chakra-ui/react'
import { useCartStore } from '../../store/useCartStore'
import { LuShoppingCart } from "react-icons/lu"
import ShoppingCartItem from './ShoppingCartItem'
import { useNavigate } from 'react-router-dom'
import { Paths } from '../../../router/routes'

const ShoppingCartDrawer = ({ isOpen, onClose }: {
    isOpen: boolean
    onClose: () => void
}) => {
    const { products, clearCart } = useCartStore()
    const navigate = useNavigate()

    return (
        <Drawer
            size={'md'}
            isOpen={isOpen}
            placement='right'
            onClose={onClose}
        >
            <DrawerOverlay />
            <DrawerContent bgColor='rgba(255, 255, 255, .8)' backdropFilter='blur(10px)'>
                <DrawerCloseButton />
                <DrawerHeader>Carrito</DrawerHeader>

                <DrawerBody>
                    {
                        products.length == 0 && <VStack h='100%' justifyContent='center'>
                            <LuShoppingCart size={100} />
                            <Text fontSize={30} fontWeight={500}>Carrito Vacío!</Text>
                        </VStack>
                    }

                    {
                        products.map((p) => (
                            <ShoppingCartItem key={p.product.id} p={p} />
                        ))
                    }
                </DrawerBody>

                <DrawerFooter>
                    <Button variant='outline' mr={3} onClick={onClose}>
                        Cerrar
                    </Button>
                    {
                        products.length > 0 && <Button variant='outline' colorScheme='red' mr={3} onClick={clearCart}>Vaciar</Button>
                    }
                    {
                        products.length > 0 && <Button colorScheme='blue' onClick={() => navigate(Paths.Receipt)}>Continuar</Button>
                    }
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    )
}

export default ShoppingCartDrawer