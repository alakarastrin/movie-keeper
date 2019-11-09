const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const connectDB = require('./config/db');

// Load env
dotenv.config({ path: './config/config.env' });

// Connect to database
connectDB();

// Route
const movies = require('./routes/movies');

const app = express();

// logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use('/api/v1/movies', movies);

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`),
);
