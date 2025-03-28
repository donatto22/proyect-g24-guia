import { ReactElement } from 'react'
import Navbar from '../components/nav/Navbar'

const BaseLayout = ({ children }: {
    children: ReactElement
}) => {
    return (
        <>
            <Navbar />
            {children}
        </>
    )
}

export default BaseLayout