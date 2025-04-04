import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@chakra-ui/react'
import { Link, useLocation } from 'react-router-dom'

const RoutePath = () => {
    const { pathname } = useLocation()

    const newArreglo = pathname.split('/').filter(Boolean)

    return (
        <Breadcrumb>
            <BreadcrumbItem>
                <BreadcrumbLink to='/' as={Link}>Home</BreadcrumbLink>
            </BreadcrumbItem>

            {
                newArreglo.map(item => (
                    <BreadcrumbItem isCurrentPage key={item}>
                        <BreadcrumbLink>{item}</BreadcrumbLink>
                    </BreadcrumbItem>
                ))
            }

        </Breadcrumb>
    )
}

export default RoutePath