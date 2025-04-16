import { Button, VStack, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, HStack, Image, Text } from '@chakra-ui/react'
import { useCartStore } from '../../store/useCartStore'
import { MdDelete } from 'react-icons/md'
import { LuShoppingCart } from "react-icons/lu"

const ShoppingCartDrawer = ({ isOpen, onClose }: {
    isOpen: boolean
    onClose: () => void
}) => {
    const { products, deleteProduct, addToCart, clearCart } = useCartStore()

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
                            <HStack justifyContent='space-between' bgColor='#f9f9f9' mb='1em'
                                p='10px' borderRadius='10px' outline='1px solid #ddd'>
                                <HStack>
                                    <Image w={50} src={p.product.thumbnail} alt={p.product.title} />
                                    <VStack alignItems='start'>
                                        <Text w={200} key={p.product.id}>{p.product.title}</Text>
                                        <HStack>
                                            <Button>-</Button>
                                            <Text key={p.product.id}>{p.quantity}</Text>
                                            <Button onClick={() => addToCart(p.product)}>+</Button>
                                        </HStack>
                                    </VStack>
                                </HStack>

                                <HStack>
                                    <Text key={p.product.id}>S/. {Number(p.product.price * p.quantity).toFixed(2)}</Text>
                                    <Button colorScheme='red' onClick={() => deleteProduct(p.product.id)}>
                                        <MdDelete />
                                    </Button>
                                </HStack>
                            </HStack>
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
                        products.length > 0 && <Button colorScheme='blue'>Continuar</Button>
                    }
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    )
}

export default ShoppingCartDrawer