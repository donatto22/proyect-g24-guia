import { Navigate, Outlet } from 'react-router-dom'
import { Paths } from '../routes'

const BaseOutlet = () => {
    const session = localStorage.getItem('appwriteSessionId')

    return (
        session ? <Outlet /> : <Navigate to={Paths.Login} />
    )
}

export default BaseOutlet