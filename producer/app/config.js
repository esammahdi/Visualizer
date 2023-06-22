// Load environment variables
import dotenv from "dotenv";

// Define default values
const DEFAULT_DB_NAME = "earthquakes";
const DEFAULT_DB_URI = 'mongodb://localhost:27017/' + DEFAULT_DB_NAME ;
const DEFAULT_PORT = 29009;
const DEFAULT_KAFKA_BROKER = "localhost:9092";
const DEFAULT_KAFKA_TOPIC = "earthquake";
const DEFAULT_KAFKA_SEND_INTERVAL = 10000;
const DEFAULT_SCRAPER_INTERVAL = 10 * 60 * 1000; // 10 minutes


  // Database connection string
  let dbUri =  process.env.MONGO_URI || DEFAULT_DB_URI;
  // Database name
  let dbName = process.env.DB_NAME || DEFAULT_DB_NAME;
  // Database username
  let dbUser = process.env.DB_USER;
  // Database password
  let dbPassword = process.env.DB_PASSWORD;
  // Web server port
  let port = process.env.WEB_SERVER_PORT || DEFAULT_PORT;
  // Kafka broker address
  let kafkaBroker = process.env.KAFKA_BROKER || DEFAULT_KAFKA_BROKER;
  // Kafka topic name
  let kafkaTopic = process.env.KAFKA_TOPIC || DEFAULT_KAFKA_TOPIC;
  let kafkaSendInterval = process.env.KAFKA_SEND_INTERVAL || DEFAULT_KAFKA_SEND_INTERVAL;
  let scraperInterval = process.env.SCRAPER_INTERVAL || DEFAULT_SCRAPER_INTERVAL;

function print_configuration() {
console.log('\n\nProducer Runtime Configuration:\n');
// Log the values to the console
console.log("Database connection string:", dbUri);
console.log("Database name:", dbName);
console.log("Database username:", dbUser);
console.log("Database password:", dbPassword);
console.log("Web server port:", port);
console.log("Kafka broker address:", kafkaBroker);
console.log("Kafka topic name:", kafkaTopic);
console.log("Kafka send interval:", kafkaSendInterval);
console.log("Scraper interval:", scraperInterval);
}
// Export configuration object
export default {
  print_configuration,
  dbUri,
  dbName,
  dbUser,
  dbPassword,
  port,
  kafkaBroker,
  kafkaTopic,
  kafkaSendInterval,
  scraperInterval,
};
