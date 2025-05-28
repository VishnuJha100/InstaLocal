import express from 'express'
import dotenv from 'dotenv'
import { connectDB } from './src/config/db.js'
import cors from 'cors'
import authRoutes  from './src/routes/authRoutes.js'
import userRoutes from './src/routes/userRoute.js'
import storeRoutes from './src/routes/storeRoute.js'
import productRoutes from './src/routes/productRoute.js'
import reviewRoutes from './src/routes/reviewRoute.js'
import orderRoutes from './src/routes/orderRoutes.js'

dotenv.config()
connectDB() // connecting to MongoDB database

const app = express()

// Middlewares
app.use(cors())
app.use(express.json())

// Routes
app.use('/api/auth', authRoutes)
app.use('/api/users', userRoutes)
app.use('/api/stores', storeRoutes)
app.use('/api/products', productRoutes)
app.use('/api/reviews', reviewRoutes)
app.use('/api/orders', orderRoutes)

app.get('/', (req, res) => {
    res.send('API is running...')
})

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})
