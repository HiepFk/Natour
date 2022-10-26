const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const cookieParser = require('cookie-parser');

const corsOptions = require('./src/config/corsOptions');
const credentials = require('./src/middleware/credentials');

const globalErrorHandler = require('./src/middleware/errorHandle');

const AppError = require('./src/utils/appError');

const tourRouter = require('./src/routes/tourRoutes');
const userRouter = require('./src/routes/userRoutes');
const reviewRouter = require('./src/routes/reviewRoutes');
const orderRouter = require('./src/routes/orderRoutes');

const app = express();

app.use(credentials);
app.use(cors(corsOptions));

app.use(cookieParser());

app.use(morgan('common'));

app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);

const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP , please try again in an hour',
});
app.use('/api', limiter);

app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true, limit: '1mb' }));

app.use(mongoSanitize());

app.use(xss());

app.use('/api/v1/tour', tourRouter);
app.use('/api/v1/user', userRouter);
app.use('/api/v1/review', reviewRouter);
app.use('/api/v1/order', orderRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find this on the server`));
});

app.use(globalErrorHandler);

module.exports = app;
