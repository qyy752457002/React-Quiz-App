# Stage 1
# Build docker image of react-app 
FROM node:21.1.0 as build-stage 

# set docker working directory
WORKDIR /usr/app

# Copy package.json and package-lock.json to docker working directory
COPY ./package*.json .

# Install dependencies.
RUN npm install 

# add `/usr/src/app/node_modules/.bin` to $PATH
ENV PATH /usr/app/node_modules/.bin:$PATH

# copy rest of files from current directory to docker working directory
COPY . .

# Build the React app.
RUN npm run build

# Stage 2
# Run the react app build above in nginx
FROM nginx:1.25.5

# Set working directory to nginx asset directory
WORKDIR /usr/share/nginx/html

# Remove default nginx static assets
RUN rm -rf ./*

# Copy static assets from build stage to working directory
COPY --from=build-stage /usr/app/dist .

# Install Node.js runtime
RUN apt-get update && apt-get install -y nodejs

# Install OpenSSL for SSL Certificate creation
RUN apt-get update && \
    apt-get install -y openssl && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Containers run nginx with global directives and daemon off
ENTRYPOINT ["nginx", "-g", "daemon off;"]