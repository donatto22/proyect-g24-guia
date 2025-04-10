import { ComponentType, useEffect, useState } from 'react'
import { DummyProduct } from '../../declarations/Dummyjson'

// Función - recibe un componente - devuelve un componente

type Props = {
    counter: number
    setCounter: React.Dispatch<React.SetStateAction<number>>
}

const pruebaHOC = (ComponenteModificar: ComponentType & Props) => {
    return (props: Props) => {
        const [products, setProducts] = useState<Array<DummyProduct>>()

        useEffect(() => {
            const getProducts = async () => {
                const response = await fetch('https://dummyjson.com/products')
                const data = await response.json()

                setProducts(data.products)
            }

            getProducts()
        }, [])

        return (
            <ComponenteModificar {...props} products={products} />
        )
    }
}

const Contador = ({ products }: {
    products: Array<DummyProduct>
}) => {
    return (
        <div>
            {
                products?.map((p) => (
                    <h1>{p.title}</h1>
                ))
            }
        </div>
    )
}

export const ContadorConStateDesdeElHoc = pruebaHOC(Contador)