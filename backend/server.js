import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import morgan from 'morgan';
import mongoSanitizer from 'express-mongo-sanitize';
import xss from 'xss-clean';
import rateLimit from 'express-rate-limit';
import { config } from 'dotenv';
import mongoose from 'mongoose';
import Users from './models/userModel.js';
import managementRoute from './routes/managementRoutes.js';
import generalRoute from './routes/generalRoutes.js';
import clientRoute from './routes/clientRoutes.js';
import salesRoute from './routes/salesRoutes.js';
import errorHandler from './middlewares/errorMiddleware.js';
import userRoute from './routes/userRoutes.js';
// data
import { dataUser, dataAffiliateStat, dataProduct, dataTransaction,
dataOverallStat } from './data/index.js';

import Product from './models/productModel.js';
import ProductStats from './models/productStatsModel.js';
import Transaction from './models/transactionModel.js';
import OverallStats from './models/overallStats.js';
import AffiliateStats from './models/affiliateStats.js';

config()
const app = express();
const PORT = process.env.PORT || 5000;

// Security HTTP headers
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));

// date sanitizer against NoSQL query injection
app.use(mongoSanitizer());

// data sanitizer against site script XSS
app.use(xss());

// error handler
app.use(errorHandler);

// Rate limiting
const limiter = rateLimit({
    max: 100,
    windowMs: 60 * 60 * 1000,
    message: 'Too many requests from this IP, please try again in an hour!',
  })

app.use('/api', limiter);

// middlewares
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("common"))

// routes
app.use('/api/v1/user', userRoute);
app.use('/api/v1/users', generalRoute);
app.use('/api/v1/clients', clientRoute);
app.use('/api/v1/sales', salesRoute);
app.use('/api/v1/management', managementRoute);


// config
// const pass = encodeURIComponent(process.env.PASSWORD)
// let uri = process.env.MONGODB_URI.replace(
//   '<password>',
//   pass
// );
// console.log(pass)

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        })
        // data should be added once, so comment this out after running once
        // Users.insertMany(dataUser)
        // Product.insertMany(dataProduct)
        // ProductStats.insertMany(dataAffiliateStat)
        // Transaction.insertMany(dataTransaction)
        //OverallStats.insertMany(dataOverallStat)
        // AffiliateStats.insertMany(dataAffiliateStat)
        //   .then(() => {
        //       console.log('Data inserted')
        //   })
        //   .catch(err => {
        //       console.log(err)
        //   })
    })
    .catch(err => {
        console.log(err);
    })