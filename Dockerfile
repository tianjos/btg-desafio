# Use official Node 22 base image
FROM node:22

# Create app directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json (if any)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the source code
COPY . .

# Build the project (compile TS to JS)
RUN npm run build

# Default command - just run node dist/index.js (or override)
CMD ["node", "dist/main.js"]
