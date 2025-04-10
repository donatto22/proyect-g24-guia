import { useNavigate, Link as RouterLink } from 'react-router-dom'
import { Box, Button, Divider, FormControl, FormLabel, HStack, Input, Link, VStack } from '@chakra-ui/react'
import { toast } from 'sonner'

import bgLogin from './../../assets/bg-login.jpg'
import { account } from '../../lib/appwrite'
import { Paths } from '../../router/routes'

const Login = () => {
    const navigate = useNavigate()

    const iniciarSesion = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const formulario = e.currentTarget

        if (formulario) {
            const data = new FormData(formulario)
            const { email, password } = Object.fromEntries(data.entries()) as {
                [k: string]: string
            }

            await account.createEmailPasswordSession(email, password).then((response) => {
                localStorage.setItem('appwriteSessionId', response.$id)
                toast.success('Has iniciado sesión')
                navigate(Paths.Home)
            }).catch(() => {
                toast.error('Hubo un error al iniciar sesión')
            })
        }
    }

    return (
        <HStack w='100vw' h='100vh'>
            <Box w={500} bgImage={bgLogin} bgPos='center' bgSize='cover' h='100%' />

            <VStack w='calc(100% - 500px)'>
                <Box as='form' w='300px' onSubmit={iniciarSesion} display='flex' flexDir='column' gap='2em'>
                    <FormControl>
                        <FormLabel>Correo</FormLabel>
                        <Input type='text' name='email' required />
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

                    <FormControl textAlign='right'>
                        <Link as={RouterLink} to={Paths.Register} color='cyan.900' fontWeight='bold'>Crear nueva cuenta</Link>
                    </FormControl>

                    <Divider />

                    <Link as={RouterLink} color='cyan.900' fontWeight='bold' to={Paths.ForgottenPassword}>Olvidaste tu contraseña?</Link>
                </Box>
            </VStack>
        </HStack>
    )
}

export default Login