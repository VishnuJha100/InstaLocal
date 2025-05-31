import express from 'express'
import { register, login, getMe, logout } from '../controllers/authController.js'
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router()

// Register new user
router.post('/register', register)

// Login user
router.post('/login', login)

// Get current logged-in user
router.get('/me', protect, getMe)

// Logout current logged-in user
router.post('/logout', logout)
 
export default router