FROM node:boron
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY ./src/package.json /usr/src/app/
RUN npm install
COPY ./src/ /usr/src/app/
EXPOSE 8080
CMD [ "npm", "start" ]
