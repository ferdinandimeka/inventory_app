import mongoose from 'mongoose';

const affiliateStatsSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    },
    affiliateSales: {
        type: [mongoose.Schema.ObjectId],
        ref: 'Transaction',
    }
},
    {
        timestamps: true,
    },
)

const AffiliateStats = mongoose.model('AffiliateStats', affiliateStatsSchema);
export default AffiliateStats;