import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectMongo from './db/connection.js';
dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

connectMongo('mongodb://localhost:27017/uber_crud')
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDB connection error:", err));


app.get("/", (req, res) => {
  res.send("Server is working!");
});

app.listen(process.env.port||3070, () => {
  console.log(`Server is running on port ${process.env.port}`);
});