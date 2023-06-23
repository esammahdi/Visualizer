# Use the official Node.js image as the base image
FROM node:16.20.0-alpine3.18

# Set the working directory to /app
WORKDIR /Visualizer

# Copy the package.json and package-lock.json files to the working directory
COPY package*.json style.css index.html client.js webpack.config.cjs ./
COPY dist ./dist

# Install the dependencies using npm
RUN npm ci

# Copy the rest of the files to the working directory
COPY style.css index.html client.js webpack.config.cjs dist ./

# Copy the rest of the files to the working directory
COPY src ./src


# Run the index.js file using node
CMD ["node", "src/index.js"]
