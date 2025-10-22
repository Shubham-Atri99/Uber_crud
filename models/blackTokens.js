import mongoose from "mongoose";


const blackTokenSchema= new mongoose.Schema({
    token:{
        type:String,
        required:true,
        unique:true,
    },
    blacklistedAt:{
        type:Date,
        default:Date.now,
    }
});

const BlackToken= mongoose.model('BlackToken',blackTokenSchema);
export default BlackToken;