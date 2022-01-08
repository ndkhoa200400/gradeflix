# Check out https://hub.docker.com/_/node to select a new base image
FROM node:14-alpine

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install app dependencies
COPY package.json ./

RUN npm install
COPY . .

# Build for production.
RUN npm run build --production

# Install `serve` to run the application.
RUN npm install -g serve


EXPOSE 3000
# start app
# CMD [ "npm", "run", "start" ]
CMD serve -s build
