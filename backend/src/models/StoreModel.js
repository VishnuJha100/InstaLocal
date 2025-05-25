import mongoose from 'mongoose'

const storeSchema = new mongoose.Schema({
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    },
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    phone: {
        type: String
    },
    isApproved: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const Store = mongoose.model("Store", storeSchema)
export default Store