import Review from '../models/ReviewModel.js'
import Product from '../models/ProductModel.js'
import verifyPurchase from '../utils/verifyPurchase.js'

//@desc     Create a review for a product
//@route    POST /api/reviews
//@access   Private (logged-in users)
export const createReview = async (req, res) => {
    const { productId, rating, comment } = req.body
    try {
        const product = await Product.findById(productId)
        if(!product) {
            return res.status(404).json({ error: 'Product not found' })
        }
        //Checking if user has pruchased this product
        const purchased = await verifyPurchase(req.user.id, productId);
        if (!purchased) {
            return res.status(403).json({ error: 'Only buyers can review the product' });
        }
        // Checking if user had alreayd reviewed the product
        const reviewed = await Review.findOne({
            product: productId,
            user: req.user.id,
        })
        if(reviewed) {
            return res.status(400).json({ error: 'You have already reviewed this product' })
        }
        const review = new Review({
            product: productId,
            user: req.user.id,
            rating,
            comment
        })
        await review.save()
        res.status(201).json(review)
    } catch (error) {
        res.status(500).json({ error: 'Failed to review' })
    }
}

//@desc     Get all reviews for a product
//@route    GET /api/reviews/product/:productId
//@access   Public
export const getReviewsByProduct = async (req, res) => {
    try {
        const reviews = await Review.find({ product: req.params.productId }).populate('user', 'name').sort({ createdAt: -1 })
        res.json(reviews)
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch reviews' })
    }
}

//@desc     Update a review
//@route    PUT /api/reviews/:id
//@access   Private (review owner or admin)
export const updateReview = async (req, res) => {
    try {
        const review = await Review.findById(req.params.id)
        if(!review) {
            return res.status(404).json({ error: 'Review not found' })
        }
        if(req.user.role !== 'admin' && review.user.toString() !== req.user.id) {
            return res.status(403).json({ error: 'Not authorized to update this review' })
        }
        review.rating = req.body.rating || review.rating
        review.comment = req.body.comment || review.comment
        await review.save()
        res.json(review)
    } catch (error) {
        res.status(500).json({ error: 'Failed to update review' })
    }
}

//@desc     Delete a review
//@route    DELETE /api/reviews/:id
//access    Private (owner or admin)
export const deleteReview = async (req, res) => {
    try {
        const review = await Review.findById(req.params.id)
        if(!review) {
            return res.status(404).json({ error: 'Review not found' })
        }
        if(req.user.role !== 'admin' && review.user.toString() !== req.user.id) {
            return res.status(403).json({ error: 'Not authorised to delete this review' })
        }
        await review.remove()
        res.json({ message: 'Review deleted' })
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete review' })
    }
}

