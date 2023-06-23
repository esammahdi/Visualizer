let state = [];

// Define a function to parse the message value
function parseMessage(value) {
  // Try to parse the value as JSON
  try {
    // Return the parsed object
    return JSON.parse(value);
  } catch (error) {
    // Return null if the value is not valid JSON
    return null;
  }
}

// Define a function to check if the earthquake data is valid
function isValid(earthquake) {
  // Check if the earthquake is an object and has the required properties
  if (typeof earthquake === "object" && earthquake !== null) {
    if (
      "date" in earthquake &&
      "latitude" in earthquake &&
      "longitude" in earthquake &&
      "magnitude" in earthquake &&
      "depth" in earthquake &&
      "location" in earthquake
    ) {
      // Check if the properties have the correct types and values
      if (
        typeof earthquake.date === "string" &&
        typeof earthquake.latitude === "number" &&
        typeof earthquake.longitude === "number" &&
        typeof earthquake.magnitude === "number" &&
        typeof earthquake.depth === "number" &&
        typeof earthquake.location === "string"
      ) {
        if (
          earthquake.latitude >= -90 &&
          earthquake.latitude <= 90 &&
          earthquake.longitude >= -180 &&
          earthquake.longitude <= 180 &&
          earthquake.magnitude >= 0 &&
          earthquake.depth >= 0
        ) {
          // Return true if the data is valid
          return true;
        }
      }
    }
  }
  // Return false otherwise
  return false;
}


// Define a function to update the state of the app with the new data
function updateState(earthquake) {
  state.push(earthquake);
  // Sort the state array by date in descending order
  state.sort((a, b) => new Date(b.date) - new Date(a.date));
  // Keep only the last 100 elements in the state array
  state.splice(100);
}

// Define a function to get the state of the app
function getState() {
  return [...state];
}

// Defin a function to  process the message value and emit it to the client
function processMessage(value, io) {
  // Parse and validate the message value
  const earthquake = parseMessage(value);
  if (isValid(earthquake)) {

    updateState(earthquake);

    // Emit the earthquake data to the client
    try {
      io.emit("earthquake", earthquake);
    } catch (error) {
      console.error(
        "\n\nDATA: Error: Could not emit the received object. The error is :\n"
      );
      console.error(error);
    }
  }
}

// Export the functions as a module
export default {
  parseMessage,
  processMessage,
  isValid,
  getState,
};
