import React, { useEffect, useState } from 'react'
import { database, ID } from '../lib/appwrite'
import { AppwriteResponse, Product } from '../declarations/AppwriteTypes'
import { Appwrite } from '../lib/env'
import { Box, Button, FormControl, FormLabel, Input } from '@chakra-ui/react'
import { toast } from 'sonner'
import { Link } from 'react-router-dom'

const Home = () => {
    const [products, setProducts] = useState<Array<Product>>()

    async function traerProductos() {
        const response: AppwriteResponse = await database.listDocuments(
            Appwrite.databaseId, Appwrite.collections.products
        )

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

    useEffect(() => {
        traerProductos()
    }, [])

    return (
        <>
            <h1>hola</h1>

            <Box as='form' w={300} onSubmit={crearProducto}>
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

            <hr />


            {
                products?.map(p => (
                    <div key={p.$id}>
                        <h1>
                            <Link to={`/products/appwrite/${p.$id}`}>{p.title}</Link>
                        </h1>
                        <b>S/. {p.price}</b>
                    </div>
                ))
            }
        </>
    )
}

export default Home