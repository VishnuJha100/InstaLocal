import jwt from 'jsonwebtoken'
import User from '../models/UserModel.js'

export const protect = async (req, res, next) => {
    let token
    //checking for token in header
    if(req.headers.authorization && req.headers.authorization.startswith('Bearer')) {
        token = req.headers.authorization.split(' ')[1]
    }
    if(!token) {
        return res.status(401).json({ error: 'Not authorized, token missing' })
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = await User.findById(decoded.id).select('-password')
        if(!req.user){
            return res.status(401).json({ error: 'Not authorized, user not found' })
        }
        next()
    } catch (error) {
        res.status(401).json({ error: 'Not authorized, token invalid' })
    }
}

export const authorize = (...roles) => {
    return (req, res, next) => {
        if(!roles.includes(req.user.role)){
            return res.status(403).json({ error: `User role ${req.user.role} not authorized` })
        }
        next()
    }
}