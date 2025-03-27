import { Box, Button, FormControl, FormLabel, Input } from '@chakra-ui/react'
import useDummyjson from '../../shared/hooks/useDummyjson'
import { toast } from 'sonner'
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const { dummyLogin } = useDummyjson()
    const navigate = useNavigate()

    const iniciarSesion = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const formulario = e.currentTarget

        if (formulario) {
            const data = new FormData(formulario)
            const { username, password } = Object.fromEntries(data.entries()) as {
                [k: string]: string
            }

            const dummySession = await dummyLogin(username, password)

            if (dummySession.message == 'Invalid credentials') {
                toast.error("Credenciales Invalidas")
            } else {
                localStorage.setItem("dummySession", JSON.stringify(dummySession))
                navigate('/')
            }
        }
    }

    return (
        <Box as='form' w='300px' onSubmit={iniciarSesion}>
            <FormControl>
                <FormLabel>Usuario</FormLabel>
                <Input type='text' name='username' required />
            </FormControl>

            <FormControl>
                <FormLabel>Contraseña</FormLabel>
                <Input type='password' name='password' required />
            </FormControl>

            <Button mt='1em' type='submit'>Ingresar</Button>
        </Box>
    )
}

export default Login