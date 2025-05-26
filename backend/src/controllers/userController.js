// Getting all users (admin-only)
// Getting a single user (admin/self)
// Updating user profile (admin can change role)
// Deleting a user (admin/self)

import User from '../models/UserModel.js'

//@desc     Get all users (admin-only)
//@route    GET /api/users
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select('-password')
        res.json(users)
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch all users' })
    }
}

//@desc     Get user by ID
//@route    GET /api/users/:id
exports.getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select('-password')
        if(!user) {
            return res.status(404).json({ error: 'User not found' })
        }
        res.json(user)
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch user' })
    }
}

//@ desc    update profile (self/admin)
//@route    PUT /api/users/:id
exports.updateUser = async (req, res) => {
    try {
        const updates = {
            name: req.body.name,
            email: req.body.email
        }
        //Allowing admin to change role
        if(req.user.role === 'admin' && req.body.role) {
            updates.role = req.body.role
        }
        const user = await User.findByIdAndUpdate(req.params.id, updates, {
            new: true,
            runValidators: true
        }).select('-password')
        if(!user) {
            return res.status(404).json({ error: 'User not found' })
        }
        res.json(user)
    } catch (error) {
        res.status(500).json({ error: 'Update failed' })
    }
}

//@desc     Delete a user (admin/self)
//@route    DELETE /api/users/:id
exports.deleteUser = async (req, res) => {
    try {
        //Only admin or user themself can delete
        if(req.user.role !== 'admin' && req.user.id !== req.params.id) {
            return res.status(403).json({ error: 'Not authorized' })
        }
        const user = await User.findById(req.params.id)
        if(!user) {
            return res.status(404).json({ error: 'No user found' })
        }
        await user.remove()
        res.json({ message: 'User deleted' })
    } catch (error) {
        res.status(500).json({ error: 'Delete failed' })
    }
}
