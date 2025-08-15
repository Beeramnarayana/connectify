import TryCatch from "../utils/Trycatch.js";
import { User } from "../models/userModel.js";
import getDataUrl from "../utils/urlGenrator.js";
import cloudinary from "cloudinary";
import bcrypt from "bcrypt";
import mongoose from "mongoose";

export const myProfile = TryCatch(async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");

  res.json(user);
});

export const userProfile = TryCatch(async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");

  if (!user)
    return res.status(404).json({
      message: "No User with is id",
    });

  res.json(user);
});

export const followandUnfollowUser = TryCatch(async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({
      success: false,
      message: 'Invalid user ID format',
    });
  }

  const user = await User.findById(req.params.id);
  if(!user)
    return res.status(404).json({
      message: "No User with is id",
    });
  const loggedInUser = await User.findById(req.user._id);

  if (!user)
    return res.status(404).json({
      message: "No User with is id",
    });

  if (user._id.toString() === loggedInUser._id.toString())
    return res.status(400).json({
      message: "You can't follow yourself",
    });

  if (user.followers.includes(loggedInUser._id)) {
    const indexFollowing = loggedInUser.followings.indexOf(user._id);
    const indexFollower = user.followers.indexOf(loggedInUser._id);

    loggedInUser.followings.splice(indexFollowing, 1);
    user.followers.splice(indexFollower, 1);

    await loggedInUser.save();
    await user.save();

    res.json({
      message: "User Unfollowed",
    });
  } else {
    loggedInUser.followings.push(user._id);
    user.followers.push(loggedInUser._id);

    await loggedInUser.save();
    await user.save();

    res.json({
      message: "User Followed",
    });
  }
});

export const userFollowerandFollowingData = TryCatch(async (req, res) => {
  const user = await User.findById(req.params.id)
    .select("-password")
    .populate("followers", "-password")
    .populate("followings", "-password");

  const followers = user.followers;
  const followings = user.followings;

  res.json({
    followers,
    followings,
  });
});

// export const updateProfile = TryCatch(async (req, res) => {
//   const user = await User.findById(req.user._id);

//   const { name } = req.body;

//   if (name) {
//     user.name = name;
//   }

//   const file = req.file;
//   if (file) {
//     const fileUrl = getDataUrl(file);

//     await cloudinary.v2.uploader.destroy(user.profilePic.id);

//     const myCloud = await cloudinary.v2.uploader.upload(fileUrl.content);

//     user.profilePic.id = myCloud.public_id;
//     user.profilePic.url = myCloud.secure_url;
//   }

//   await user.save();

//   res.json({
//     message: "Profile updated",
//   });
// });

export const updateProfile = TryCatch(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }

  // Update name if provided
  if (req.body.name) {
    user.name = req.body.name;
  }

  // Update gender if provided
  if (req.body.gender) {
    user.gender = req.body.gender.toLowerCase();
  }

  const file = req.file;
  if (file) {
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
      
      // Delete old profile picture from Cloudinary if it exists
      if (user.profilePic?.id) {
        try {
          await cloudinary.v2.uploader.destroy(user.profilePic.id);
        } catch (error) {
          console.warn('Error deleting old profile picture:', error.message);
          // Continue with upload even if deletion fails
        }
      }

      // Upload new profile picture to Cloudinary
      const result = await cloudinary.v2.uploader.upload(fileContent, {
        folder: 'profile_pics',
        width: 150,
        crop: 'scale',
        format: 'jpg',
        quality: 'auto:good',
      });

      // Update user's profile picture
      user.profilePic = {
        id: result.public_id,
        url: result.secure_url,
      };

    } catch (error) {
      console.error('Profile picture update error:', error);
      return res.status(400).json({
        success: false,
        message: error.message || 'Error updating profile picture',
      });
    }
  }

  try {
    const updatedUser = await user.save();
    
    // Remove sensitive data before sending response
    const userObj = updatedUser.toObject();
    delete userObj.password;
    
    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user: userObj,
    });
  } catch (error) {
    console.error('Profile update error:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating profile',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
});

export const updatePassword = TryCatch(async (req, res) => {
  const user = await User.findById(req.user._id);

  const { oldPassword, newPassword } = req.body;

  const comparePassword = await bcrypt.compare(oldPassword, user.password);

  if (!comparePassword)
    return res.status(400).json({
      message: "Wrong old password",
    });

  user.password = await bcrypt.hash(newPassword, 10);

  await user.save();

  res.json({
    message: "Password Updated",
  });
});