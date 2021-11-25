const mongoose = require('mongoose');

const MONGO_URI = process.env.MONGO_URI;

const connectDB = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log('MongoDB is connecting now');
    } catch (error) {
        console.error(error);
    }
}

module.exports = connectDB;