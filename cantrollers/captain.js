import express from 'express';
import { validationResult } from 'express-validator';
import { captainRegister } from '../services/captain.service.js';
import Captain from '../models/captains.js';

export async function captainsCantrolRegister(req,res){
    const errors =validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }
    // Implement captain registration logic here
    const {fullName,email,password,vehicle}=req.body;
    const isalreadyRegister=await Captain.findOne({email});
    if(isalreadyRegister){
        return res.status(400).json({message:'Captain with this email already exists'});
    }
    const hashedPassword=Captain.hashPassword(password);

    const captain=await captainRegister({
        firstName:fullName.firstName,
        lastName:fullName.lastName,
        email,
        password:hashedPassword,
        color:vehicle.color,
        plateNumber:vehicle.plateNumber,
        capacity:vehicle.capacity,
        vehicleType:vehicle.vehicleType
    })
    const token=captain.generateAuthToken();
    res.cookie('token',token);
    res.status(201).json({captain,token,message:'Captain registered successfully'});
     
}
export const captainLogin=async(req,res)=>{
    const errors =validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }   
    const {email,password}=req.body;
    const captain=await Captain.findOne({email}).select('+password');
    if(!captain){
        return res.status(400).json({message:'Invalid email or password'});
    }
    const isPasswordValid=captain.comparePassword(password);
    if(!isPasswordValid){
        return res.status(400).json({message:'Invalid email or password'});
    }
    const token=captain.generateAuthToken();
    res.cookie('token',token);
    res.status(200).json({captain,token,message:'Captain logged in successfully'});
}

export const getCaptainProfile=async(req,res)=>{
    res.status(200).json({captain:req.captain});
}

export const captainLogout=async(req,res)=>{
    const token = req.cookies.token || req.header('Authorization')?.replace('Bearer ', '');
    if(!token){
        return res.status(400).json({message:'No token provided'});
    }
    await BlackToken.create({token});
    res.clearCookie('token');
    res.status(200).json({message:'Captain logged out successfully'});
}