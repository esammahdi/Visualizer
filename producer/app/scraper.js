// Import modules
import axios from 'axios';
import cheerio from 'cheerio';
import db from './db.js';
import config from './config.js';

// Define the URL to scrape
const URL = "http://ds.iris.edu/seismon/eventlist/index.phtml";


// Define a function that scrapes data from the website and writes it to the database
async function scrape(url = URL) {
  let lastSentDate = await db.getLastSentDate();
  console.log("\n\nSCRAPER: recorded lastSentDate : " + lastSentDate + "\n");
  console.log("\n\nSCRAPER: Scraping Data from : " + url + "\n");
  // // Get the collection from the database
  // const collection = await db.getCollection();

  let response;

  try {
    // Make a GET request to the URL
    response = await axios.get(url);
  } catch (error) {
    console.error('\n\nSCRAPER: An Error Occured while trying to scrape the data. Error : \n');
    console.error(error);
    return;
  }

  // Check if the response is successful
  if (response.status === 200) {
    // Load the HTML into cheerio
    const $ = cheerio.load(response.data);

    // Find the table rows in the HTML
    const rows = $("table tr");

    // Check if there are any rows
    if (rows.length > 0) {
      // Initialize a counter for records inserted
      let count = 0;
      let result;
      // Skip the first row (header) and only write 100 element to the db

      let records = [];
      // Loop through each row using a for-of loop
      for (let [i,row] of rows.toArray().entries()) {

        if(i === 0) continue;
        if (i > 100) break;

        // Extract the data from the row using cheerio selectors
        let date = $(row).find("td:nth-child(1)").text().trim();
        let lat = $(row).find("td:nth-child(2)").text().trim();
        let lon = $(row).find("td:nth-child(3)").text().trim();
        let mag = $(row).find("td:nth-child(4)").text().trim();
        let depth = $(row).find("td:nth-child(5)").text().trim();
        let location = $(row).find("td:nth-child(6)").text().trim();

        // Convert the data to the appropriate types and a Date object
        date = getDate(date);
        lat = parseFloat(lat);
        lon = parseFloat(lon);
        mag = parseFloat(mag);
        depth = parseInt(depth);

        // Check if the date is newer than the last sent date
        if (date > lastSentDate) {
          // Create a record object with the data
          let record = {
            date: date,
            latitude: lat,
            longitude: lon,
            magnitude: mag,
            depth: depth,
            location: location,
          };

          records.push(record);
        } else {
          break;
        }
      }

      if(records.length > 0) {
        try {
          console.log('\n\nSCRAPER: Newer records found.Trying to insert...\n');
          // Insert the record into the collection using await
          result = await db.insertRecords(records);
          // Log a success message
          console.log("\n\nSCRAPER: Inserting result: \n\n");
          console.log(result);
          // Increment the counter
        } catch (err) {
          // Handle database error
          console.error("\n\nSCRAPER: Failed to insert record:", err);
        }
        // Return a promise that resolves with the number of records inserted
        console.log("\n\nSCRAPER: Records inserted: " + records.length + "\n");
        return Promise.resolve(count);
      }
      
      return Promise.resolve(count);
    } else {
      // Return a promise that rejects with an error message
      return Promise.reject(new Error("\n\nSCRAPPER: No data found in URL\n"));
    }
  } else {
    // Return a promise that rejects with an error message
    return Promise.reject(new Error("\n\nSCRAPPER: Failed to get data from URL\n"));
  }
}

function getDate(DateString) {
  var dateString = DateString;
  var parts = dateString.split(/[-\s:]/);
  var months = {
    JAN: "01",
    FEB: "02",
    MAR: "03",
    APR: "04",
    MAY: "05",
    JUN: "06",
    JUL: "07",
    AUG: "08",
    SEP: "09",
    OCT: "10",
    NOV: "11",
    DEC: "12",
  };
  var isoString =
    parts[2] +
    "-" +
    months[parts[1]] +
    "-" +
    parts[0] +
    "T" +
    parts[3] +
    ":" +
    parts[4] +
    ":" +
    parts[5] +
    "Z";
  return new Date(isoString);
}

// Export the lastSentDate variable and a start function that calls the scrape function periodically
export default {
  async start() {
    // Call the scrape function once at the start
    await scrape();
    // Call the scrape function every interval
    setInterval(scrape, config.scraperInterval);
  },
};
