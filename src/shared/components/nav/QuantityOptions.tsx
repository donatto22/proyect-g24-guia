import { Button, HStack, Text } from '@chakra-ui/react'
import { CartItem, useCartStore } from '../../store/useCartStore'

const QuantityOptions = ({ p }: {
    p: CartItem
}) => {
    const { decreaseQuantity, addToCart } = useCartStore()

    return (
        <HStack>
            <Button onClick={() => decreaseQuantity(p.product)}>-</Button>
            <Text key={p.product.id}>{p.quantity}</Text>
            <Button onClick={() => addToCart(p.product)}>+</Button>
        </HStack>
    )
}

export default QuantityOptions