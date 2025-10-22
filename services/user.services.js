import User from "../models/user.js"

export const createUser=async({
    firstName,lastName,email,password
})=>{
    if(!firstName || !lastName || !email || !password){
        throw new Error("All fields are required")
    }
    const user = User.create({
        fullName:{
            firstName,
            lastName   
    },
        email,
         password,
        })
    return user;
}
    