import { Navigate, Outlet } from 'react-router-dom'

const AuthOutlet = () => {
    const session = localStorage.getItem('dummySession')

    return (
        session ? <Navigate to='/' /> : <Outlet />
    )
}

export default AuthOutlet