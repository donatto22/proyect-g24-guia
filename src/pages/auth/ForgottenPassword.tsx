import { Box, Button, FormControl, Heading, Input, Link, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'
import { Paths } from '../../router/routes'
import { account, ID } from '../../lib/appwrite'

const MagicModal = ({ isOpen, onClose }: {
    isOpen: boolean
    onClose: () => void
}) => {
    async function sendMagicLink(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()

        const formulario = e.currentTarget

        const data = new FormData(formulario)
        const { email } = Object.fromEntries(data.entries()) as {
            [k: string]: string
        }

        await account.createMagicURLToken(ID.unique(), email, 'http://localhost:5173/verify')
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent as='form' onSubmit={sendMagicLink}>
                <ModalHeader>Coloca tu correo</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <FormControl>
                        <Input type='text' name='email' placeholder='sample@gmail.com' />
                    </FormControl>
                </ModalBody>

                <ModalFooter>
                    <Button colorScheme='blue' mr={3} onClick={onClose}>
                        Cerrar
                    </Button>
                    <Button variant='ghost' type='submit'>Enviar Correo</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

const ForgottenPassword = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
        <Box>
            <Link as={RouterLink} to={Paths.Login}>Volver al login</Link>
            <Button onClick={onOpen}>
                <Heading>Ingresar con Link Mágico</Heading>
            </Button>

            <MagicModal isOpen={isOpen} onClose={onClose} />
        </Box>
    )
}

export default ForgottenPassword