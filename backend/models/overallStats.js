import mongoose from 'mongoose';

const overallStatsSchema = new mongoose.Schema({
    totalCustomers: Number,
    yearlyTotalSales: Number,
    yearlyTotalSoldUnits: Number,
    year: Number,
    monthlyData: [{
        month: Number,
        totalSales: Number,
        totalSoldUnits: Number,
    }],
    weeklyData: [{
        week: Number,
        totalSales: Number,
        totalSoldUnits: Number,
    }],
    dailyData: [{
        day: Number,
        totalSales: Number,
        totalSoldUnits: Number,
    }],
    salesByCategory: {
        type: Map,
        of: Number,
    },
}, {
    timestamps: true,
});

const OverallStats = mongoose.model('OverallStats', overallStatsSchema);
export default OverallStats;