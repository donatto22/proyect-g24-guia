import { Box, Heading, HStack, Image, Text, VStack } from '@chakra-ui/react'
import { DummyProduct } from '../../declarations/Dummyjson'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { PuffLoader } from 'react-spinners'

const ProductCard = ({ product }: {
    product: DummyProduct
}) => {
    const [loaded, setLoaded] = useState(false)


    return (
        <VStack gap='1em' w='300px'>
            <Box h={200}>
                {
                    !loaded && <HStack w={200} h={200} justifyContent='center'><PuffLoader /></HStack>
                }
                <Image src={product.thumbnail} loading='lazy' w='200px' h={200} onLoad={() => setLoaded(true)} />
            </Box>
            <Heading fontSize='2xl'>
                <Link to={`/products/${product.id}`}>{product.title}</Link>
            </Heading>
            <Text>{product.description}</Text>
        </VStack>
    )
}

export default ProductCard