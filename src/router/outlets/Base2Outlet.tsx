import BaseLayout from '../../shared/layouts/BaseLayout'
import { Outlet } from 'react-router-dom'

const Base2Outlet = () => {
    return (
        <BaseLayout>
            <Outlet />
        </BaseLayout>
    )
}

export default Base2Outlet