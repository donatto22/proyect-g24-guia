import { Route, Routes } from 'react-router-dom'
import Home from '../pages/Home'
import Login from '../pages/auth/Login'
import Register from '../pages/auth/Register'
import Error404 from '../pages/Error404'
import AuthOutlet from './outlets/AuthOutlet'
import SingleProduct from '../pages/SingleProduct'

const AppRoutes = () => {
    return (
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/products/:id' element={<SingleProduct />} />

            <Route element={<AuthOutlet />}>
                <Route path='/login' element={<Login />} />
                <Route path='/register' element={<Register />} />
            </Route>
            <Route path='*' element={<Error404 />} />
        </Routes>
    )
}

export default AppRoutes