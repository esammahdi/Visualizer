import * as d3 from 'd3';

function formatDate(date) {
    // Get the day of the month, pad with zero if needed
    let day = date.getDate().toString().padStart(2, '0');
    // Get the three-letter month name
    let month = date.toLocaleString('en', { month: 'short' });
    // Get the full year
    let year = date.getFullYear();
    // Get the hours, pad with zero if needed
    let hours = date.getHours().toString().padStart(2, '0');
    // Get the minutes, pad with zero if needed
    let minutes = date.getMinutes().toString().padStart(2, '0');
    // Get the seconds, pad with zero if needed
    let seconds = date.getSeconds().toString().padStart(2, '0');
    // Return the formatted string
    return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
  }

// Define a function to calculate the distance between two points on the map
function getDistance(x1, y1, x2, y2) {
  // Use the Pythagorean theorem to calculate the distance
  const dx = x2 - x1;
  const dy = y2 - y1;
  const distance = Math.sqrt(dx * dx + dy * dy);
  // Return the distance
  return distance;
}

// Define a function to generate a random color
function getRandomColor() {
  // Use d3-color to create a random rgb color
  const color = d3.rgb(Math.random() * 255, Math.random() * 255, Math.random() * 255);
  // Return the color as a hex string
  return color.formatHex();
}

// Define a function to show a notification on the page
function notify(earthquake) {
  // Format the date and location of the earthquake
  const date = formatDate(new Date(earthquake.date));
  const location = earthquake.location;

  // Create a div element for the notification and set its attributes and style
  const notification = document.createElement('div');
  notification.setAttribute('class', 'notification');


  // Set the html content of the notification element with the earthquake data
  notification.innerHTML = `
    <p><strong>New earthquake detected!</strong></p>
    <p><strong>Date:</strong> ${date}</p>
    <p><strong>Location:</strong> ${location}</p>
    <p><strong>Magnitude:</strong> ${earthquake.magnitude}</p>
    <p><strong>Depth:</strong> ${earthquake.depth} km</p>
  `;

  // Append the notification element to the body element
  document.body.appendChild(notification);

  // Set a timeout to show the notification element by changing its opacity
  setTimeout(() => {
    notification.style.opacity = '1';
  }, 100);

  // Set another timeout to remove the notification element after 5 seconds
  setTimeout(() => {
    document.body.removeChild(notification);
  }, 5000);
}

// Export the functions as a module
export default {
  formatDate,
  getDistance,
  getRandomColor,
  notify
};
