import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectMongo from './db/connection.js';
import userRouter from './routes/user.route.js';
import cookieParser from 'cookie-parser';
import captainRouter from './routes/captain.route.js';
import mapsRouter from './routes/maps.routes.js';
import rideRouter from './routes/ride.route.js';
dotenv.config();


const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: true,       
  credentials: true,  
}));

//routers
app.use("/api/user",userRouter)
app.use("/api/captain",captainRouter)
app.use("/api/maps",mapsRouter)
app.use("/api/ride",rideRouter)

connectMongo('mongodb://localhost:27017/uber_crud') 
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDB connection error:", err));


app.get("/", (req, res) => {
  res.send("Server is working for uber crud!");
});

app.listen(process.env.port||3070, () => {
  console.log(`Server is running on port ${process.env.port}`);
});