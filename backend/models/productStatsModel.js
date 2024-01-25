import mongoose from 'mongoose';

const productStatsSchema = new mongoose.Schema({
    productId: String,
    yearlySalesTotal: Number,
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
}, {
    timestamps: true,
});

const ProductStats = mongoose.model('ProductStats', productStatsSchema);
export default ProductStats;