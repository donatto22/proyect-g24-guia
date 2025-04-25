import { Link as RouterLink } from 'react-router-dom'
import { Box, Button, Divider, FormControl, FormLabel, HStack, Input, Link, VStack } from '@chakra-ui/react'

import bgLogin from './../../assets/bg-login.jpg'
import { Paths } from '../../router/routes'
import { useContext, useEffect, useRef } from 'react'
import { usuarioContexto } from '../../shared/context/UserContext'

import { useDropzone } from 'react-dropzone'
import { createSwapy, Swapy } from 'swapy'
import FondoAnimado from 'src/shared/components/FondoAnimado'


const Login = () => {
    const userContext = useContext(usuarioContexto)
    const { acceptedFiles, getRootProps, getInputProps } = useDropzone()

    const iniciarSesion = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const formulario = e.currentTarget

        if (formulario) {
            const data = new FormData(formulario)
            const { email, password } = Object.fromEntries(data.entries()) as {
                [k: string]: string
            }

            console.log(email, password)

            await userContext.login(email, password)
        }
    }

    const files = acceptedFiles.map(file => {
        console.log(file)

        return (
            <li key={file.path}>
                {file.path} - {file.size} bytes
            </li>
        )
    })

    const swapy = useRef<Swapy>(null)
    const container = useRef(null)

    useEffect(() => {
        // If container element is loaded
        if (container.current) {
            swapy.current = createSwapy(container.current)

            // Your event listeners
            swapy.current.onSwap((event) => {
                console.log('swap', event.newSlotItemMap.asArray);
            })
        }

        return () => {
            // Destroy the swapy instance on component destroy
            swapy.current?.destroy()
        }
    }, [])

    return (
        <HStack w='100vw' h='100vh'>
            <Box w={500} height='100%'>
                <FondoAnimado />
            </Box>
            {/* <Box w={500} bgImage={bgLogin} bgPos='center' bgSize='cover' h='100%' /> */}

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

                <FormControl>
                    <FormLabel>Ejemplo</FormLabel>
                    <Input type='text' required onChange={(e) => {
                        const regex = /^(1[89]|[2-9][0-9])$/

                        console.log(e.target.value)

                        if (regex.test(e.target.value)) {
                            console.log('es válido')
                        } else {
                            console.log('no es válido')
                        }
                    }} />
                </FormControl>


                {/* <input type="file" name="" id="" onChange={(e) => {
                    console.log(e.target.files)
                }} />

                <hr />

                <div ref={container}>

                    <div data-swapy-slot="orden1">
                        <div data-swapy-item="a">
                            <div>A</div>
                        </div>
                    </div>

                    <div data-swapy-slot="orden2">
                        <div data-swapy-item="b">
                            <div>B</div>
                        </div>
                    </div>

                </div>

                <hr />


                <section className="container">
                    <Box color='red' {...getRootProps({ className: 'dropzone' })}>
                        <input {...getInputProps()} />
                        <p>Drag 'n' drop some files here, or click to select files</p>
                    </Box>
                    <aside>
                        <h4>Files</h4>
                        <ul>{files}</ul>
                    </aside>
                </section> */}
            </VStack>

        </HStack>
    )
}

export default Login