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
import userRoute from './routes/userRoutes.js';
import generalRoute from './routes/generalRoutes.js';
// import productRoute from './routes/productRoutes';
import errorHandler from './middlewares/errorMiddleware.js';
// data
import { dataUser } from './data/index.js';

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
app.use('/api/v1/users', userRoute);
app.use('/api/v1/users', generalRoute);
// app.use('/api/v1/products', productRoute);

// config
const pass = encodeURIComponent(process.env.PASSWORD)
let uri = process.env.MONGODB_URI.replace(
  '<password>',
  pass
);

// Connect to MongoDB
mongoose.connect(uri)
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        })
        // data should be added once, so comment this out after running once
        // Users.insertMany(dataUser)
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