import Users from '../models/userModel.js';
import Token from '../models/tokenModel.js';
import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import sendEmail from '../utils/sendEmail.js';

const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET_KEY,
        {expiresIn: "1d"})
}

export const registerUser = asyncHandler( async (req, res) => {

    if (!req.body.username || !req.body.email || !req.body.password) {
        res.status(400)
        throw new Error('Please provide all required fields')
    }

    if (req.body.password.length < 6) {
        res.status(400)
        throw new Error('Password must be at least 6 characters')
    }

    const existUser = await Users.findOne({ email: req.body.email });
    
    const { username, email, password, phone, biography } = req.body;

    if (existUser) {
        res.status(400)
        throw new Error('User already exists')
    } 
    
    if (!existUser){
        const user = await Users.create({
            username,
            email,
            password,
            phone,
            biography
        });
        // generate token
        const token = generateToken(user._id)

        // send httpOnly cookie
        res.cookie('token', token, {
            expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
            httpOnly: true,
            sameSite: 'none',
            secure: true,
            path: '/'
        });

        res.status(201).json({
            status: 'success',
            data: {
                user,
                token
            }
        });
    } else {
        res.status(400)
        throw new Error('Invalid user data')
    }
})

export const loginUser = asyncHandler( async (req, res) => {

    const { email, password } = req.body;
    
    if (!email || !password) {
        res.status(400)
        throw new Error('Please provide all required fields')
    }

    const existUser = await Users.findOne({ email });

    if (!existUser) {
        res.status(400)
        throw new Error('Invalid email or password')
    }

    // get the hashed password
    const userByPass = await Users.findOne({ email }).select('+password');

    // if user exists, check if password is correct
    const isMatch = bcrypt.compareSync(password, userByPass.password);

    if (!isMatch) {
        res.status(400)
        throw new Error('Invalid email or password')
    }

    if (existUser && isMatch) {
        // generate token
        const token = generateToken(existUser._id)

        // send httpOnly cookie
        res.cookie('token', token, {
            expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
            httpOnly: true,
            sameSite: 'none',
            secure: true,
            path: '/'
        });

        res.status(200).json({
            status: 'success',
            data: {
                existUser,
                token
            }
        });
    }
})

export const logOutUser = asyncHandler( async (req, res) => {
    res.cookie('token', 'none', {
        expires: new Date(Date.now(0)),
        httpOnly: true,
        sameSite: 'none',
        secure: true,
        path: '/'
    });

    res.status(200).json({
        status: 'success',
        message: 'User logged out',
        data: null
    });
})

export const getUser = asyncHandler( async (req, res) => {
    const user = await Users.findById(req.user._id);

    const { _id, username, email, photo, phone, biography } = user;

    res.status(200).json({
        _id,
        username,
        email,
        photo,
        phone,
        biography
    });
})

export const loggedInStatus = asyncHandler( async (req, res) => {
    const token = req.cookies.token

    if (!token) {
        return res.json(false)
    }

    const verified = jwt.verify(token, process.env.JWT_SECRET_KEY);

    if (verified) {
        return res.json(true)
    }
    res.json(false)
})

export const updateUser = asyncHandler( async (req, res) => {
    const user = await Users.findById(req.user._id);

    if (user) {
        const { email, username, phone, photo, biography } = user;
        user.username = req.body.username || username;
        user.email = email;
        user.phone = req.body.phone || phone;
        user.photo = req.body.photo || photo;
        user.biography = req.body.biography || biography;

        const updatedUser = await user.save();

        res.status(200).json({
            _id: updatedUser._id,
            username: updatedUser.username,
            email: updatedUser.email,
            photo: updatedUser.photo,
            phone: updatedUser.phone,
            biography: updatedUser.biography
        });
    } else {
        res.status(404)
        throw new Error('User not found')
    }
})

export const changePassword = asyncHandler( async (req, res) => {
    const user = await Users.findById(req.user._id).select('+password');
    if (!user) {
        res.status(404)
        throw new Error('User not found')
    }

    const { oldpassword, password } = req.body;
    if (!oldpassword || !password) {
        res.status(400)
        throw new Error('Please provide all required fields')
    }

    // check if passwords match from the database
    const isMatch = bcrypt.compareSync(oldpassword, user.password);

    // save new password if old password is correct
    if (isMatch) {
        user.password = password;
        await user.save();

        res.status(200).json({
            message: 'Password changed successfully'
        });
    } else {
        res.status(400)
        throw new Error('Invalid old password')
    }
})

export const forgotPassword = asyncHandler( async (req, res) => {
    const { email } = req.body;
    const user = await Users.findOne({ email });

    if (!user) {
        res.status(404)
        throw new Error('User not found')
    }

    // delete any existing token
    await Token.deleteOne({ userId: user._id });

    // generate token
    let resetToken = crypto.randomBytes(32).toString('hex') + user._id;

    // hash token and save to database
    const hashedToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    await Token.create({
        token: hashedToken,
        userId: user._id,
        createdAt: Date.now(),
        expiresAt: Date.now() + 10 * 60 * 1000
    }).save;

    // send email with token
    const resetUrl = `${process.env.CLIENT_URL}/api/v1/users/password-reset/${resetToken}`;

    const message = `
        <h2>Hello ${user.username}</h2>
        <p>Please use the URL below to reset your password</p>
        <p>This reset link is valid for sometime</p>

        <a href=${resetUrl} clicktracking=off>${resetUrl}</a>

        <p>Regards!!!</p>
    `
    const subject = 'Password reset link';
    const send_to = user.email;
    const send_from = process.env.EMAIL_USER;
    const reply_to = 'no reply'


    try {
        // send email
        await sendEmail(subject, message, send_to, send_from, reply_to);
        res.status(200).json({
            success: true,
            message: 'Reset password link sent to email'
        });

    } catch (error) {
        res.status(500)
        console.log(error)
        throw new Error('Error sending email')
    }
})

export const resetPassword = asyncHandler( async (req, res) => {
    const { resetToken } = req.params;
    const { password } = req.body;

    // hash token and compare with token in database
    const hashedToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    const userToken = await Token.findOne({ token: hashedToken, expiresAt: { $gt: Date.now() } });

    if (!userToken) {
        res.status(404)
        throw new Error('Invalid token or token expired')
    }

    // get user and update password
    const user = await Users.findById(userToken.userId).select('+password');
    user.password = password;
    await user.save();
    res.status(200).json({
        success: true,
        message: 'Password reset successful'
    });
})