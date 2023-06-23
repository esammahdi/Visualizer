// Imports
import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import { fileURLToPath } from "url";
import path from "path";
import config from "./config.js";
import data from "./data.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Create an express app
const app = express();

// Create a socket.io server
const server = createServer(app);
const io = new Server(server);

// Define a middleware function to emit the state object before forwarding the request to serve the static files
const stateEmitterMiddleware = async (req, res, next) => {
  if (req.url === "/dist/bundle.js") {
    let state = data.getState();
    setTimeout(() => {
      io.emit("state", state);
    }, 2000);
  }
  next();
};

// Serve static files from the root folder
app.use(stateEmitterMiddleware);
app.use(express.static(__dirname + "/../"));

const promise = new Promise((resolve) => {
  // Set a timer to resolve the promise after 3 seconds
  setTimeout(() => {
    resolve("Promise resolved");
  }, 1000);
});

export { io };

// Export a start function that starts the web server on the configured port
export default {
  async start() {
    // Start the web server on the configured port
    server.listen(config.PORT, () => {
      console.log(`\nSERVER: Web server listening on port ${config.PORT}\n`);
    });

    const result = await promise;
  },
};
