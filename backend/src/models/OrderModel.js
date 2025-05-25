import mongoose from 'mongoose'

const orderSchema = new mongoose.Schema({
    customer: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    },
    store: {
        type: mongoose.Types.ObjectId,
        ref: 'Store',
        required: true
    },
    items: [
        {
            product: {
                type: mongoose.Types.ObjectId,
                ref: 'Product'
            },
            quantity: {
                type: Number,
                required: true
            }
        }
    ],
    totalAmount: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'accepted', 'out-for-delivery', 'delivered', 'cancelled'],
        default: 'pending'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const Order = mongoose.model("Order", orderSchema)
export default Order