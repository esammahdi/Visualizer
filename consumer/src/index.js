// Import modules
import kafka from "./kafka.js";
import server from "./server.js";

// Define an async main function
async function main() {

  try {

    // Start the web server
    console.log("\nINDEX : Starting the server...\n");
    await server.start();

    console.log("\nINDEX : Trying to connect  to Kafka...");
    // Start Kafka
    await kafka.start();

  } catch (err) {
    // Handle errors
    console.error("Failed to connect to the database. Error:\n", err);
    process.exit(1);
  }
}

// Call the main function
main();
