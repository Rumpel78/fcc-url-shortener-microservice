# FreeCodeCamp API Projects

## URL Shortener Microservice

* **Objective**: Build a full stack JavaScript app that is functionally similar to this: <https://little-url.herokuapp.com/> and deploy it to Heroku.
* **User Story**: I can pass a URL as a parameter and I will receive a shortened URL in the JSON response.
* **User Story**: If I pass an invalid URL that doesn't follow the valid <http://www.example.com> format, the JSON response will contain an error instead.
* **User Story**: When I visit that shortened URL, it will redirect me to my original link.

### To run this app with docker:
* Build image: `docker build -t rumpel78/shortener .`
* Start mongodb: `docker run -d --name mongodb mongo`
* Run container: `docker run -p8080:8080 --name fcc_shortener rumpel78/shortener`  
* Open in browser: http://localhost:8080
* To remove the container run: `docker rm fcc_shortener -f`
* To remove the mongo container run: `docker rm mongodb -f`

### To run this app with nodejs and without docker:
* You need a working mongodb instance to start this app
* Enter source directory: `cd src`
* Change line 3 of *server.js*, variable *mongoUrl* to your mongodb endpoint
* Install packages: `npm install`
* Start nodjs server: `npm start`  
* Open in browser: http://localhost:8080

See the result under: https://shortener.app.rzipa.at/  
To take a look at the other projects go to https://app.rzipa.at
