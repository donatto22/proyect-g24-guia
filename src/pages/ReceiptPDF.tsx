import { Document, Page, Text, StyleSheet } from '@react-pdf/renderer'
import { CartItem } from '../shared/store/useCartStore'

const estilos = StyleSheet.create({
    pagina: {
        color: 'red'
    }
})

const ReceiptPDF = ({ products }: {
    products: CartItem[]
}) => {
    return (
        <Document>
            <Page size='A4' style={estilos.pagina}>
                {
                    products.map((item) => (
                        <Text>{item.product.title}</Text>
                    ))
                }
            </Page>
        </Document>
    )
}

export default ReceiptPDF