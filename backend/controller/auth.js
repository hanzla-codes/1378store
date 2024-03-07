import asyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "../models/user.js";

//PATH      /api/auth/login
//METHOD    Post
//ACCESS    Public
//DESC      Login User
export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    res.status(400);
    throw new Error("Email or password is incorrect.");
  }
  const isValid = bcrypt.compareSync(password, user.password);
  if (!isValid) {
    res.status(400);
    throw new Error("Email or password is incorrect.");
  }
  return res.json({
    _id: user._id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin,
    token: generateToken(user._id),
  });
});

//PATH      /api/auth/register
//METHOD    Post
//ACCESS    Public
//DESC      Register new user
export const register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const salt = bcrypt.genSaltSync();
  const hashPassword = bcrypt.hashSync(password, salt);
  const user = new User({
    name,
    email,
    password: hashPassword,
  });
  const createdUser = await user.save();

  return res.json({
    _id: createdUser._id,
    name: createdUser.name,
    email: createdUser.email,
    isAdmin: createdUser.isAdmin,
    token: generateToken(createdUser._id),
  });
});

const generateToken = (userId) => {
  return jwt.sign({ _id: userId }, process.env.SECRET_KEY, {
    expiresIn: "7d",
  });
};
