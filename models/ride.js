import mongoose from "mongoose";

const riderSchema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user',
        required:true,
    },
    captain:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'captain',
        required:true,
    },
    pickup:{
        type:String,
        required:true,
    },
    destination:{
        type:String,
        required:true,
    },
    fare:{
        type:Number,
        required:true,
    },
    status:{
        type:String,
        enum:['requested','ongoing','completed','cancelled'],
        default:'requested'
    },
    duration:{
        type:Number,
    },
    distance:{
        type:Number,
    },
    paymentId:{
        type:String,
    },
    orderId:{
        type:String,
    },
    signature:{
        type:String,
    },
    fare:{
        type:Number,
        required:true,
    }
    

})
const Ride=mongoose.model('ride',riderSchema);
export default Ride;