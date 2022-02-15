const express = require('express');
const colors = require('colors');
const dotenv = require('dotenv').config()
const {errorHandler} = require('./middleware/errorMiddleware');
const port = process.env.PORT || 5001;
const connectDB = require('./config/db');

connectDB();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/goals', require('./routes/goalRoutes'));

app.use(errorHandler);

app.listen(port, () => {
    console.log(`server started on port ${port}`)
});