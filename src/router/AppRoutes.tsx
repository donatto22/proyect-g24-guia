import { Route, Routes } from 'react-router-dom'
import BaseOutlet from './outlets/BaseOutlet'
import AuthOutlet from './outlets/AuthOutlet'

import { Elements, Paths } from './routes'
import ForgottenPassword from '../pages/auth/ForgottenPassword'
import Verify from '../pages/auth/Verify'

const { Home, Products, SingleProduct, AppwriteProduct, Login, Register, Error404 } = Elements

const AppRoutes = () => {
    return (
        <Routes>
            <Route element={<BaseOutlet />}>
                <Route path={Paths.Home} element={<Home />} />

                <Route path={Paths.Products}>
                    <Route index element={<Products />} />
                    <Route path={Paths.SingleProduct} element={<SingleProduct />} />
                    <Route path={Paths.AppwriteProduct} element={<AppwriteProduct />} />
                </Route>
            </Route>

            <Route element={<AuthOutlet />}>
                <Route path={Paths.Login} element={<Login />} />
                <Route path={Paths.Register} element={<Register />} />
                <Route path={Paths.ForgottenPassword} element={<ForgottenPassword />} />
                <Route path={Paths.Verify} element={<Verify />} />
            </Route>

            <Route path='*' element={<Error404 />} />
        </Routes>
    )
}

export default AppRoutes