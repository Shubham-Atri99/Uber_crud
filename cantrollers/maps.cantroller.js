import { getCoordinates } from "../services/maps.service.js";
import { validationResult } from "express-validator";

export async function getCantrolCoordinates(req,res){
    const {address}=req.query;
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }
    if(!address){
        return res.status(400).json({message:'Address query parameter is required'});
    }
    try {
        const coordinates=await getCoordinates(address);
        res.status(200).json({address,coordinates});
    } catch (error) {
        res.status(500).json({message:'Error fetching coordinates'});
    }
}