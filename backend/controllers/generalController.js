import Users from "../models/userModel.js";
import asyncHandler from "express-async-handler";
import OverallStat from "../models/overallStats.js";
import Transaction from "../models/transactionModel.js";

export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await Users.findOne(id);
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getDashboard = asyncHandler(async (req, res) => {
  try {
    const currentMonth = "December";
    const currentYear = 2021;
    const currentDay = "2021-12-16"

    const transactions = await Transaction.find()
    .limit(50)
    .sort({ createdAt: -1 });

    const overallStat = await OverallStat.find({ year: currentYear });
    const {
      totalCustomers,
      yearlyTotalSoldUnits,
      yearlySalesTotal,
      monthlyData,
      salesByCategory,
    } = overallStat[0];

    const currentMonthStats = overallStat[0].monthlyData.find(({ month }) => month === currentMonth);
    const currentDayStats = overallStat[0].dailyData.find(({ date }) => date === currentDay);

    res.status(200).json({
      transactions,
      totalCustomers,
      yearlyTotalSoldUnits,
      yearlySalesTotal,
      currentMonthStats,
      currentDayStats,
      salesByCategory,
      monthlyData
    });

  } catch (error) {
    res.status(404);
    throw new Error(error.message);
  }
})