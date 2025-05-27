import express from 'express'
import { getAllUsers, getUserById, updateUser, deleteUser } from '../controllers/userController.js'
import { protect, authorize } from '../middleware/authMiddleware.js'

const router = express.Router()

//  Get all users (admin only)
router.get('/', protect, authorize('admin'), getAllUsers)

//  Get user by Id - self or admin
router.get('/:id', protect, getUserById)

//  Update user - self or admin
router.put('/;id', protect, updateUser)

//  Delete user - self or admin
router.delete('\:id', protect, deleteUser)

export default router