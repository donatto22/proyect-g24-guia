import { Heading, Image, Text, VStack } from '@chakra-ui/react'
import { DummyProduct } from '../../declarations/Dummyjson'
import { Link } from 'react-router-dom'

const ProductCard = ({ product }: {
    product: DummyProduct
}) => {
    return (
        <VStack gap='1em' w='300px'>
            <Image src={product.thumbnail} loading='lazy' w='200px' />
            <Heading fontSize='2xl'>
                <Link to={`/products/${product.id}`}>{product.title}</Link>
            </Heading>
            <Text>{product.description}</Text>
        </VStack>
    )
}

export default ProductCard