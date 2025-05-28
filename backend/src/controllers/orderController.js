import Order from '../models/OrderModel.js'
import Product from '../models/ProductModel.js'

//@desc     Create a new order
//@route    POST /api/orders
//@access   Private
export const createOrder = async (req, res) => {
    try {
        const { products, shippingAddress, paymentMethod } = req.body
        if(!products || products.length === 0) {
            return res.status(400).json({ error: 'No products in the order' })
        }
        const order = new Order({
            user: req.user._id,
            products,
            shippingAddress,
            paymentMethod,
            status: 'pending'
        })
        const savedOrder = await order.save()
        res.status(201).json(savedOrder)
    } catch (error) {
        res.status(500).json({ error: 'Failed to save order' })
    }
}

//@desc     Get logged-in user's orders
//@route    GET /api/orders/myorders
//@access   Private
export const getUserOrders = async (req, res) => {
    try {
        const orders = await Orders.find({
            user: req.user._id
        }).populate('products.product')
        res.json(orders)
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch orders' })
    }
}

//@desc     Get order by Id
//@route    GET /api/orders/:id
//@access   Private
export const getOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id).populate('user', 'name email').populate('products.product')
        if(!order) {
            return res.status(404).json({ error: 'Order not found' })
        }
        // Only owner or admin can access
        if(order.user._id.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
            return res.status(403).json({ error: 'Access denied - Not authorized' })
        }
        res.json(order);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch order' })
    }
}

//@desc     Get all orders (admin only)
//@route    GET /api/orders
//@access   Admin
export const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find().populate('user', 'name email')
        if(!orders) {
            return res.status(404).json({ error: 'No orders' })
        }
        res.json(orders)
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch orders' })
    }
}

//@desc     Update order status (admin only)
//@route    PUT /api/orders/:id/status
//@access   Admin
export const updateOrderStatus = async (req, res) => {
    try {
        const { status } = req.body
        const order = await Order.findById(req.params.id)
        if(!order) {
            return res.status(404).json({ error: "Order not found" })
        }
        order.status = status
        const updatedOrder = await order.save()
        res.json(updatedOrder)
    } catch (error) {
        res.status(500).json({ error: 'Failed to update order status' })
    }
}

//@desc     Delete order (admin only)
//@route    DELETE /api/orders/:id
//@access   Admin
export const deleteOrder = async (req, res) => {
    try {
        const order = await Order.findByIdAndDelete(req.params.id)
        if(!order) return res.status(404).json({ error: 'Order not found' })
        res.json({ message: 'Order deleted' })
    } catch (error) {
        return res.status(500).json({ error: 'Failed to delete order' })
    }
}

