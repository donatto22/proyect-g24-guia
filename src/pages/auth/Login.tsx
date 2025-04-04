import { useNavigate, Link as RouterLink } from 'react-router-dom'
import useDummyjson from '../../shared/hooks/useDummyjson'
import { Box, Button, Divider, FormControl, FormLabel, HStack, Input, Link, VStack } from '@chakra-ui/react'
import { toast } from 'sonner'

import bgLogin from './../../assets/bg-login.jpg'

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
        <HStack w='100vw' h='100vh'>
            <Box w={500} bgImage={bgLogin} bgPos='center' bgSize='cover' h='100%' />

            <VStack w='calc(100% - 500px)'>
                <Box as='form' w='300px' onSubmit={iniciarSesion} display='flex' flexDir='column' gap='2em'>
                    <FormControl>
                        <FormLabel>Usuario</FormLabel>
                        <Input type='text' name='username' required />
                    </FormControl>

                    <FormControl>
                        <FormLabel>Contraseña</FormLabel>
                        <Input type='password' name='password' required />
                    </FormControl>

                    <Button type='submit' color='red' bgColor='darkred' _hover={{
                        bgColor: 'crimson',
                        color: 'darkred'
                    }} _active={{
                        color: 'blue'
                    }}>Ingresar</Button>

                    <Divider />

                    <Link as={RouterLink} color='cyan.900' fontWeight='bold'>Olvidaste tu contraseña?</Link>
                </Box>

            </VStack>
        </HStack>
    )
}

export default Login