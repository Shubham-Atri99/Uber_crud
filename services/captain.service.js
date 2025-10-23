import Captain from "../models/captains.js";

export async function captainRegister({
    firstName,lastName,email,password,
    color,plateNumber,capacity,vehicleType
}){
    if (!firstName|| !lastName||!email||!password||!color||!plateNumber||!capacity||!vehicleType) {
        throw new Error('All fields are required');
    }
    const captain=await Captain.create({
        fullName:{
            firstName,
            lastName
        },
        email,
        password,
        vehicle:{
            color,
            plateNumber,
            capacity,
            vehicleType
    }
})
      return captain;  
}