import mongoose from 'mongoose';

const overallStatsSchema = new mongoose.Schema({
    totalCustomers: Number,
    yearlySalesTotal: Number,
    yearlyTotalSoldUnits: Number,
    year: Number,
    monthlyData: [{
        month: String,
        totalSales: Number,
        totalUnits: Number,
    }],
    weeklyData: [{
        week: String,
        totalSales: Number,
        totalUnits: Number,
    }],
    dailyData: [{
        date: String,
        totalSales: Number,
        totalUnits: Number,
    }],
    salesByCategory: {
        type: Map,
        of: Number,
    },
}, {
    timestamps: true,
    versionKey: false
});

const OverallStats = mongoose.model('OverallStats', overallStatsSchema);
export default OverallStats;