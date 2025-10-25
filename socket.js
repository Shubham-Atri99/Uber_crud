import { Socket } from "socket.io";
import User from "./models/user.js";
import Captain from "./models/captains.js";


let io;

export function initSocket(server) {
    io = new Socket(server, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"],
        },
    });


    io.on("connection", (socket) => {
        console.log("New client connected:", socket.id);
        socket.on('join',async (data)=>{
            const {userId,userType}=data;
            if(userType==="user"){
                await User.findByIdAndUpdate(userId,{socketId:socket.id});
            }else if(userType==="captain"){
                await Ride.findOneAndUpdate({captain:userId,status:"ongoing"},{captainSocketId:socket.id});
            }

        })
        socket.on('update-location-captain',async(data)=>{
            const {userId,location}=data;
            await Captain.findByIdAndUpdate(userId,{
                location:{
                   ltd:location.ltd,
                   lng:location.lng 
                }
            });

           
        })
        socket.on("disconnect", () => {
            console.log("Client disconnected:", socket.id);
        })
    });

}
export function sendMessagetoSocket(socketId,message){
    if(io){
        io.to(socketId).emit("newMessage",message);
    }else{
        console.error("Socket.io not initialized");
    }
}


