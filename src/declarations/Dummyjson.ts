type Review = {
    rating: number
    comment: string
    date: string
    reviewerName: string
}

type DummyProductDimensions = {
    width: number
    height: number
    depth: number
}

export type DummyProduct = {
    id: number
    title: string
    description: string
    category: string
    price: number
    rating: number
    tags: Array<string>
    brand: string
    dimensions: DummyProductDimensions
    reviews: Array<Review>
    images: Array<string>
    thumbnail: string
}

export type DummyResult = {
    limit: number
    products: Array<DummyProduct>
}