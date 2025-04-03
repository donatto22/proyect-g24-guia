import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Product } from '../declarations/AppwriteTypes'
import { database } from '../lib/appwrite'
import { Appwrite } from '../lib/env'
import { Box, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Heading, Text } from '@chakra-ui/react'

const AppwriteProduct = () => {
    const [product, setProduct] = useState<Product>()

    const { id } = useParams()

    async function getProduct() {
        const response = await database.getDocument(Appwrite.databaseId, Appwrite.collections.products, id)

        setProduct(response as Product)
    }

    useEffect(() => {
        getProduct()
    }, [])

    return (
        <Box>
            <Breadcrumb>
                <BreadcrumbItem>
                    <BreadcrumbLink to='/' as={Link}>Home</BreadcrumbLink>
                </BreadcrumbItem>

                <BreadcrumbItem isCurrentPage>
                    <BreadcrumbLink >{product?.title}</BreadcrumbLink>
                </BreadcrumbItem>
            </Breadcrumb>

            <Heading size='2xl'>{product?.title}</Heading>
            <Text fontSize={30}> S/. {product?.price}</Text>
        </Box>
    )
}

export default AppwriteProduct