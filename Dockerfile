# Use an official Node.js image as the base
FROM node:18-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# Build the Vite project
RUN npm run build

# Install a lightweight server to serve the built files
RUN npm install -g serve

# Expose the port the app runs on
EXPOSE 3000

# Command to run the application
CMD ["serve", "-s", "dist", "-l", "3000"]
