import { lazy } from 'react'
import LoaderHOC from '../shared/layouts/LoaderHOC'

export const Elements = {
    Home: LoaderHOC(lazy(() => import('../pages/Home'))),
    Login: LoaderHOC(lazy(() => import('../pages/auth/Login'))),
    Register: LoaderHOC(lazy(() => import('../pages/auth/Register'))),
    Error404: LoaderHOC(lazy(() => import('../pages/Error404'))),
    SingleProduct: LoaderHOC(lazy(() => import('../pages/SingleProduct'))),
    Products: LoaderHOC(lazy(() => import('../pages/Products'))),
    AppwriteProduct: LoaderHOC(lazy(() => import('../pages/AppwriteProduct')))
}

export const Paths = {
    Home: '/',

    Products: '/products',
    SingleProduct: ':id',
    AppwriteProduct: 'appwrite/:id',

    Login: '/login',
    Register: '/register',
    ForgottenPassword: '/options',
    Verify: '/verify',
    FormArchivo: '/file'
}