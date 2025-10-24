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
export async function getCantrolDistance(req,res){
    const {origin,destination}=req.query;
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }
    if(!origin || !destination){
        return res.status(400).json({message:'Origin and destination query parameters are required'});
    }
    try {
        const distance=await getdistance(origin,destination);
        res.status(200).json({origin,destination,distance});
    } catch (error) {
        res.status(500).json({message:'Error fetching distance'});
    }
}

export async function getCantrolAutoCompletion(req,res){
    const {input}=req.query;
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }
    if(!input){
        return res.status(400).json({message:'Input query parameter is required'});
    }
    try {
        const suggestions=await getAutoCompletion(input);
        res.status(200).json({input,suggestions});
    } catch (error) {
        res.status(500).json({message:'Error fetching autocomplete suggestions'});
    }
}