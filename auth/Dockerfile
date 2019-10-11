FROM node:alpine as builder

# Create app directory
WORKDIR /usr/src/app

# Add build support for node-gyp since bcrypt requires some 
# additional installation
RUN apk add --no-cache --virtual .gyp python make g++

# Install app dependencies
COPY . .
# Run the install 
RUN yarn install

# Spin up a lighter version without all the build dependencies
FROM node:alpine as app

WORKDIR /usr/src/app

# Copy everything over
COPY --from=builder /usr/src/app .

EXPOSE 8000
CMD [ "yarn","start" ]
