const mongoose = require("mongoose");
const superAdmin = require("./superAdmin");

const dbconnection = () => {
    let retries = 0;
    const maxRetries = 5;
    const baseReconnectInterval = 2000; // 2 seconds

    function calculateReconnectInterval() {
        return baseReconnectInterval * Math.pow(2, retries);
    }

    mongoose.connection.on('error', (error) => {
        if (error.name === 'MongoNetworkError' && retries < maxRetries) {
            retries++;
            const delay = calculateReconnectInterval();
            console.warn(`Connection error, retrying in ${delay / 1000} seconds...`);
            setTimeout(() => mongoose.connect(process.env.DB_url), delay);
        } else {
            console.error('Failed to connect to MongoDB after retries:', error);
        }
    });
    mongoose.connect(process.env.DB_url, { serverSelectionTimeoutMS: 50000 })
        .then(() => {
            console.log('Connected to MongoDB')
            superAdmin();
        })
        .catch(error => console.error('Error connecting to MongoDB:', error));

};

module.exports = dbconnection;