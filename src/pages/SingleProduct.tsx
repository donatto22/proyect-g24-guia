import { useLocation, useParams } from 'react-router-dom'
import useDummyjson from '../shared/hooks/useDummyjson'
import { useEffect, useState } from 'react'
import { DummyProduct } from '../declarations/Dummyjson'
import { QRCodeSVG } from 'qrcode.react'
import { Box } from '@chakra-ui/react'
import RoutePath from '../shared/components/RoutePath'

const SingleProduct = () => {
    const location = useLocation()
    const { id } = useParams()
    const [product, setProduct] = useState<DummyProduct>()

    const { getSingleProduct } = useDummyjson()

    const getProduct = async () => {
        const data = await getSingleProduct(Number(id))
        setProduct(data)
    }

    useEffect(() => {
        getProduct()
        console.log(location)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <Box>
            <RoutePath />
            <img src={product?.thumbnail} alt={product?.description} />
            <h3>{product?.title}</h3>

            <Box position='absolute' bottom='0' right='0' m='1em' bgColor='beige' p='1em' borderRadius='10px' boxShadow='0 30px 50px -10px gray'>
                <QRCodeSVG bgColor='beige' value={`http://localhost:5173${location.pathname}`} />
            </Box>
        </Box>
    )
}

export default SingleProduct