import { Box, Button, Divider, FormControl, FormHelperText, FormLabel, HStack, Input, Link, VStack } from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'

import bgRegister from './../../assets/bgRegister.jpg'
import { Paths } from '../../router/routes'
import { account, database, ID } from '../../lib/appwrite'
import { toast } from 'sonner'
import { Appwrite } from '../../lib/env'

import { useForm } from 'react-hook-form'
import { useRef } from 'react'

const Register = () => {
    const {
        register,
        watch,
        formState: { errors },
        handleSubmit
    } = useForm()

    const onSubmit = (data) => {
        console.log(data)
    }

    const formularioRef = useRef(null)

    console.log(watch('usuario'))

    const createAccount = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const formulario = e.currentTarget

        const data = new FormData(formulario)
        const { email, password, username } = Object.fromEntries(data.entries()) as {
            [k: string]: string
        }

        await account.create(ID.unique(), email, password, username).then(async () => {
            await database.createDocument(Appwrite.databaseId, Appwrite.collections.profile,
                ID.unique(), { name: username, email }).then(() => {
                    toast.success('Cuenta creada exitósamente', {
                        description: 'Cuenta y Perfil creada'
                    })
                })
        }).catch((e) => {
            toast.error('Error al crear tu cuenta', {
                description: 'Verifica tu correo, si persiste ponte en contácto con nosotros.'
            })
            console.log(e)
        })
    }

    return (
        <HStack w='100vw' h='100vh'>
            <Box w={500} bgImage={bgRegister} bgPos='center' bgSize='cover' h='100%' />

            <VStack w='calc(100% - 500px)'>
                <Box as='form' ref={formularioRef} onSubmit={handleSubmit(onSubmit)} w='300px' display='flex' flexDir='column' gap='2em'>
                    <FormControl isInvalid={errors.usuario ? true : false}>
                        <FormLabel>Nombre de usuario</FormLabel>
                        <Input type='text' {...register('usuario', {
                            required: {
                                value: true,
                                message: 'Esto es obligatorio'
                            },

                            minLength: {
                                value: 10,
                                message: 'Al menos 10 letras'
                            }
                        })} />
                        {
                            errors.usuario && <FormHelperText color='red'>{errors.usuario.message}</FormHelperText>
                        }
                    </FormControl>

                    <FormControl>
                        <FormLabel>Correo</FormLabel>
                        <Input type='text' {...register('correo', { required: true })} />
                    </FormControl>

                    <FormControl>
                        <FormLabel>Contraseña</FormLabel>
                        <Input type='password' name='password' />
                    </FormControl>

                    <Button type='submit' color='red' bgColor='darkred' _hover={{
                        bgColor: 'crimson',
                        color: 'darkred'
                    }} _active={{
                        color: 'blue'
                    }}>Ingresar</Button>

                    <Divider />

                    <Link as={RouterLink} to={Paths.Login} color='cyan.900' fontWeight='bold'>Ya tengo cuenta</Link>
                </Box>
            </VStack>
        </HStack>
    )
}

export default Register