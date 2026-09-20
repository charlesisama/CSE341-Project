const { MongoClient } = require("mongodb");

require("dotenv").config();

let database;

const initDb = async () => {
    if (database) {
        console.log("Database is already initialized!");
        return;
    }

    try {
        const client = await MongoClient.connect(process.env.MONGODB_URL);

        database = client.db();

        console.log("✅ Connected successfully to MongoDB Atlas!");
    } catch (error) {
        console.error("MongoDB connection error:", error);
        throw error;
    }
};

const getDatabase = () => {
    if (!database) {
        throw new Error("Database not initialized");
    }

    return database;
};

module.exports = {
    initDb,
    getDatabase
};