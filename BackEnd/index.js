import express from "express";
import dotenv from "dotenv";
import { connectDb } from "./Database/db.js";
import cloudinary from "cloudinary";
import cookieParser from "cookie-parser";
import cors from "cors";
import { isAuth } from "./middlewares/isAuth.js";
import { User } from "./models/userModel.js";
import path from "path";
import axios from 'axios';


const app=express()
const interval = 3000;


dotenv.config();

cloudinary.v2.config({
  cloud_name: process.env.Cloudinary_Cloud_Name,
  api_key: process.env.Cloudinary_Api,
  api_secret: process.env.Cloudinary_Secret,
});

//using middlewares
app.use(express.json());
app.use(cookieParser());

// CORS configuration for production
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://connectify-mu-eight.vercel.app', 'https://connectify-vercel.vercel.app', 'https://connectify.vercel.app', 'https://connectify-git-main-beeramnarayana.vercel.app'] // Updated with actual domain
    : ['http://localhost:5173'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Cookie']
}));

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

// Add a catch-all route for API debugging
app.use("/api/*", (req, res) => {
  res.status(404).json({
    message: `Route not found: ${req.method} ${req.originalUrl}`,
    availableRoutes: [
      "GET /api/user/all",
      "POST /api/auth/register",
      "POST /api/auth/login",
      "GET /api/auth/logout",
      "POST /api/post/new",
      "GET /api/post/all",
      "POST /api/post/like/:id",
      "POST /api/post/comment/:id"
    ]
  });
});



app.listen(port, '0.0.0.0', () => {
  console.log(`Server is running on http://localhost:${port}`);
  connectDb();
});
