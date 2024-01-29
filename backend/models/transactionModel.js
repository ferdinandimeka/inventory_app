import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema({
    userId: String,
    cost: String,
    products: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Product'
    },

},  {
        timestamps: true,
        versionKey: false
    }
);

const Transaction = mongoose.model('Transaction', transactionSchema);
export default Transaction