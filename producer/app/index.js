// Import modules
import scraper from "./scraper.js";
import kafka from "./kafka.js";
import server from "./server.js";
import config from "./config.js";

// Define an async main function
async function main() {

  try {
    config.print_configuration();
    
    console.log("\nINDEX : Trying to scrap the data...\n\n");
    // Start scraping data
    await scraper.start();

    console.log("\nINDEX : Trying to connect  to Kafka...\n\n");
    // Start sending data to Kafka
    await kafka.start();

    // Start the web server
    console.log("\nINDEX : Starting the server...\n");
    server.start();
  } catch (err) {
    // Handle errors
    console.error("Failed to connect to the database. Error:\n", err);
    process.exit(1);
  }
}

// Call the main function
main();
