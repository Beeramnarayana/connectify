import express from "express";
import dotenv from "dotenv";
import { connectDb } from "./Database/db.js";
import cloudinary from "cloudinary";
import cookieParser from "cookie-parser";
import { isAuth } from "./middlewares/isAuth.js";
import { User } from "./models/userModel.js";
import path from "path";
import axios from 'axios';


const app=express()
const interval = 30000;


dotenv.config();

cloudinary.v2.config({
  cloud_name: process.env.Cloudinary_Cloud_Name,
  api_key: process.env.Cloudinary_Api,
  api_secret: process.env.Cloudinary_Secret,
});

//using middlewares
app.use(express.json());
app.use(cookieParser());

const port = process.env.PORT || 3000;
// console.log(import.meta.env.MONGODB_URL);
// to get all users
app.get("/api/user/all", isAuth, async (req, res) => {
  try {
    const search = req.query.search || "";
    const users = await User.find({
      name: {
        $regex: search,
        $options: "i",
      },
      _id: { $ne: req.user._id },
    }).select("-password");

    res.json(users);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// importing routes
import userRoutes from "./Routes/userRoutes.js";
import authRoutes from "./Routes/authRoutes.js";
import postRoutes from "./Routes/PostRoutes.js";


//using routes
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/post", postRoutes);



app.listen(port, '0.0.0.0', () => {
  console.log(`Server is running on http://localhost:${port}`);
  connectDb();
});
