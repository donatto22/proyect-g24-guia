import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Product } from '../declarations/AppwriteTypes'
import { database } from '../lib/appwrite'
import { Appwrite } from '../lib/env'
import { Box, Button, FormControl, FormLabel, Input, Switch, Text } from '@chakra-ui/react'
import RoutePath from '../shared/components/RoutePath'
import { toast } from 'sonner'
import { Paths } from '../router/routes'

const AppwriteProduct = () => {
    const [product, setProduct] = useState<Product>()
    const [error, setError] = useState<boolean>(false)

    const [isChecked, setIsCheked] = useState<boolean>()

    const navigate = useNavigate()

    async function getProduct() {
        database.getDocument(Appwrite.databaseId, Appwrite.collections.products, id!)
            .then((response) => {
                setProduct(response as Product)
                setIsCheked((response as Product).active)
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
            navigate(Paths.Home)
            toast.success('Producto Eliminado')
        }).catch(() => {
            toast.error('El producto no se logró eliminar')
        })
    }

    async function editProduct(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()

        const formulario = e.currentTarget

        const data = new FormData(formulario)
        const formData = Object.fromEntries(data.entries())

        await database.updateDocument(Appwrite.databaseId, Appwrite.collections.products, product?.$id, {
            title: formData.title,
            price: Number(formData.price),
            active: formData.active ? true : false
        }).then(() => {
            toast.success('Producto Actualizado')
        }).catch(() => {
            toast.error('No se logró actualizar')
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
                        <Button onClick={() => deleteProduct(product.$id)}>Eliminar</Button>

                        <Box as='form' onSubmit={editProduct}>
                            <FormControl>
                                <FormLabel>Nombre del producto</FormLabel>
                                <Input type='text' name='title' defaultValue={product.title} />
                            </FormControl>

                            <FormControl>
                                <FormLabel>Precio S/.</FormLabel>
                                <Input type='number' name='price' defaultValue={product.price} />
                            </FormControl>

                            <FormControl>
                                <FormLabel>Activo?</FormLabel>
                                <Switch name='active' isChecked={isChecked} onChange={() => setIsCheked((prev) => !prev)} />
                            </FormControl>

                            <Button type='submit'>Editar</Button>
                        </Box>
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