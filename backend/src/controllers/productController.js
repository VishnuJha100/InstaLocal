import Product from '../models/ProductModel.js'
import Store from '../models/StoreModel.js'

//@desc     Create a product
//@route    POST /api/products
//@access   Private(store owner or admin)
export const createProduct = async (req, res) => {
    const { name, description, price, image, stock, storeId, category, tags } = req.body
    try {
        const store = await Store.findById(storeId)
        if(!store) {
            return res.status(404).json({ error: 'Store not found' })
        }
        if(req.user.role !== 'admin' && store.owner.toString() !== req.user.id) {
            return res.status(403).json({ error: 'Not authorized to add product to this store' })
        }
        const product = new Product({
            name,
            description,
            price,
            image,
            stock,
            store: storeId,
            category,
            tags
        })
        await product.save()
        res.status(201).json(product)
    } catch (error) {
        res.status(500).json({ error: 'Product creation failed' })
    }
}

//@desc     Get all products or filter by store or category
//@route    GET api/products?storeId=&category=
//access    Public
export const getAllProducts = async (req, res) => {
    try {
        const filter = {}
        if(req.query.storyId) {
            filter.store = req.query.storeId
        }
        if(req.query.category) {
            filter.category = req.query.category
        }
        const products = await Product.find(filter).populate('store', 'name').populate('category', 'name')
        res.json(products)
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch products' })
    }
}

//@desc     Get single product by Id
//@route    GET /api/products/:id
//@access   Public
export const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id).populate('store', 'name').populate('category', 'name')
        if(!product) {
            return res.status(404).json({ error: 'Product not found' })
        }
        res.json(product)
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch product' })
    }
}

//@desc     Update a product
//@route    PUT /api/products/:id
//@access   Private (store owner or admin)
export const updateProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id).populate('store')
        if(!product) {
            return res.status(404).json({ error: 'No product found' })
        }
        if(req.user.role !== 'admin' && product.store.owner.toString() !== req.user.id) {
            return res.status(403).json({ error: 'Not authorized to update this product' })
        }
        Object.assign(product, req.body)
        await product.save()
        res.json(product)
    } catch (error) {
        res.status(500).json({ error: 'Failed to update product' })
    }
}

//@desc     Delete a product
//@route    DELETE /api/products/:id
//@access   Private (store owner or admin)
export const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id).populate('store')
        if(!product) {
            return res.status(404).json({ error: 'Product not found' })
        }
        if(req.user.role !== 'admin' && product.store.owner.toString() !== req.user.id) {
            return res.status(403).json({ error: 'Not authorized to delete this product' })
        }
        await product.remove()
        res.json({ message: 'Product deleted' })
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete product' })
    }
}