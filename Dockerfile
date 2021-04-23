FROM mhart/alpine-node:16
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY . .
RUN npm install
RUN npm run build
EXPOSE 3000
RUN QOVERY_DATABASE_UNION_BOOTH_CONNECTION_URI=$QOVERY_DATABASE_UNION_BOOTH_CONNECTION_URI npm run start