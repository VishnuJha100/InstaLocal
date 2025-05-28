import express from 'express'
import { createOrder, getOrderById, getUserOrders, getAllOrders, updateOrderStatus, deleteOrder } from '../controllers/orderController.js'
import { protect, authorize } from '../middleware/authMiddleware.js'

const router = express.Router()

// Create order
router.post('/', protect, createOrder)

// User orders
router.get('/myorders', protect, getUserOrders)

// Get order by Id
router.get('/:id', protect, getOrderById)

// Admin operations
router.get('/', protect, authorize('admin'), getAllOrders)
router.put('/:id/status', protect, authorize('admin'), updateOrderStatus)
router.delete('/:id', protect, authorize('admin'), deleteOrder)

export default router