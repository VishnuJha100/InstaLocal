import mongoose from 'mongoose'

const reviewSchema = new mongoose.Schema({
    product: {
        type: mongoose.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    },
    rating: {
        type: Number,
        min: 1,
        max: 5,
        required: true
    },
    comment: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    },  
})

// validate that either a product or a store is reviewed, but not both null
reviewSchema.pre('validate', function(next) {
    if(!this.product && !this.store) {
        next(new Error('A review must be linked to either a product or a store.'))
    } else {
        next()
    }
})

const Review = mongoose.model("Review", reviewSchema)
export default Review

// This allows customers to leave reviews for products (or later even for stores if you want)