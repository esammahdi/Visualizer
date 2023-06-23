# Visualizer

Visualizer is a project that showcases the power of real-time data visualization on a map. It uses D3.js, Kafka, Node.js, and MongoDB to create an interactive and dynamic dashboard. For demonstration purposes, it only tracks the last 100 (earthquakes with magnitude > 4.0) around the world and displays them on the map with relevant information. However, the application may be extended to include other types of data, such as weather, traffic, or pollution.

<p align="center">
<a href="https://www.iris.edu/hq/" target="_blank" rel="noreferrer"> <img src="readme_files/iris.png" alt="IRIS Data Services" width="100" height="60"/> </a>
<a href="https://www.docker.com/" target="_blank" rel="noreferrer"> <img src="https://www.vectorlogo.zone/logos/docker/docker-ar21.svg" alt="docker" width="100" height="60"/> </a>
<a href="https://d3js.org/" target="_blank" rel="noreferrer"> <img src="https://www.vectorlogo.zone/logos/d3js/d3js-ar21.svg" alt="d3js" width="100" height="60"/> </a>
<a href="https://kafka.apache.org/" target="_blank" rel="noreferrer"> <img src="https://www.vectorlogo.zone/logos/apache_kafka/apache_kafka-ar21.svg" alt="kafka" width="100" height="60"/> </a>
</p>

<p align="center">
<a href="https://nodejs.org/" target="_blank" rel="noreferrer"> <img src="https://www.vectorlogo.zone/logos/nodejs/nodejs-ar21.svg" alt="nodejs" width="100" height="60"/> </a>
<a href="https://kafka.apache.org/" target="_blank" rel="noreferrer"> <img src="https://www.vectorlogo.zone/logos/apache_zookeeper/apache_zookeeper-ar21.svg" alt="kafka" width="100" height="60"/> </a>
<a href="https://www.mongodb.com/" target="_blank" rel="noreferrer"> <img src="https://www.vectorlogo.zone/logos/mongodb/mongodb-ar21.svg" alt="mongodb" width="100" height="60"/> </a>
<a href = "https://webpack.js.org/" target = "_blank" rel = "noreferrer"> <img src = "https://www.vectorlogo.zone/logos/js_webpack/js_webpack-ar21.svg" alt = "webpack" width = "100" height = "60"/> </a>
<a href="https://expressjs.com/" target="_blank" rel="noreferrer"> <img src="https://www.vectorlogo.zone/logos/expressjs/expressjs-ar21.svg" alt="expressjs" width="100" height="60"/> </a>
<a href="https://socket.io/" target="_blank" rel="noreferrer"> <img src="https://www.vectorlogo.zone/logos/socketio/socketio-ar21.svg" alt="socketio" width="100" height="60"/> </a>
<a href = "https://mongoosejs.com/" target = "_blank" rel = "noreferrer"> <img src = "readme_files/mongoose.png" alt = "mongoose" width = "100" height = "60"/> </a>
<a href = "https://axios-http.com/" target = "_blank" rel = "noreferrer"> <img src = "https://www.vectorlogo.zone/logos/axios/axios-ar21.svg" alt = "axios" width = "100" height = "60"/> </a>
<a href = "https://cheerio.js.org/" target = "_blank" rel = "noreferrer"> <img src = "readme_files/cheerio.jpg" alt = "cheerio" width = "100" height = "60"/> </a>
</p>

![Producer page](readme_files/new_earthquake.gif)

## Table of Contents

