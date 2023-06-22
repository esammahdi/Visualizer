// Import modules
import { Kafka } from "kafkajs";
import config from "./config.js";
import db from "./db.js";

let lastSentDate;

const kafka = new Kafka({
  clientId: "earthquak-app",
  brokers: [config.kafkaBroker],
  retry: {
    initialRetryTime: 200,
    retries: 5,
  },
  protocol: "PLAINTEXT",
});

const producer = kafka.producer();

producer.on("producer.connect", () => {
  console.log(`\n\nKAFKA: KafkaProvider: connected\n\n`);
});
producer.on("producer.disconnect", () => {
  console.log(`\n\nKAFKA: KafkaProvider: Disconnected\n\n`);
});
producer.on("producer.network.request_timeout", (payload) => {
  console.log(`KAFKA: KafkaProvider: request timeout ${payload.clientId}`);
});

async function connect() {
  try {
    await producer.connect();
  } catch (error) {
    console.error("\n\nKAFKA: Producer failed to connect. Error is :" + error);
  }
}

// Define a function that sends data to another app using Kafka
async function send() {
  try {
    const records = await db.findRecordsAfter(lastSentDate);

    if (records.length === 0) {
      console.log("\nKAFKA: No new records to send.\n");
    } else {
      // console.log(records);
      lastSentDate = new Date(records[0].date);
      // Loop through each record
      records.forEach((record) => {
        // Convert the record to a JSON string
        const data = JSON.stringify(record);

        // Create a message object with the data and the topic name
        const message = {
          topic: config.kafkaTopic,
          messages: [{ value: data }],
        };

        // Send the message to Kafka using the producer
        producer.send(message).then(() => {
          // Log a success message
          console.log("KAFKA: Message sent:", data);
        });
      });
    }
  } catch (err) {
    console.error(
      "\n\nKAFKA: Error. Either failed to send message or get the data from the database. Error is:\n" +
        err +
        "\n\n"
    );
  }
}

// Export a start function that connects to Kafka and calls the send function periodically
export default {
  async start() {
    await connect();
    lastSentDate = new Date(0);
    await send();
    setInterval(send, config.kafkaSendInterval);
    return "done";
  },
};
