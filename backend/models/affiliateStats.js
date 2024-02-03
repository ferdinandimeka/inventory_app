import mongoose from 'mongoose';

const affiliateStatsSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        ref: 'Users'
    },
    affiliateSales: {
        type: [mongoose.Types.ObjectId],
        ref: 'Transaction',
    }
},
    {
        timestamps: true,
        versionKey: false
    },
)

const AffiliateStats = mongoose.model('AffiliateStats', affiliateStatsSchema);
export default AffiliateStats;