import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Product } from '../declarations/AppwriteTypes'
import { database } from '../lib/appwrite'
import { Appwrite } from '../lib/env'
import { Box, Button, Heading, Text } from '@chakra-ui/react'
import RoutePath from '../shared/components/RoutePath'
import { toast } from 'sonner'

const AppwriteProduct = () => {
    const [product, setProduct] = useState<Product>()
    const [error, setError] = useState<boolean>(false)

    const navigate = useNavigate()

    async function getProduct() {
        database.getDocument(Appwrite.databaseId, Appwrite.collections.products, id!)
            .then((response) => {
                setProduct(response as Product)
                setError(false)
            })
            .catch(() => {
                toast.error('No existe el Producto')
                setError(true)
            })
    }

    const { id } = useParams()

    async function deleteProduct(productId: string) {
        await database.deleteDocument(Appwrite.databaseId, Appwrite.collections.products, productId).then(() => {
            navigate('/')
            toast.success('Producto Eliminado')
        }).catch(() => {
            toast.error('El producto no se logró eliminar')
        })
    }

    useEffect(() => {
        getProduct()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <Box>
            {
                product && (
                    <>
                        <RoutePath />

                        <Heading size='2xl'>{product.title}</Heading>
                        <Text fontSize={30}> S/. {product.price}</Text>
                        <Button onClick={() => deleteProduct(product.$id)}>Eliminar</Button>
                    </>
                )
            }

            {
                error && (
                    <Text>No existe el producto</Text>
                )
            }
        </Box>
    )
}

export default AppwriteProduct