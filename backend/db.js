const mongoose = require('mongoose');

const mongoURI = 'mongodb://127.0.0.1/inotebook'

const connectToMongo = async () => {
    try {
        await mongoose.connect(mongoURI);
        console.log('Mongo Connected successfully!!');
    } catch (err) {
        console.error('Error connecting to MongoDB:', err);
    }
};

module.exports = connectToMongo;

