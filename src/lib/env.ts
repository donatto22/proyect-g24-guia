export const Appwrite = {
    projectId: import.meta.env.VITE_APPWRITE_PROJECT_ID,
    databaseId: import.meta.env.VITE_APPWRITE_DATABASE_ID,

    filesBucketId: import.meta.env.VITE_APPWRITE_FILES_BUCKET_ID,

    collections: {
        products: import.meta.env.VITE_APPWRITE_PRODUCTS_COLLECTION_ID,
        profile: import.meta.env.VITE_APPWRITE_PROFILE_COLLECTION_ID
    }
}