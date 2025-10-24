import express from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { getCoordinates } from "../services/maps.service.js";

import { ExpressValidator } from "express-validator";
import {query} from 'express-validator';
import { getCantrolCoordinates } from "../cantrollers/maps.cantroller.js";
const mapsRouter=express.Router();

mapsRouter.get('/getcoordinates',
    query('address').isString().isLength({min:3}),

    authMiddleware,getCantrolCoordinates)


export default mapsRouter; 