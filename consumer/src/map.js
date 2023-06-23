// Imports
import * as d3 from "d3";
import config from "./config.js";

const COLOR_SCALE = config.COLOR_SCALE;

const SIZE_SCALE = config.SIZE_SCALE;

const PROJECTION = config.PROJECTION;

let map;
let data;
let popup;

// Define the width variable
const width = document.getElementById("map").clientWidth;
// Define the width variable
const height = document.getElementById("map").clientHeight;

const t = d3.transition().duration(250).ease(d3.easeCubic);

// Create a zoom instance with some options
let zoom = d3
  .zoom()
  .scaleExtent([0.5, 5]) // This control how much you can unzoom (x0.5) and zoom (x20)
  .extent([
    [0, 0],
    [width, height],
  ])
  .on("zoom", updateChart);

// Define a function to initialize the map
async function init() {
  // Select the map element and append an svg element to it
  map = d3
    .select("#map")
    .append("svg")
    .attr("width", "100%")
    .attr("height", "100%");
  // Select the popup element and hide it by default
  popup = d3.select("#popup").classed("hidden", true);

  // Call the zoom function on the map element to attach the zoom behavior to it
  map.call(zoom);

  // Load the world geojson data and draw the map
  data = await d3.json(
    "https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson"
  );
  drawMap(data);
}

// Define a function to draw the map using the geojson data
function drawMap(data) {
  // Create a path generator using the projection
  const path = d3.geoPath().projection(PROJECTION);

  // Append a path element for each feature in the data and set its attributes and style
  map
    .selectAll("path")
    .data(data.features)
    .enter()
    .append("path")
    .attr("d", path)
    .attr("stroke", "#fff")
    .attr("fill", "#69b3a2")
    .attr("class", "country");
}

// Define a function to update the map with all the data
function updateAll(state) {
  let circles;
  circles = map.append("g");

  // Use a data join to create, update, and remove circles based on the data
  circles
    .selectAll("circle")
    .data(state) // use the whole array for the data join
    .join(
      // create new circles for new data points
      (enter) =>
        enter
          .append("circle")
          // Project the earthquake coordinates to the map coordinates
          .attr("cx", (d) => PROJECTION([d.longitude, d.latitude])[0])
          .attr("cy", (d) => PROJECTION([d.longitude, d.latitude])[1])
          .attr("r", 0) // start with zero radius
          .attr("fill", (d) => COLOR_SCALE(d.magnitude))
          .attr("stroke", "black")
          .attr("opacity", 0.5)
          // Add an event listener to show the popup on mouseover
          .on("mouseover", function (event, d) {
            // Get the cursor coordinates relative to the SVG element
            let [x, y] = d3.pointer(event, this.parentNode);
            // Call the showPopup function with the earthquake data and the coordinates
            showPopup(d, x, y);
          })
          // Add an event listener to hide the popup on mouseout
          .on("mouseout", hidePopup)
          // Transition the radius to the final value
          .call((enter) =>
            enter
              .transition()
              .ease(d3.easeCircleInOut)
              .duration(1000)
              .attr("r", (d) => SIZE_SCALE(d.magnitude))
          ),
      // update existing circles for updated data points (optional)
      (update) =>
        update.call((update) =>
          // Transition the attributes to the new values
          update
            .transition()
            .duration(1000)
            .attr("cx", (d) => PROJECTION([d.longitude, d.latitude])[0])
            .attr("cy", (d) => PROJECTION([d.longitude, d.latitude])[1])
            .attr("r", (d) => SIZE_SCALE(d.magnitude))
            .attr("fill", (d) => COLOR_SCALE(d.magnitude))
        ),
      // remove old circles for removed data points (optional)
      (exit) =>
        exit.call((exit) =>
          // Transition the radius to zero and then remove the element
          exit.transition().duration(1000).attr("r", 0).remove()
        )
    );
}

// Define a function to update the map with the new data
function update(earthquake) {
  let circles;
  circles = map.append("g");

  // Project the earthquake coordinates to the map coordinates
  const [x, y] = PROJECTION([earthquake.longitude, earthquake.latitude]);

  // Use a data join to create, update, and remove circles based on the data
  circles
    .selectAll("circle")
    .data([earthquake]) // use an array with one element for each update
    .join(
      // create new circles for new data points
      (enter) =>
        enter
          .append("circle")
          .attr("cx", x)
          .attr("cy", y)
          .attr("r", 0) // start with zero radius
          .attr("fill", COLOR_SCALE(earthquake.magnitude))
          .attr("stroke", "black")
          .attr("opacity", 0.5)
          // Add an event listener to show the popup on mouseover
          .on("mouseover", function () {
            // Get the cursor coordinates relative to the SVG element
            let [x, y] = d3.pointer(this.parentNode);
            // Call the showPopup function with the earthquake data and the coordinates
            showPopup(earthquake, x, y);
          })
          // Add an event listener to hide the popup on mouseout
          .on("mouseout", hidePopup)
          // Transition the radius to the final value
          .call((enter) =>
            enter
              .transition()
              .duration(2000)
              .attr("r", SIZE_SCALE(earthquake.magnitude))
          ),
      // update existing circles for updated data points (optional)
      (update) =>
        update.call((update) =>
          // Transition the attributes to the new values
          update
            .transition()
            .duration(1000)
            .attr("cx", x)
            .attr("cy", y)
            .attr("r", SIZE_SCALE(earthquake.magnitude))
            .attr("fill", COLOR_SCALE(earthquake.magnitude))
        ),
      // remove old circles for removed data points (optional)
      (exit) =>
        exit.call((exit) =>
          // Transition the radius to zero and then remove the element
          exit.transition().duration(1000).attr("r", 0).remove()
        )
    );
}

// Define a function to update the map and the circles when the zoom event occurs
function updateChart(event, d) {
  // Get the current transform from the event
  var transform = event.transform;

  // Update the map path with the new scale and translation
  map.selectAll("path").attr("transform", transform);

  // Update the circles position and size with the new scale and translation
  map
    .selectAll("circle")
    .attr("cx", function (d) {
      return transform.applyX(PROJECTION([d.longitude, d.latitude])[0]);
    })
    .attr("cy", function (d) {
      return transform.applyY(PROJECTION([d.longitude, d.latitude])[1]);
    })
    .attr("r", function (d) {
      return transform.k * SIZE_SCALE(d.magnitude);
    });
}

// Define a function to show the popup with the earthquake data
function showPopup(earthquake, x, y) {
  const formatDate = d3.timeFormat("%d-%b-%Y %H:%M:%S");
  const date = formatDate(new Date(earthquake.date));

  // Set style of popup element to position it below mouse cursor
  popup.style("left", x + "px");
  popup.style("top", y + "px");

  popup.html(`
    <p><strong>Date:</strong> ${date}</p>
    <p><strong>Location:</strong> ${earthquake.location}</p>
    <p><strong>Magnitude:</strong> ${earthquake.magnitude}</p>
    <p><strong>Depth:</strong> ${earthquake.depth} km</p>
  `);

  popup.classed("hidden", false);
}

function hidePopup() {
  popup.classed("hidden", true);
}

export default {
  init,
  update,
  updateAll,
};
