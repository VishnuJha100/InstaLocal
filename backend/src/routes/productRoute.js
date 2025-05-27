import express from 'express'
import { createProduct, getAllProducts, getProductById, updateProduct, deleteProduct } from '../controllers/productController.js'
import { protect, authorize } from '../middleware/authMiddleware.js'

const router = express.Router()

//  Public routes
router.get('/', protect, getAllProducts)
router.get('/:id', protect, getProductById)

//  Protected routes (store-owner or admin)
router.post('/', protect, createProduct)
router.put('/:id', protect, updateProduct)
router.delete('/:id', protect, deleteProduct)

export default router