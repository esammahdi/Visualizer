// Import kafkajs and data modules
import { Kafka } from "kafkajs";
import data from "./data.js";
import { io } from "./server.js";
import config from "./config.js";

// Create a kafka client and consumer
const kafka = new Kafka({
  clientId: "earthquake-app",
  brokers: [config.KAFKA_BROKER],
  retry: {
    initialRetryTime: 3000,
    retries: 5,
  },
  protocol: "PLAINTEXT",
});

const consumer = kafka.consumer({ groupId: "earthquake-group" });

consumer.on("consumer.connect", () => {
  console.log(`\n\nKAFKA: KafkaProvider: connected\n\n`);
});
consumer.on("consumer.disconnect", () => {
  console.log(`\n\nKAFKA: KafkaProvider: Disconnected\n\n`);
});
consumer.on("consumer.network.request_timeout", (payload) => {
  console.log(`KAFKA: KafkaProvider: request timeout ${payload.clientId}`);
});

// Connect to kafka and subscribe to the topic
async function connect() {
  try {
    await consumer.connect();
    await consumer.subscribe({
      topic: config.KAFKA_TOPIC,
      fromBeginning: true,
    });
    console.log("\n\nKAFKA: Connected to kafka");
  } catch (error) {
    console.error("\n\nKAFKA: Consumer failed to connect. Error is :" + error);
  }
}

// Consume messages from kafka and send them to the client
async function consume() {
  await consumer.run({
    eachMessage: async ({ message }) => {
      console.log("\n\nKAFKA: Consumed message.");
      // Process the message value using data module
      data.processMessage(message.value.toString(), io);
    },
  });
}

// Export a start function that connects to Kafka and calls the send function periodically
export default {
  async start() {
    await connect();
    await consume();
    return "done";
  },
};
