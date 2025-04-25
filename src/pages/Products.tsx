import { useEffect, useState } from 'react'
import useDummyjson from '../shared/hooks/useDummyjson'
import { DummyCategory, DummyProduct } from '../declarations/Dummyjson'
import ProductCard from '../shared/components/ProductCard'
import { HStack, Select } from '@chakra-ui/react'

import { PuffLoader } from 'react-spinners'
import { useMutation, useQuery } from '@tanstack/react-query'
import { queryClient } from 'src/App'

const Products = () => {
    const [products, setProducts] = useState<Array<DummyProduct>>([])
    const [categories, setCategories] = useState<Array<DummyCategory>>([])
    const [loading, setLoading] = useState<boolean>(false)

    const { getDummyProducts, getProductsCategories, getProductsByCategory } = useDummyjson()

    const { isPending, error, data, refetch } = useQuery({
        queryKey: ['dummyProducts'],
        queryFn: async () => await getDummyProducts()
    })

    async function getProducts() {
        setLoading(true)

        const data = await getDummyProducts()
        setProducts(data.products)

        setLoading(false)
    }

    async function getCategories() {
        const data = await getProductsCategories()
        setCategories(data)
    }

    async function getFilteredProducts(e: React.ChangeEvent<HTMLSelectElement>) {
        let data = null
        const value = e.target.value

        if (value != '*') {
            data = await getProductsByCategory(value)
        } else {
            data = await getDummyProducts()
        }

        return data
    }

    // TODO: test
    const getFilterProductsMutation = useMutation({
        mutationFn: async (e: React.ChangeEvent<HTMLSelectElement>) => getFilteredProducts(e),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['dummyProducts'] })
    })



    useEffect(() => {
        getProducts()
        getCategories()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
            <Select onChange={(e) => getFilterProductsMutation.mutate(e)}>
                <option value="*">Todos</option>

                {
                    categories.map(category => (
                        <option key={category.slug} value={category.slug}>{category.name}</option>
                    ))
                }
            </Select>

            {
                isPending ?
                    <HStack height='50vh' justifyContent='center' alignItems='center'>
                        <PuffLoader />
                    </HStack> : <HStack flexWrap='wrap' justifyContent='space-between'>
                        {
                            data?.products.map(product => (
                                <ProductCard key={product.id} product={product} />
                            ))
                        }
                    </HStack>
            }

        </>
    )
}

export default Products