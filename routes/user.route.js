import express from 'express';
import { getuserProfile, loginUser, logoutUser, registerUser } from '../cantrollers/user.register.js';
import {body }from 'express-validator';
import { authMiddleware } from '../middlewares/auth.middleware.js';

const userRouter= express.Router();

// Define user-related routes here
userRouter.post('/register',[
    body('email').isEmail().withMessage('Invalid email address'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    body('fullName.firstName').isLength({min:3}).withMessage('First name is required'),
    body('fullName.lastName').isLength({min:3}).withMessage('Last name is required')
    
], registerUser

)
userRouter.post("/login",[
    body('email').isEmail().withMessage('Invalid email address'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
],loginUser)

userRouter.get("/profile",authMiddleware,getuserProfile)

userRouter.get("/logout",authMiddleware,logoutUser)
export default userRouter;