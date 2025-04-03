import { Account, Client, Databases, Storage, ID } from 'appwrite'
import { Appwrite } from './env'

const client = new Client()
client.setProject(Appwrite.projectId)

const database = new Databases(client) // la base de datos
const storage = new Storage(client) // el lugar que almacena todo tipo de archivos
const account = new Account(client) // quien nos permite hacer el login, registro y más

export {
    database, storage, account, ID
}