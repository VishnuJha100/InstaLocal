import Order from '../models/OrderModel.js'

async function verifyPurchase(userId, productId) {
    const orders = await Order.find({
        user: userId,
        status: {$in: ['delivered']},
        'products.product' : productId,
    })
    return orders.length > 0
}

export default verifyPurchase