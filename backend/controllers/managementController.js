import Users from "../models/userModel.js";
import asyncHandler from "express-async-handler";

export const getAdmin = asyncHandler(async (req, res) => {
  try {
    const admins = await Users.find({ role: 'admin' }).select("-password")
    res.status(200).json(admins);
  } catch (error) {
    throw new Error(error.message);
  }
});