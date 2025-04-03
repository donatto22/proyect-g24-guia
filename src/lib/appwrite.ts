import { Account, Client, Databases, Storage, ID } from 'appwrite'

const client = new Client()
client.setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID)

const database = new Databases(client) // la base de datos
const storage = new Storage(client) // el lugar que almacena todo tipo de archivos
const account = new Account(client) // quien nos permite hacer el login, registro y más

export {
    database, storage, account, ID
}