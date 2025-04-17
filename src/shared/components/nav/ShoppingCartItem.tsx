import { Button, HStack, Image, Text, VStack } from '@chakra-ui/react'
import { MdDelete } from 'react-icons/md'
import { CartItem, useCartStore } from '../../store/useCartStore'
import QuantityOptions from './QuantityOptions'

const ShoppingCartItem = ({ p }: {
    p: CartItem
}) => {
    const { deleteProduct } = useCartStore()

    return (
        <HStack justifyContent='space-between' bgColor='#f9f9f9' mb='1em'
            p='10px' borderRadius='10px' outline='1px solid #ddd'>
            <HStack>
                <Image w={50} src={p.product.thumbnail} alt={p.product.title} />
                <VStack alignItems='start'>
                    <Text w={200} key={p.product.id}>{p.product.title}</Text>
                    <QuantityOptions p={p} />
                </VStack>
            </HStack>

            <HStack>
                <Text key={p.product.id}>S/. {Number(p.product.price * p.quantity).toFixed(2)}</Text>
                <Button colorScheme='red' onClick={() => deleteProduct(p.product.id)}>
                    <MdDelete />
                </Button>
            </HStack>
        </HStack>
    )
}

export default ShoppingCartItem