# Use an official Node runtime as a parent image
FROM node:18-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json (if available) to the working directory
COPY rickandmorty/package.json rickandmorty/package-lock.json* ./ 

# Install dependencies
RUN npm install

# Copy the remaining application code to the working directory
COPY rickandmorty/ ./

# Expose the port on which the React app runs (typically 3000)
EXPOSE 3000

# Run the React application
CMD ["npm", "start"]
