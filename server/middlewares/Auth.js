import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import User from '../Models/UserModel.js';
//generate a token
//@desc Generate token
const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: '1d',
    });
}
//protection middleware
const protect = asyncHandler(async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.id).select('-password');
            next();
        } catch (error) {
            console.error(error);
            res.status(401);
            throw new Error('Not authorized, token failed');
        }
    }
    //if token does not exist in headers send error
    if (!token){
        res.status(401);
        throw new Error('Not authorized, no token');
    }
});
///admin middleware
const admin = (req, res, next) => {
    if(req.user && req.user.isAdmin){
        next();
    } else {
        res.status(401);
        throw new Error('Not authorized as an admin');
    }
}
export {generateToken, protect, admin};