import { validationResult } from "express-validator";
import { createRide } from "../services/ride.service.js";

export async function createCantrolRide(req,res){
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }
    const {userId,pickup,destination,vehicleType}=req.body;
    try {
        const ride = await createRide({
            user: userId,
            pickup,
            destination,
            vehicleType
        })
        res.status(201).json({ride,message:'Ride created successfully'});
    } catch (error) {
        throw new Error("Failed to create ride");
    }
}
