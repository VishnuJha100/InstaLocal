import User from '../models/UserModel.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

// Generate JWT
const generateToken = (user) => {
    return jwt.sign(
        { id: user._id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: '7d' }
    )
}

//@desc     Register new user
//@route    POST /api/auth/register
exports.register = async (req, res) => {
    const { name, email, password, role } = req.body
    try {

    } catch (error) {
        
    }
}