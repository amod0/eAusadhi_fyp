import asyncHandler from '../middleware/asyncHandler.js';
import { generateToken,  generateToken1 } from '../utils/generateToken.js';
import User from '../models/userModel.js';
// import email from '../utils/email.js'

import dotenv from 'dotenv';
dotenv.config();
const JWT_SECRET = process.env;

import nodemailer from 'nodemailer';
import { verify } from 'jsonwebtoken';

// Create a transporter with SMTP settings
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'np03cs4s220027@heraldcollege.edu.np',
    pass: 'qpsngvcfibuvkyyg', // gmail password
  },
});


// Function to authenticate user and generate token
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id);

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(401);
    throw new Error('Invalid email or password');
  }
});

// Function to register a new user
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  if (user) {
    generateToken(res, user._id);

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

// Function to logout user and clear cookie
const logoutUser = (req, res) => {
  res.clearCookie('jwt');
  res.status(200).json({ message: 'Logged out successfully' });
};

// Function to get user profile
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// Function to update user profile
const updateUserProfile = asyncHandler(async (req, res) => {
  
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// Function to get all users (admin)
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  res.json(users);
});

// Function to delete user (admin)
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    if (user.isAdmin) {
      res.status(400);
      throw new Error('Cannot delete admin user');
    }
    await User.deleteOne({ _id: user._id });
    res.json({ message: 'User removed' });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// Function to get user by ID (admin)
const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select('-password');

  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// Function to update user (admin)
const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.isAdmin = Boolean(req.body.isAdmin);

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

const sendpasswordlink = async (req, res) => {
  console.log(req.body);

  const { email } = req.body;
  if (!email) {
    res.status(401).json({ status: 401, message: "Enter Your Email" });
  }

  try {
    const userfind = await User.findOne({ email: email });
    // console.log("userfind", userfind);

    // token generate for reset password
    const token = generateToken1({_id: userfind._id}, process.env.JWT_SECRET, {
      expiresIn: "120s"
    });
    // console.log("token", token);
    const setusertoken = await User.findByIdAndUpdate({_id:userfind._id},{verifytoken:token},{new:true});
    // console.log("setusertoken",setusertoken)

    if(setusertoken){
      const mailOptions = {
        from:"np03cs4s220027@heraldcollege.edu.np",
        to:email,
        subject:"Sending Email For password Reset",
        text:`This Link Valid for 2 MINUTES only http://localhost:3000/passwordReset/${userfind.id}/${setusertoken.verifytoken}`
      }

      transporter.sendMail(mailOptions,(error,info)=>{
        if(error){
          console.log("error",error);
          res.status(401).json({status:401,message:"Email not send"})
        }else{
          console.log("email sent",info.response)
          res.status(201).json({status:201,message:"Email sent"})

        }
      })
    }

  } catch (error) {
    // Handle error appropriately
    console.error(error);
    res.status(401).json({ status: 401, message: "Invalid User" });
  }
};

// Function to update user forgot password
const updateForgotPassword = asyncHandler(async (req, res) => {
  
  const user = await User.findById(req.body.id);

  // if (user) {
  //   user.name = req.body.name || user.name;
  //   user.email = req.body.email || user.email;

    if (req.body.password) {
      user.password = req.body.password;
      const updatedUser = await user.save();
      res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      password: updateUser.password,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});





export {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
  sendpasswordlink,
  updateForgotPassword
};
