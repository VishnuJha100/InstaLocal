import { v2 as cloudinary } from 'cloudinary'
import { config } from 'dotenv'
import { CloudinaryStorage } from 'multer-storage-cloudinary'

config()

//configure cloudinary with credentials
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})

// storage config for multer + cloudinary
const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: 'InstaLocal', // optional folder name in cloudinary
        allowed_formats: ['jpg', 'jpeg', 'png'],
        transformation: [{ width: 500, height: 500, crop: 'limit' }]
    }
})

export { cloudinary, storage }