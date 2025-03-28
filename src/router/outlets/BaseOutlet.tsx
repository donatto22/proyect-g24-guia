import { Outlet } from 'react-router-dom'
import BaseLayout from '../../shared/layouts/BaseLayout'

const BaseOutlet = () => {
    return (
        <BaseLayout>
            <Outlet />
        </BaseLayout>
    )
}

export default BaseOutlet