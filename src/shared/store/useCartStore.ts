import { create } from 'zustand'
import { DummyProduct } from '../../declarations/Dummyjson'
import { toast } from 'sonner'

export type CartItem = {
    product: DummyProduct
    quantity: number
}

type Cart = {
    products: CartItem[]
    addToCart: (product: DummyProduct) => void
    deleteProduct: (productId: number) => void
    clearCart: () => void
    decreaseQuantity: (product: DummyProduct) => void
}

// prev == state

export const useCartStore = create<Cart>((set) => ({
    products: [],
    addToCart: (product: DummyProduct) => set((prev) => {
        toast.success('Producto agregado', {
            description: product.title
        })

        const exist = prev.products.find(item => item.product.id === product.id)

        if (exist) {
            return {
                products: prev.products.map(item => item.product.id == product.id ?
                    { ...item, quantity: item.quantity + 1 } : item
                )
            }
        } else {
            return { products: [...prev.products, { product, quantity: 1 }] }
        }
    }),

    decreaseQuantity: (product: DummyProduct) => set((prev) => {
        const exist = prev.products.find(item => item.product.id === product.id)

        if (exist?.quantity == 1) {
            return {
                products: prev.products.filter((item) => item.product.id !== exist.product.id)
            }
        } else {
            return {
                products: prev.products.map(item => item.product.id == product.id ?
                    { ...item, quantity: item.quantity - 1 } : item
                )
            }
        }

    }),

    deleteProduct: (productId: number) => set((prev) => ({
        products: prev.products.filter((item) => item.product.id !== productId)
    })),

    clearCart: () => set(() => ({
        products: []
    }))
}))