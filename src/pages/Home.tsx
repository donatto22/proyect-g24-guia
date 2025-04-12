import React, { useContext, useEffect, useState } from 'react'
import { database, ID } from '../lib/appwrite'
import { AppwriteResponse, Product } from '../declarations/AppwriteTypes'
import { Appwrite } from '../lib/env'
import { Box, Button, ButtonGroup, FormControl, FormLabel, HStack, Input, Tag, Tooltip } from '@chakra-ui/react'
import { toast } from 'sonner'
import { Link } from 'react-router-dom'

import { MdDelete } from 'react-icons/md'
import { Query } from 'appwrite'
import { Helmet } from 'react-helmet'
import useAppwrite from '../shared/hooks/useAppwrite'
import { usuarioContexto } from '../shared/context/UserContext'
import { useCounterStore } from '../shared/store/useCounterStore'

const Home = () => {
    const [products, setProducts] = useState<Array<Product>>()

    const userContext = useContext(usuarioContexto)

    const { fromDatabase } = useAppwrite()
    const { collection } = fromDatabase(Appwrite.databaseId)
    const productsCollection = collection(Appwrite.collections.products)

    const { counter2, sumarUno } = useCounterStore()

    async function traerProductos() {
        const response: AppwriteResponse = await productsCollection.getDocuments()

        setProducts(response.documents as Array<Product>)
    }

    async function crearProducto(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()

        const formulario = e.currentTarget

        const data = new FormData(formulario)
        const entries = Object.fromEntries(data.entries())

        await database.createDocument(Appwrite.databaseId, Appwrite.collections.products, ID.unique(), {
            title: entries.title,
            price: Number(entries.price)
        }).then(() => {
            toast.success('Producto creado')
            traerProductos()
        }).catch(() => {
            toast.error('No se logró crear el producto')
        })
    }

    async function deleteProduct(e: React.MouseEvent<HTMLButtonElement>, productId: string) {
        e.currentTarget.disabled = true

        await productsCollection.deleteDocument(productId).then(() => {
            traerProductos()
            toast.success('Producto Eliminado')
        }).catch(() => {
            toast.error('El producto no se logró eliminar')
            e.currentTarget.disabled = false
        })
    }

    async function getActiveProducts() {
        const response: AppwriteResponse = await database.listDocuments(Appwrite.databaseId, Appwrite.collections.products, [
            Query.equal('active', true)
        ])

        setProducts(response.documents as Array<Product>)
    }

    async function getInactiveProducts() {
        const response: AppwriteResponse = await database.listDocuments(Appwrite.databaseId, Appwrite.collections.products, [
            Query.equal('active', false)
        ])

        setProducts(response.documents as Array<Product>)
    }

    async function prueba() {
        const response: AppwriteResponse = await database.listDocuments(Appwrite.databaseId, Appwrite.collections.products, [
            Query.or([ // o
                Query.greaterThan('price', 200),
                Query.equal('active', true)
            ])
        ])

        setProducts(response.documents as Array<Product>)
    }

    async function getAll() {
        await traerProductos()
    }

    useEffect(() => {
        getAll()
    }, [])

    return (
        <>
            <Helmet>
                <title>Hola mundo</title>
            </Helmet>

            <Box as='form' w={300} onSubmit={crearProducto}>
                <h1>{counter2}</h1>
                <Button onClick={sumarUno}>Incrementar</Button>


                <FormControl>
                    <FormLabel>Titulo</FormLabel>
                    <Input type='text' name='title' />
                </FormControl>

                <FormControl>
                    <FormLabel>Precio</FormLabel>
                    <Input type='text' name='price' />
                </FormControl>

                <Button type='submit'>Crear</Button>
            </Box>
            <br />

            <ButtonGroup>
                <Button size='sm' onClick={traerProductos}>Todos</Button>
                <Button size='sm' onClick={getActiveProducts}>Activos</Button>
                <Button size='sm' onClick={getInactiveProducts}>Inactivos</Button>
            </ButtonGroup> <br /> <br />

            <ButtonGroup>
                <Button size='sm' onClick={prueba}>Más de S/. 200 también a los Activos</Button>
            </ButtonGroup>

            <br />

            <hr />

            {
                products?.map(p => (
                    <HStack key={p.$id} w={500} justifyContent='space-between'
                        p='.4em 1em' borderRadius='10px' bgColor='lightgray' mb='1em'>
                        <Box>
                            <HStack>
                                <h1>
                                    <Link to={`/products/appwrite/${p.$id}`}>{p.title}</Link>
                                </h1>

                                <Tag pointerEvents='none' colorScheme={p.active ? 'green' : 'orange'}>{p.active ? 'Activo' : 'Inactivo'}</Tag>
                            </HStack>
                            <HStack>
                                <b>S/. {p.price}</b> <i>({p.stock} en stock)</i>
                            </HStack>
                        </Box>

                        <Tooltip label='Eliminar' placement='right' hasArrow>
                            {
                                userContext?.profile?.role == 'buyer' ? <Box></Box> : <Button onClick={(e) => deleteProduct(e, p.$id)}
                                    bgColor='lightpink' color='darkred' _hover={{
                                        bgColor: 'darkred',
                                        color: 'pink'
                                    }}>
                                    <MdDelete />
                                </Button>
                            }

                            <Button onClick={(e) => deleteProduct(e, p.$id)}
                                bgColor='lightpink' color='darkred' _hover={{
                                    bgColor: 'darkred',
                                    color: 'pink'
                                }}>
                                <MdDelete />
                            </Button>
                        </Tooltip>
                    </HStack>
                ))
            }
        </>
    )
}

export default Home