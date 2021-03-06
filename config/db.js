const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI)

        console.log(`MongoDB Connected: ${conn.connect.host}`.cyan.underline.bold);

    } catch (err) {
        console.error(err.message.red);
        process.exit(1);
    }
}

module.exports = connectDB;