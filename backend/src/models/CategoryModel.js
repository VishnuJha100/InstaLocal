import mongoose from 'mongoose'

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String
    },
    image: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const Category = mongoose.model("Category", categorySchema)
export default Category

// We can use this to organise products by category (like fruits, sancks, beverages, etc)