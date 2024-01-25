import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema({
    userId: String,
    amount: Number,
    products: {
        type: [mongoose.Schema.ObjectId],
        ref: 'Product',
        of: String
    },

},  {
        timestamps: true,
    }
);

const Transaction = mongoose.model('Transaction', transactionSchema);
export default Transaction