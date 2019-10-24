# image to build from
FROM node:10

# labels
LABEL version="1.0"
LABEL author="Emeka"

# enviromental variableas
ENV  PORT=8080
ENV  SECRET_KEY="iverygoodsecret"

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

# install depencencies
RUN npm install

# Bundle app source
COPY . .

# expose port number
EXPOSE 8080

# start app
CMD [ "npm", "start" ]