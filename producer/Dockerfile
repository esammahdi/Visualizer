# Use the official Node.js image as the base image
FROM node:16.20.0-alpine3.18

# Set the working directory to /app
WORKDIR /Visualizer

# Copy the package.json and package-lock.json files to the working directory
COPY package*.json ./

# Install the dependencies using npm
RUN npm ci

# Copy the rest of the files to the working directory
COPY app ./app

# Run the index.js file using node
CMD ["node", "app/index.js"]
