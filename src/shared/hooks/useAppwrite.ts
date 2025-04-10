import { database, storage, account, ID } from '../../lib/appwrite'

const useAppwrite = () => {
    const fromDatabase = (databaseId: string) => {
        const collection = (collectionId: string) => {
            const getDocuments = async (queries?: string[]) => {
                return await database.listDocuments(databaseId, collectionId, queries)
            }

            const getDocumentById = async (documentId: string) => {
                return await database.getDocument(databaseId, collectionId, documentId)
            }

            const createDocument = async (data: object, id?: string) => {
                if (id) {
                    return await database.createDocument(databaseId, collectionId, id, data)
                } else {
                    return await database.createDocument(databaseId, collectionId, ID.unique(), data)
                }
            }

            const updateDocument = async (documentId: string, data: object) => {
                return await database.updateDocument(databaseId, collectionId, documentId, data)
            }

            const deleteDocument = async (documentId: string) => {
                return await database.deleteDocument(databaseId, collectionId, documentId)
            }

            return {
                getDocumentById, getDocuments, createDocument, updateDocument, deleteDocument
            }
        }

        return {
            collection
        }
    }

    const fromStorage = () => {
        const bucket = (bucketId: string) => {
            const createFile = async (fileId: string, file: File) => {
                return await storage.createFile(bucketId, fileId, file)
            }

            const deleteFile = async (fileId: string) => {
                return await storage.deleteFile(bucketId, fileId)
            }

            // getFile returns an object with file data
            // getFileDownload returns the file url and downloads the file
            // getFilePreview returns the file url
            // getFileView returns the file url

            const getFile = async (fileId: string) => {
                const file = await storage.getFile(bucketId, fileId)
                const downloadUrl = storage.getFileDownload(bucketId, fileId)
                const previewUrl = storage.getFilePreview(bucketId, fileId)

                return { file, downloadUrl, previewUrl }
            }

            const updateFileName = async (fileId: string, name: string) => {
                return await storage.updateFile(bucketId, fileId, name)
            }

            return {
                createFile, deleteFile, getFile, updateFileName
            }
        }

        return {
            bucket
        }
    }

    const fromSession = () => {
        const login = async (email: string, password: string) => {
            return await account.createEmailPasswordSession(email, password)
        }

        const createSession = async (userId: string, secret: string) => {
            return await account.createSession(userId, secret)
        }

        const deleteSession = async (sessionId: string) => {
            return await account.deleteSession(sessionId)
        }

        const deleteAllSessions = async () => {
            return await account.deleteSessions()
        }

        const listSessions = async () => {
            return await account.listSessions()
        }

        /**
         * Also known as "signup"
         */
        const createAccount = async (email: string, password: string, name?: string) => {
            return await account.create(ID.unique(), email, password, name)
        }

        return {
            login, deleteSession, createAccount,
            deleteAllSessions, createSession, listSessions
        }
    }

    const update = () => {
        /**
         * @param phone Dont forget to add the country code
         * @param password Requires minimum 8 characters length
         * @throws {AppwriteException}
         */
        const phone = async (phone: string, password: string) => {
            return await account.updatePhone(phone, password)
        }

        const password = async (password: string, oldPassword: string) => {
            return await account.updatePassword(password, oldPassword)
        }

        const email = async (email: string, password: string) => {
            return await account.updateEmail(email, password)
        }

        const name = async (name: string) => {
            return await account.updateName(name)
        }

        return {
            email, password, phone, name
        }
    }

    const verificate = () => {
        const phone = async () => {
            return await account.createPhoneVerification()
        }

        const email = async (url: string) => {
            return await account.createVerification(url)
        }

        const updatePhoneVerification = async (secret: string) => {
            const { $id } = await account.get()
            return await account.updatePhoneVerification($id, secret)
        }

        const updateEmailVerification = async (secret: string) => {
            const { $id } = await account.get()
            return await account.updateVerification($id, secret)
        }

        return { phone, email, updatePhoneVerification, updateEmailVerification }
    }

    const createPasswordRecovery = async (email: string, url: string) => {
        return await account.createRecovery(email, url)
    }

    const createPhoneToken = async (phone: string) => {
        return await account.createPhoneToken(ID.unique(), phone)
    }

    return {
        account, fromDatabase, fromStorage, verificate, fromSession, createPhoneToken,
        update, createPasswordRecovery
    }
}

export default useAppwrite