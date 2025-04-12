import { createContext, ReactNode, useEffect, useState } from 'react'
import { Profile } from '../../declarations/AppwriteTypes'
import { Models, Query } from 'appwrite'
import { account as AppwriteAccount } from '../../lib/appwrite'
import useAppwrite from '../hooks/useAppwrite'
import { Appwrite } from '../../lib/env'
import { useNavigate } from 'react-router-dom'
import { Paths } from '../../router/routes'
import { toast } from 'sonner'

type UsuarioContexto = {
    profile: Profile
    account: Models.User<Models.Preferences>
    appwriteSession: string
    login: (email: string, password: string) => void
}

export const usuarioContexto = createContext<UsuarioContexto | null>(null)

export const UserProvider = ({ children }: { children: ReactNode }) => {
    const appwriteSession = localStorage.getItem('appwriteSessionId')

    const [profile, setProfile] = useState<Profile>()
    const [account, setAccount] = useState<Models.User<Models.Preferences>>()

    const navigate = useNavigate()

    const { fromDatabase } = useAppwrite()
    const profileCollection = fromDatabase(Appwrite.databaseId).collection(Appwrite.collections.profile)

    const getAccount = async () => {
        setAccount(await AppwriteAccount.get())
    }

    const getProfile = async () => {
        const { documents } = await profileCollection.getDocuments([
            Query.equal('email', (await AppwriteAccount.get()).email)
        ])

        setProfile((documents[0] as Profile))
    }

    const loadData = async () => {
        await getAccount()
        await getProfile()
    }

    const login = async (email: string, password: string) => {
        await AppwriteAccount.createEmailPasswordSession(email, password).then((session) => {
            localStorage.setItem('appwriteSessionId', session.$id)
            navigate(Paths.Home)
            toast.success('Login exitoso')
        })

        await loadData()
    }



    useEffect(() => {
        if (localStorage.getItem('appwriteSessionId')) {
            loadData()
        }
    }, [])

    return (
        <usuarioContexto.Provider value={{ profile, account, appwriteSession, login }}>
            {children}
        </usuarioContexto.Provider>
    )
}