// Get the elements from the document
const form = document.getElementById("new-record");
const alert = document.getElementById("alert");
const records = document.getElementById("records");

// Define a function that creates a table row from a record object
function createRow(record) {
  // Create a table row element
  const row = document.createElement("tr");

  // Create a table cell element for each field in the record
  const dateCell = document.createElement("td");
  const latCell = document.createElement("td");
  const lonCell = document.createElement("td");
  const magCell = document.createElement("td");
  const depthCell = document.createElement("td");
  const locationCell = document.createElement("td");

  // Set the text content of each cell to the corresponding value in the record
  dateCell.textContent = record.date;
  latCell.textContent = record.lat;
  lonCell.textContent = record.lon;
  magCell.textContent = record.mag;
  depthCell.textContent = record.depth;
  locationCell.textContent = record.location;

  // Append each cell to the row
  row.appendChild(dateCell);
  row.appendChild(latCell);
  row.appendChild(lonCell);
  row.appendChild(magCell);
  row.appendChild(depthCell);
  row.appendChild(locationCell);

  // Return the row element
  return row;
}

