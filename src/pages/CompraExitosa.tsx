import { Box } from '@chakra-ui/react'
import { PDFDownloadLink } from '@react-pdf/renderer'
import ReceiptPDF from './ReceiptPDF'
import { useCartStore } from '../shared/store/useCartStore'

const CompraExitosa = () => {
    const { products } = useCartStore()

    return (
        <Box m='2em 0' w='100%'>
            <PDFDownloadLink document={<ReceiptPDF products={products} />} fileName='Boleta de compra'>
                Descargar
            </PDFDownloadLink>
        </Box>
    )
}

export default CompraExitosa