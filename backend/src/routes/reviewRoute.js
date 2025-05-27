import express from 'express'
import { createReview, getReviewsByProduct, updateReview, deleteReview } from '../controllers/reviewController.js'
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router()

//  Create a review (authenticated users)
router.post('/', protect, createReview)

//  Get all reviews for a specific product (public)
router.get('/product/:productId', protect, getReviewsByProduct)

//  Update a review (review owner or admin)
router.put('/:id', protect, updateReview)

//  Delete a review (review owner or admin)
router.delete('/:id', protect, deleteReview)

export default router