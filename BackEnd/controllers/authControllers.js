import { User } from "../models/userModel.js";
import TryCatch from "../utils/Trycatch.js";
import generateToken from "../utils/generateToken.js";
import getDataUrl from "../utils/urlGenrator.js";
import bcrypt from "bcrypt";
import cloudinary from "cloudinary";

// export const registerUser = TryCatch(async (req, res) => {
//   const { name, email, password, gender } = req.body;

//   const file = req.file;

//   if (!name || !email || !password || !gender || !file) {
//     return res.status(400).json({
//       message: "Please give all values",
//     });
//   }

//   let user = await User.findOne({ email });

//   if (user)
//     return res.status(400).json({
//       message: "User Already Exist",
//     });

//   const fileUrl = getDataUrl(file);

//   const hashPassword = await bcrypt.hash(password, 10);

//   const myCloud = await cloudinary.v2.uploader.upload(fileUrl.content);

//   user = await User.create({
//     name,
//     email,
//     password: hashPassword,
//     gender,
//     profilePic: {
//       id: myCloud.public_id,
//       url: myCloud.secure_url,
//     },
//   });

//   generateToken(user._id, res);

//   res.status(201).json({
//     message: "User Registered",
//     user,
//   });
// });


export const registerUser = TryCatch(async (req, res) => {
  const { name, email, password, gender } = req.body;
  const file = req.file;

  // Validate required fields
  if (!name || !email || !password || !gender || !file) {
    return res.status(400).json({
      success: false,
      message: "Please provide all required fields: name, email, password, gender, and profile picture",
    });
  }

  // Check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({
      success: false,
      message: "User with this email already exists",
    });
  }

  try {
    // Validate file
    if (!file.mimetype.startsWith('image/')) {
      return res.status(400).json({
        success: false,
        message: "Please upload an image file",
      });
    }

    // Convert file to base64
    const fileContent = `data:${file.mimetype};base64,${file.buffer.toString('base64')}`;
    
    // Upload to Cloudinary
    const result = await cloudinary.v2.uploader.upload(fileContent, {
      folder: 'profile_pics',
      width: 150,
      crop: 'scale',
      format: 'jpg',
      quality: 'auto:good',
    });

    // Hash password
    const hashPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await User.create({
      name,
      email,
      password: hashPassword,
      gender: gender.toLowerCase(),
      profilePic: {
        id: result.public_id,
        url: result.secure_url,
      },
    });

    // Generate JWT token
    generateToken(user._id, res);

    // Send response
    res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        gender: user.gender,
        profilePic: user.profilePic,
      },
    });

  } catch (error) {
    console.error('Registration error:', error);
    
    // Handle Cloudinary errors specifically
    if (error.http_code) {
      return res.status(400).json({
        success: false,
        message: error.message || 'Error uploading image to Cloudinary',
      });
    }

    // Handle other errors
    res.status(500).json({
      success: false,
      message: 'Error registering user',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
});

export const loginUser = TryCatch(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user)
    return res.status(400).json({
      message: " in Credentials",
    });

  const comparePassword = await bcrypt.compare(password, user.password);

  if (!comparePassword)
    return res.status(400).json({
      message: "Credentials",
    });

  generateToken(user._id, res);

  res.json({
    message: "User Logged in",
    user,
  });
});

export const logoutUser = TryCatch((req, res) => {
  res.cookie("token", "", { maxAge: 0 });

  res.json({
    message: "Logged out successfully",
  });
});