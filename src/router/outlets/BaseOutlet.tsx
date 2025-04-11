import { Navigate, Outlet } from 'react-router-dom'
import BaseLayout from '../../shared/layouts/BaseLayout'
import { Paths } from '../routes'
const BaseOutlet = () => {
    const session = localStorage.getItem('appwriteSessionId')

    return (
        session ? <BaseLayout>
            <Outlet />
        </BaseLayout> : <Navigate to={Paths.Login} />
    )
}

export default BaseOutlet