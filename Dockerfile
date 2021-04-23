FROM mhart/alpine-node:16
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY . .
RUN npm build
EXPOSE 3000
RUN npm start