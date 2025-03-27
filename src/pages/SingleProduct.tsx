import { useParams } from 'react-router-dom'
import useDummyjson from '../shared/hooks/useDummyjson'
import { useEffect, useState } from 'react'
import { DummyProduct } from '../declarations/Dummyjson'

const SingleProduct = () => {
    const { id } = useParams()
    const [product, setProduct] = useState<DummyProduct>()

    const { getSingleProduct } = useDummyjson()

    const getProduct = async () => {
        const data = await getSingleProduct(Number(id))
        setProduct(data)
    }

    useEffect(() => {
        getProduct()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div>
            <img src={product?.thumbnail} alt={product?.description} />
            <h3>{product?.title}</h3>
        </div>
    )
}

export default SingleProduct