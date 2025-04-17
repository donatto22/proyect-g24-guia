import { Route, Routes } from 'react-router-dom'
import BaseOutlet from './outlets/BaseOutlet'
import AuthOutlet from './outlets/AuthOutlet'

import { Elements, Paths } from './routes'
import ForgottenPassword from '../pages/auth/ForgottenPassword'
import Verify from '../pages/auth/Verify'
import FormArchivo from '../pages/FormArchivo'
import Base2Outlet from './outlets/Base2Outlet'


const { Home, Products, SingleProduct, AppwriteProduct, Payment, Login, Register, Error404, Receipt } = Elements

const AppRoutes = () => {
    return (
        <Routes>
            <Route element={<BaseOutlet />}>
                <Route element={<Base2Outlet />}>
                    <Route path={Paths.Home} element={<Home />} />
                    <Route path={Paths.FormArchivo} element={<FormArchivo />} />

                    <Route path={Paths.Products}>
                        <Route index element={<Products />} />
                        <Route path={Paths.SingleProduct} element={<SingleProduct />} />
                        <Route path={Paths.AppwriteProduct} element={<AppwriteProduct />} />
                    </Route>
                </Route>

                <Route path={Paths.Receipt} element={<Receipt />} />
                <Route path={Paths.Payment} element={<Payment />} />
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