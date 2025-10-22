import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const userSchema=new mongoose.Schema({
    fullName:{
        firstName:{
            type:String,
            required:true,
            minlength:3,
    }
    ,
        lastName:{
            type:String,
            required:true,
            minlength:3,
    }
    },
    email:{
        type:String,
        required:true,
        unique:true,    
    },
    password:{
        type:String,
        required:true,
        select:false,
    }
})

userSchema.methods.generateAuthToken=function(){
    const token=jwt.sign({_id:this._id,email:this.email},process.env.JWT_SECRET_KEY,{
        expiresIn:'7d'
    });
    return token;
}
userSchema.methods.comparePassword=function(password){
    return bcrypt.compareSync(password,this.password);
}
userSchema.statics.hashPassword=function(password){
    return bcrypt.hashSync(password,10);
}


const User=mongoose.model('user',userSchema);
export default User;