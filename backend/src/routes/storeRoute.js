import express from 'express'
import { createStore, getAllStores, getStoreById, updateStore, deleteStore, approveStore } from '../controllers/storeController.js'
import { protect, authorize } from '../middleware/authMiddleware.js'

const router = express.Router()

//  Public route
router.get('/', getAllStores)
router.get('/:id', getStoreById)

//  Protected routes (store owner or admin)
router.post('/', protect, createStore)
router.put('/:id', protect, updateStore)
router.delete('/:id', protect, deleteStore)

// Admin-only route to approve stores
router.patch('/:id/approve', protect, authorize('admin'), approveStore)

export default router