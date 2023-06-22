import express from "express";
import ejs from "ejs";
import asyncHandler from "express-async-handler"; // Import express-async-handler
import { fileURLToPath } from "url";
import path from "path";
import config from "./config.js";
import db from "./db.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Create an express app
const app = express();
// Set the view engine to ejs
app.set("view engine", "ejs");
// Set the view directory to app/views
app.set("views", __dirname + "/views");

// Use express middleware for parsing JSON and serving static files
app.use(express.json());
app.use(express.static("public"));


// Define a route for the homepage
app.get(
  "/",
  asyncHandler(async (req, res) => {
    // Find the last 10 records in the collection and sort them by date in descending order
    const records = await db.findLastTenRecords();

    // Render the index template with the records
    res.render("index.ejs", { records });
  })
);

// Export a start function that starts the web server on the configured port
export default {
  start() {
    // Start the web server on the configured port
    app.listen(config.port, () => {
      console.log(`\n\nSERVER: Web server listening on port ${config.port}\n`);
    });
  },
};
