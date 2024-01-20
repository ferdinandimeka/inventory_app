const express = require('express');
const { json } = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const mongoSanitizer = require('express-mongo-sanitize');
const xss = require('xss-clean');
const { rateLimit } = require('express-rate-limit');
const { config } = require('dotenv');
const mongoose = require('mongoose');
const userRoute = require('./routes/userRoutes');
const errorHandler = require('./middlewares/errorMiddleware');

config()
const app = express();
const PORT = process.env.PORT || 5000;

// Security HTTP headers
app.use(helmet());

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
app.use(json({ limit: '15kb' }));
app.use(express.urlencoded({ extended: false }));

// routes
app.use('/api/v1/users', userRoute);

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
    })
    .catch(err => {
        console.log(err);
    })