import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
const captainSchema=new mongoose.Schema({
    fullName:{
        firstName:{
            type:String,
            required:true,
            minlength: [3, "First name must be at least 3 characters long"] ,
        },
        lastName:{
            type:String,
            required:true,
            minlength: [3, "Last name must be at least 3 characters long"] ,

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
        minlength: [6, "Password must be at least 6 characters long"] ,
    },
    socketId:{
        type:String,
    },
    status:{
        type:String,
        enum:['available','unavailable'],
        default:'unavailable'
    },
    vehicle:{
        color:{
            type:String,
            required:true,
            minlength: [3, "Vehicle color must be at least 3 characters long"] ,
        },
        plateNumber:{
            type:String,
            required:true,
            unique:true,
        },
        capacity:{
            type:Number,
            required:true,
            min:[1,"Capacity must be at least 1"]
        },
        vehicleType:{
            type:String,
            required:true,
            enum:['car,bike','auto']
        }

    },
    location:{
        lng:{
            type:Number,
        
        },
        lat:{
            type:Number,
        }
    }
})
captainSchema.methods.comparePassword=function(password){
    return bcrypt.compareSync(password,this.password);
}

captainSchema.methods.generateAuthToken=function(){
    const token =jwt.sign({_id:this._id,email:this.email},process.env.JWT_SECRET_KEY,{
        expiresIn:'7d'
    });
    return token;
}

captainSchema.statics.hashPassword=function(password){
    return bcrypt.hashSync(password,10);
}

const Captain=mongoose.model('Captain',captainSchema);
export default Captain;