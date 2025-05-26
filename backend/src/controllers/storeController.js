import Store from '../models/StoreModel.js'

//@desc     Create a store
//@route    POST /api/stores
//@access   Private (store owner or admin)
exports.createStore = async (req, res) => {
    const { name, description, image, location } = req.body
    try {
        const existing = await Store.findOne({ owner: req.user.id })
        if(existing) {
            return res.status(400).json({ error: 'User already owns a store' })
        }
        const store = new Store({
            name,
            description,
            image,
            location,
            owner: req.user.id
        })
        await store.save()
        res.status(201).json(store)
    } catch (error) {
        res.status(500).json({ error: 'Failed to create store' })
    }
}

//@desc     Get all stores
//@route    GET /api/stores
//@access   Public
exports.getAllStores = async (req, res) => {
    try {
        const stores = await Store.find().populate('owner', 'name', 'email')
        res.json(stores)
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch stores' })
    }
}

//@desc     Get single store by Id
//@route    GET /api/stores
//access    Public
exports.getStoreById = async (req, res) => {
    try {
        const store = await Store.findById(req.params.id).populate('owner', 'name email')
        if(!store) {
            return res.status(404).json({ error: 'Store not found' })
        }
        res.json(store)
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch store' })
    }
}

//@desc     Update store
//@route    PUT /api/stores/:id
//@access   Private (owner or admin)
exports.updateStore = async (req, res) => {
    try {
        const store = await Store.findById(req.params.id)
        if(!store) {
            return res.status(404).json({ error: 'Store not found' })
        }
        // Only owner or admin can update
        if(req.user.role !== 'admin' && store.owner.toString() !== req.user.id) {
            return res.status(403).json({ error: 'Not authorized' })
        }
        const updates = req.body
        Object.assign(store, updates)
        await store.save()
        res.json(store)
    } catch (error) {
        res.status(500).json({ error: 'Store update failed' })
    }
}

//@desc     Delete store
//@route    DELETE /api/stores/:id
//@access   Private (owner or admin)
exports.deleteStore = async (req, res) => {
    try {
        const store = await Store.findById(req.params.id)
        if(!store) {
            return res.status(404).json({ error: 'Store not found' })
        }
        // Only owner or admin can delete
        if(req.user.role !== 'admin' && store.owner.toString() !== req.user.id) {
            return res.status(403).json({ error: 'Not authorized' })
        }
        await store.remove()
        res.json({ message: 'Store deleted' })
    } catch (error) {
        res.status(500).json({ error: 'Store deletion failed'})
    }
}

//@desc     Approve a store (admin only)
//@route    PATCH /api/stores/:id/verify
//@access   Private (admin)
exports.approveStore = async (req, res) => {
    try {
        const store = await Store.findById(req.params.id)
        if(!store) {
            return res.status(404).json({ error: 'Store not found' })
        }
        store.isApproved = true
        await store.save()
        res.json({ message: 'Store is approved', store })
    } catch (error) {
        res.status(500).json({ error: 'Failed to approve store' })
    }
}
