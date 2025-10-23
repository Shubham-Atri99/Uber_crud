import express from 'express';
import { body } from 'express-validator';
import { captainLogin, captainLogout, captainsCantrolRegister, getCaptainProfile } from '../cantrollers/captain.js';
import { authCaptainMiddleware } from '../middlewares/auth.middleware.js';

const captainRouter=express.Router();

captainRouter.post('/register',
    body('fullName.firstName').notEmpty().withMessage('First name is required'),
    body('fullName.lastName').notEmpty().withMessage('Last name is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').isLength({min:6}).withMessage('Password must be at least 6 characters long'),
    body('vehicle.color').notEmpty().withMessage('Vehicle color is required'),
    body('vehicle.plateNumber').notEmpty().withMessage('Vehicle plate number is required'),
    body('vehicle.capacity').isInt({min:1}).withMessage('Vehicle capacity must be at least 1'),
    body('vehicle.vehicleType').isIn(['car','bike','auto']).withMessage('Vehicle type must be car, bike, or auto'),
    captainsCantrolRegister)

captainRouter.post('/login',
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').notEmpty().withMessage('Password is required'),
    captainLogin)


captainRouter.get('/profile',authCaptainMiddleware,getCaptainProfile)
captainRouter.get('/logout',authCaptainMiddleware,captainLogout)


export default captainRouter;