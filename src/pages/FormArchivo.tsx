import { Box, Button, FormControl, FormLabel, Image, Input } from '@chakra-ui/react'
import { account, ID } from '../lib/appwrite'
import { Appwrite } from '../lib/env'
import { toast } from 'sonner'
import useAppwrite from '../shared/hooks/useAppwrite'
import { useContext, useState } from 'react'
import { Query } from 'appwrite'
import { Profile } from '../declarations/AppwriteTypes'
import { usuarioContexto } from '../shared/context/UserContext'

type FormEntries = {
    archivo: File
}

const FormArchivo = () => {
    const [imageUrl, setImageUrl] = useState<string>('')

    const { fromStorage, fromDatabase } = useAppwrite()
    const { createFile, getFile } = fromStorage().bucket(Appwrite.filesBucketId)

    const contexto = useContext(usuarioContexto)

    console.log(contexto)

    const profileCollection = fromDatabase(Appwrite.databaseId).collection(Appwrite.collections.profile)

    const subirArchivo = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const formulario = e.currentTarget

        const data = new FormData(formulario)
        const { archivo } = Object.fromEntries(data.entries()) as FormEntries

        await createFile(ID.unique(), archivo).then(async (response) => {
            const uploadedFile = await getFile(response.$id)

            setImageUrl(`${uploadedFile.previewUrl}&mode=admin`)

            const profile = await profileCollection.getDocuments([
                Query.equal('email', (await account.get()).email)
            ])

            profileCollection.updateDocument((profile.documents[0] as Profile).$id, {
                profilePhoto: `${uploadedFile.previewUrl}&mode=admin`
            }).then(() => {
                toast.success('Foto actualizada')
            })
        }).catch(() => {
            toast.error('Hubo un error al subir el archivo')
        })
    }

    return (
        <Box as='form' onSubmit={subirArchivo}>
            <FormControl>
                <FormLabel>Selecciona tu archivo</FormLabel>
                <Input type='file' name='archivo' />
            </FormControl>

            <Button type='submit'>Subir Archivo</Button>

            {
                imageUrl && <Image src={imageUrl} loading='lazy' />
            }
        </Box>
    )
}

export default FormArchivo