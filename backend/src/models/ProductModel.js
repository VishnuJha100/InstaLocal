import mongoose from 'mongoose'

const productSchema = new mongoose.Schema({
    store: {
        type: mongoose.Types.ObjectId,
        ref: 'Store',
        required: true
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    price: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        default: 0
    },
    category: {
        type: mongoose.Types.ObjectId,
        ref: 'Category'
    },
    image: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const Product = mongoose.model("Product", productSchema)
export default Product

// When creating or fetching products, we can .populate('category') for full category info