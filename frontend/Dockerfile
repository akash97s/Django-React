# frontend/Dockerfile

# Use the official Node.js image from the Docker Hub
FROM node:18

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Install the Node.js dependencies
RUN npm install

# Copy the Next.js project files into the container
COPY . .

# Build the Next.js application
RUN npm run build

# Expose the port Next.js will run on
EXPOSE 3000

# Set the default command to start the Next.js server
CMD ["npm", "start"]
