const mongoose = require("mongoose");
require("dotenv").config();

const mongoUri = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/socialNetworkDB";

if (!mongoUri) {
    throw new Error('Missing MONGO_URI environment variable');
}

mongoose.connect(mongoUri); 

module.exports = mongoose.connection;
