import express from "express";
import { body } from "express-validator";
import { createCantrolRide } from "../cantrollers/ride.cantroller.js";

const ridesRouter = express.Router();

ridesRouter.post('/createRide',
    body('userId').isString().isLength({min:3}),
    body('pickup').isString().isLength({min:3}),
    body('destination').isString().isLength({min:3}),
    body('vehicleType').isIn(['car','bike','auto']),
    createCantrolRide
)

export default ridesRouter;

