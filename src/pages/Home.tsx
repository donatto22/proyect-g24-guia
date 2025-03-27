import { useEffect, useState } from 'react'
import useDummyjson from '../shared/hooks/useDummyjson'
import { DummyProduct } from '../declarations/Dummyjson'
import ProductCard from '../shared/components/ProductCard'
import { HStack } from '@chakra-ui/react'

const Home = () => {
    const [products, setProducts] = useState<Array<DummyProduct>>([])

    const { getDummyProducts } = useDummyjson()

    async function getProducts() {
        const data = await getDummyProducts()
        setProducts(data.products)
    }

    useEffect(() => {
        getProducts()
    }, [])

    return (
        <>
            <HStack flexWrap='wrap' justifyContent='space-between'>
                {
                    products.map(product => (
                        <ProductCard key={product.id} product={product} />
                    ))
                }
            </HStack>
        </>
    )
}

export default Home