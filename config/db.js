const { MongoClient } = require("mongodb");
require("dotenv").config();

// Connection URL
const url = process.env.DB_URI;
const client = new MongoClient(url);

// Database Name
const dbName = "Quantum-IT-Innovation";

let dbInstance;

async function connectDB() {
  // Use connect method to connect to the server
  await client.connect();
  console.log("Connected successfully to database");
  dbInstance = client.db(dbName);
  return "done.";
}

const getDB = () => {
  return dbInstance;
};

module.exports = { connectDB, getDB };
