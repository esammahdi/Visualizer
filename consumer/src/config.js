import process from 'process';
import * as d3 from 'd3';

// Define default values
const DEFAULT_PORT = 3000;
const SERVER_ADDRESS = 'http://localhost:' + (process.env.PORT || DEFAULT_PORT);
const DEFAULT_KAFKA_BROKER = "localhost:9092";
const DEFAULT_KAFKA_TOPIC = "earthquake";

const projection = d3.geoNaturalEarth1().scale(200).translate([500, 300]);
const colorScale = d3.scaleThreshold().domain([2, 5, 7]).range(["green", "yellow", "orange", "red"]);
const sizeScale = d3.scaleLinear().domain([0, 10]).range([2, 20]);


// Define the constants and parameters of the app
export default {
    // The port number for the server
    PORT: process.env.PORT || DEFAULT_PORT,
    // The address of the kafka broker
    KAFKA_BROKER: process.env.KAFKA_BROKER || DEFAULT_KAFKA_BROKER,
    // The name of the kafka topic
    KAFKA_TOPIC: process.env.KAFKA_TOPIC || DEFAULT_KAFKA_TOPIC,
    PROJECTION : projection,
    COLOR_SCALE : colorScale,
    SIZE_SCALE  : sizeScale,
    SERVER_ADDRESS,
  };
  