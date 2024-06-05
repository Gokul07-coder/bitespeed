# Installing Dependencies
FROM node:alpine AS BUILD
WORKDIR /app
# package.json and package-lock.json copied to start the installation
COPY package*.json ./
# Do not install DevDependencies
RUN npm install 
# Remove test and other non production files/dependencies in the node_modules
RUN npm prune --production
# Remove unused files/dependencies across the image
RUN wget -q https://gobinaries.com/tj/node-prune | sh

# Building the Actual Image
FROM node:alpine AS deps
WORKDIR /app
COPY . .
COPY --from=BUILD /app/node_modules node_modules
CMD [ "npm", "start" ]