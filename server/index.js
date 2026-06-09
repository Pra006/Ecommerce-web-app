import express from 'express'
import dotenv from 'dotenv'
import connectDB from './database/db.js'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import authrouter from './routes/auth/auth-routes.js'
import adminProductRouter from './routes/admin/products-routes.js'
import shopProductRouter from './routes/shop/products-route.js'
import shopCartRouter from "./routes/shop/cart-routes.js"
import shopAddressRouter from "./routes/shop/address-routes.js"
import shopOrderRouter from "./routes/shop/order-routes.js"


dotenv.config()
connectDB()

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Cache-Control'],
    credentials: true,
}))
app.use(cookieParser())
app.use('/api/auth', authrouter)
app.use('/api/admin/products', adminProductRouter)
app.use('/api/shop/products', shopProductRouter)
app.use('/api/shop/cart', shopCartRouter)
app.use('/api/shop/address', shopAddressRouter)
app.use('/api/shop/order', shopOrderRouter)

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})
