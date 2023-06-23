// Import libraries
import map from './src/map.js';
import utils from './src/utils.js';
import { io } from "socket.io-client";


// Connect to the server
const socket = io();


map.init();

// // Initialize the map
socket.on('state', (state) => {
  // Update the map with the new data
  map.updateAll(state);
});


// Handle the earthquake data received from the server
socket.on('earthquake', (earthquake) => {
  // Update the map with the new data
  map.update(earthquake);
  // Show a notification on the page
  utils.notify(earthquake);
});
