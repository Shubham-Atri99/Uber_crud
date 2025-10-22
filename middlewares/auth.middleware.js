import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.js";
import BlackToken from "../models/blackTokens.js";

export async function authMiddleware(req,res,next){
    const token = req.cookies.token || req.header('Authorization')?.replace('Bearer ', '');

    if(!token){
        return res.status(401).json({message:'Access denied. No token provided.'});
    }
    const isBlacklisted= await BlackToken.findOne({token});
    if(isBlacklisted){
        return res.status(401).json({message:'Invalid token. Please login again.'});
    }   
    try {
        const decoded= jwt.verify(token,process.env.JWT_SECRET_KEY);
        const user = await User.findById(decoded._id);
        if(!user){
            return res.status(401).json({message:'Invalid token. User not found.'});
        }
        req.user=user;
        return next();
    } catch (error) {
        return res.status(401).json({message:'Invalid token.'});
    }
}

