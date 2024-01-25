import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide a username'],
        unique: true,
        trim: true,
        maxlength: [20, 'Username cannot be more than 20 characters']
    },
    email: {
        type: String,
        required: [true, 'Please provide an email'],
        unique: true,
        trim: true,
        maxlength: [50, 'Email cannot be more than 50 characters'],
        match: [
            /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
            'Please provide a valid email'
        ]
    },
    password: {
        type: String,
        required: [true, 'Please provide a password'],
        minlength: [6, 'Password cannot be less than 6 characters'],
        maxlength: [62, 'Password cannot be more than 20 characters'],
        select: false
    },
    photo: {
        type: String,
        required: [true, 'Please provide a photo'],
        default: 'https://i.ibb.co/4pDNDk1/avatar.png'
    },
    phone: {
        type: String,
        required: [true, 'Please provide a phone number'],
        maxlength: [15, 'Phone number cannot be more than 15 characters'],
        default: '+234'
    },
    city: String,
    country: String,
    state: String,
    occupation: String,
    transactions: Array,
    role: {
        type: String,
        enum: ['user', 'admin', 'superadmin'],
        default: 'admin'
    
    },
    biography: {
        type: String,
        required: [true, 'Please provide a biography'],
        maxlength: [250, 'Biography cannot be more than 100 characters'],
        default: 'I am a new user'
    },

}, {
    timestamps: true,
    versionKey: false
});

userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    // hashing password
    const salt = bcrypt.genSaltSync(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

const Users = mongoose.model('User', userSchema);
export default Users;