- [Introduction](#introduction)
- [Technologies](#technologies)
- [Installation](#installation)
- [Usage](#usage)
- [Code of Conduct](#code-of-conduct)
- [Notice](#notice)
- [Contributing](#contributing)
- [License](#license)

## Introduction

Real-time data visualization is a useful and engaging way to explore and understand complex phenomena. It can reveal patterns, trends, and anomalies that are otherwise hidden or difficult to grasp. Visualizer is a project that leverages various technologies to create a real-time data visualization dashboard on a map. It scrapes data from different sources, stores them in a MongoDB database, processes them with Kafka, and serves them with Node.js and Express.js. It also uses Socket.io to enable real-time communication between the server and the client. On the front-end, it uses EJS to render HTML templates and D3.js to create interactive and responsive map visualizations. The application can handle different types of data, but for simplicity, it focuses on earthquake data from around the world. It shows the location, magnitude, depth, and time of the last 100 earthquakes on a map, and allows the user to filter and zoom in on the data. The application also updates the data every 10 minutes to reflect the latest events.

Visualizer consists of four main components:

- An Apache Kafka server that is used for handle and pass realtime data. between the application components.
- A producer that scrapes data from a [website](http://ds.iris.edu/seismon/eventlist/index.phtml) and saves them to a MongoDB database. It also periodically checks the database for new records and sends them through Kafka.
- A consumer that receives the messages through Kafka and highlights them on the map in real-time.
- A docker-compose file that orchestrates the deployment of all the components using Docker.

Visualizer allows users to see the location, magnitude, depth, and time of the most recent earthquakes on a map. Users can also zoom in and out, pan around, and click on each earthquake marker to see more details.

Visualizer is a fun and educational project that demonstrates how to use various technologies to create a data-driven web application.

## Technologies

Visualizer uses the following technologies:

- [Docker](https://www.docker.com/) - A platform for building, running, and sharing applications using containers.
- [D3.js](https://d3js.org/) - A library for manipulating documents based on data using HTML, SVG, and CSS.
- [MongoDB](https://www.mongodb.com/) - A document-based database that stores data in JSON-like format.
- [Kafka](https://kafka.apache.org/) - A distributed streaming platform that enables data pipelines and event-driven applications.
- [Webpack](https://webpack.js.org/) - A module bundler that compiles and optimizes web assets.
- [Zookeeper](https://zookeeper.apache.org/) - A centralized service that maintains configuration information and provides coordination for distributed systems.
- [Node.js](https://nodejs.org/) - A JavaScript runtime environment that executes code outside the web browser.
- [Express.js](https://expressjs.com/) - A web framework for Node.js that simplifies web development.
- [Socket.io](https://socket.io/) - A library that enables real-time communication between web clients and servers.
- [Mongoose](https://mongoosejs.com/) - An object data modeling (ODM) library that simplifies working with MongoDB.
- [Axios](https://axios-http.com/) - A promise-based HTTP client that supports multiple browsers and Node.js.
- [Cheerio](https://cheerio.js.org/) - A fast and flexible library that parses HTML and XML documents.

## Installation

To install and run Visualizer, you need to have Docker and Docker Compose installed on your machine. You  just need to copy/download the [`docker-compose.yml`](docker-compose.yml) file from the repository to a directory and then run the following command to start all the components:

```bash
docker-compose up
```

This will pull the required images from Docker Hub and build the producer and consumer images. It will also create a network and a volume for the containers to communicate and persist data.

## Usage

Once all the components are up and running, you can access the application by opening your web browser and visiting http://localhost:3000 . You should see something like this:

![Consumer page](readme_files/main_page.png)

This page shows the map with the earthquake markers. You can zoom in and out, pan around, and click on each marker to see more details. You can also see the status of the consumer and the number of messages received.

![Consumer page](readme_files/main_page_tip.png)

There is also a page at http://localhost:29009 that shows the last 10 records that were scraped, sorted with the newwest first.

![Producer page](readme_files/producer_page.png)


You can customize some options for the producer and the consumer by using environment variables. 

These are the available variables for the producer:


| Variable | Description | Default |
| --- | --- | --- |
| `MONGO_URI` | The database connection string. | `mongodb://localhost:27017/earthquakes` |
| `DB_NAME` | The database name. | `earthquakes` |
| `DB_USER` | The database username. | Optional |
| `DB_PASSWORD` | The database password. | Optional |
| `WEB_SERVER_PORT` | The web server port. | `29009` |
| `KAFKA_BROKER` | The Kafka broker address. | `localhost:9092` |
| `KAFKA_TOPIC` | The Kafka topic name. | `earthquake` |
| `KAFKA_SEND_INTERVAL` | The time cycle in milliseconds in which the producer will check for new records to send in the database. | `10000` |
| `SCRAPER_INTERVAL` | The time cycle in milliseconds in which the scraper will scrape the website. | `600000` (10 minutes) |

These are the available variables for the consumer:

| Variable | Description | Default |
| --- | --- | --- |
| `PORT` | The port number for the server to serve the page. | `3000` |
| `KAFKA_BROKER` | The address of the Kafka broker. | `localhost:9092` |
| `KAFKA_TOPIC` | The name of the Kafka topic. | `earthquake` |


You can pass them as arguments when running `docker-compose up`. For example:

```bash
MONGO_URI=mongodb://user:pass@host:port/db
```

## Code of Conduct
See the [CODE OF CONDUCT](CODE_OF_CONDUCT.md) file for more details.

## Notice
See the [NOTICE](NOTICE.md) file for more details.

## Contributing
See the [Contributing](CONTRIBUTING,md) file for more details.

## License

Visualizer is licensed under the GNU General Public License v3.0. See the [LICENSE](LICENSE) file for more details.
