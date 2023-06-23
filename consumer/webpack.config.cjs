// import { fileURLToPath } from "url";
// import path from "path";
const path = require('path');
// import { process } from 'process/';

// const __dirname = path.dirname(fileURLToPath(import.meta.url));

module.exports = {
  // The entry point of your application
  entry: "./client.js",
  // The output file where webpack will bundle your modules
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  // The mode of your bundle, either 'development' or 'production'
  mode: "development",
  resolve: {
    modules: ['node_modules'],
    fallback: {
      path: false,
      os: false,
      crypto: false,
      process: require.resolve('process/browser'),
    },
  },

};
