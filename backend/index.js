import express from 'express'
import dotenv from 'dotenv'
import { connectDB } from './src/config/db.js'

dotenv.config()
connectDB() // connecting to MongoDB database