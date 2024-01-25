import Users from "../models/userModel.js";
import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";

const protect = asyncHandler(async (req, res, next) => {
    const token = req.cookies.token;

    try {
        if (!token) {
            res.status(401)
            throw new Error('Not authorized, Please login')
        }
    
        // verify token
        const verified = jwt.verify(token, process.env.JWT_SECRET_KEY);
        // get user id from token
        const user = await Users.findById(verified.id).select('-password');
        if (!user) {
            res.status(401)
            throw new Error('user not found')
        }
        req.user = user;
        next()

    } catch (error) {
        res.status(401)
        throw new Error('Not authorized, please login')
    }
})

export default protect;