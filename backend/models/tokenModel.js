import mongoose from 'mongoose';

const tokenSchema = new mongoose.Schema({
    token: {
        type: String,
        required: [true, 'Please provide a token']
    },
    userId: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: [true, 'Please provide a user']
    },
    createdAt: {
        type: Date,
        required: true,
    },
    expiresAt: {
        type: Date,
        required: true,
    }
}, {
    versionKey: false
});

const Token = mongoose.model('Token', tokenSchema);
export default Token;