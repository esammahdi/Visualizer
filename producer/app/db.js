// Import modules
// import { MongoClient }  from "mongodb";
import mongoose from "mongoose";
import config from "./config.js";

// Define a schema for the records
const earthquakeSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
  },
  latitude: {
    type: Number,
    required: true,
  },
  longitude: {
    type: Number,
    required: true,
  },
  depth: {
    type: Number,
    required: true,
  },
  magnitude: {
    type: Number,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
});

// Define a global variable for the database client
// let client;
// let db;

// Create a model for the earthquake documents using the schema and the collection name
const Earthquake = mongoose.model("Earthquake", earthquakeSchema);

// Connect to the database
mongoose.connect(config.dbUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Get the connection object
const db = mongoose.connection;

// Handle connection errors
db.on("error", console.error.bind(console, "\n\nDB: connection error:"));

// Handle connection success
db.once("open", () => {
  console.log("\n\nDB: Connected to the database");
});

// Define a function that takes an array of records and inserts them into the collection
async function insertRecords(records) {
  // Use async/await syntax to wait for the operation to succeed
  try {
    // Insert the records and log the result
    const result = await Earthquake.insertMany(records);
    return result;
  } catch (err) {
    // Handle errors
    console.error(err);
    return '';
  }

}

// Define a function to find the last 10 records in the collection and sort them by date in descending order
async function findLastTenRecords() {
  // Use async/await syntax to wait for the query to succeed
  try {
    // Find the last 10 records in the collection and sort them by date in descending order
    const records = await Earthquake.find().sort({ date: -1 }).limit(10);
    
    // Return the records
    return records;
  } catch (err) {
    // Handle errors
    console.error(err);
  }
}

// Define a function to find the records with date greater than lastSentDate and sort them by date in ascending order
async function findRecordsAfter(lastSentDate) {
  // Use async/await syntax to wait for the query to succeed
  try {
    // Find the records with date greater than lastSentDate and sort them by date in ascending order
    const records = await Earthquake.find({ date: { $gt: lastSentDate } }).sort(
      {
        date: -1,
      }
    );

    // Return the records
    return records;
  } catch (err) {
    // Handle errors
    console.error(err);
  }
}

// Define a function to get the last sent date from the database
async function getLastSentDate() {
  // Use async/await syntax to wait for the query to succeed
  try {
    // Find the last sent date in the collection
    const data = await Earthquake.find().sort({ date: -1 }).limit(1);

    // Set the last sent date to the last sent date in the database or zero if no data found
    let result;
    if (data[0] === undefined) {
      result = new Date(0);
      console.log("\n\n\nDB: Document empty or no lastSentDate\n");
    } else {
      result = new Date(data[0].date);
    }

    // Return the last sent date
    return result;
  } catch (err) {
    // Handle errors
    console.error(err);
  }
}

export default {
  insertRecords,
  findLastTenRecords,
  findRecordsAfter,
  getLastSentDate,
}