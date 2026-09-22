const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log(`db connected..|');`)
    } catch (error) {
        console.error(`Database connection fiale:`, error);
    }
};

module.exports = connectDB;