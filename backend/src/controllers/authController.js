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
        const existingUser = await User.findOne({email});
        if(existingUser) {
            return res.status(400).json({ error: "Email already in use" })
        }
        const hashedPassword = await bcrypt.hash(password, 10)
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            role
        })
        const token = generateToken(user)
        return res.status(201).json({
            user: { id: user._id, name: user.name, email: user.email, role: user.role },
            token
        })
    } catch (error) {
        res.status(500).json({ error: 'Registration failed' }) 
    }
}

//@desc     Login user
//@route    POST /api/auth/login
exports.login = async (req, res) => {
    const { email, password } = req.body
    try {
        const user = await User.findOne({ email })
        if(!user) {
            return res.status(400).json({ error: "Invalid credentials" })
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch) {
            return res.status(400).json({ error: "Invalid credentials" })
        }
        const token = generateToken(user)
        res.json({
            user: { id: user._id, email: user.email, role: user.role, password: user.password },
            token
        })
    } catch (error) {
        res.status(500).json({ error: "Error in login controller" })
    }
}

//@desc     Get current user
//@route    GET /api/auth/me
//@access   Private

exports.getMe = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password')
        res.json(user)
    } catch (error) {
        res.status(500).json({ error: 'Unable to fetch user'})
    }
}