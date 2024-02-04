import Users from "../models/userModel.js";
import asyncHandler from "express-async-handler";
import Transaction from "../models/transactionModel.js";
import mongoose from "mongoose";

export const getAdmin = asyncHandler(async (req, res) => {
  try {
    const admins = await Users.find({ role: 'admin' }).select("-password")
    res.status(200).json(admins);
  } catch (error) {
    res.status(404)
    throw new Error(error.message);
  }
});

export const getPerformance = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        console.log(id);
        const userWithStats = await Users.aggregate([
            {
                $match: { _id: new mongoose.Types.ObjectId(id) }
            },
            {
                $lookup: {
                    from: "affiliatestats",
                    localField: "_id",
                    foreignField: "userId",
                    as: "affiliate_stats"
                }
            },
            { $unwind: "$affiliate_stats" }
        ])

        console.log(userWithStats[0]);

        const salesTransactions = await Promise.all(
            userWithStats[0].affiliate_stats.affiliateSales.map((id) => {
                return Transaction.findById(id);
            })
        );
        console.log(salesTransactions);
        const filteredSalesTransactions = salesTransactions.filter(
            (transaction) => transaction !== null
        );

        res.status(200).json({
            user: userWithStats,
            sales: filteredSalesTransactions
        });
    } catch (error) {
        res.status(404);
        throw new Error(error.message);
    }
})