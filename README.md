###Lab-13 Express with MongoDB - one resource

# Description
A REST API for where users can make POST, GET, PUT, and DELETE requests to /api/superheroes. This lab we use MongoDB with Mongoose.js.

## App directory
- db directory (for MongoDB to create collection and documents)
- lib directory (empty)
- model directory (Superhero.js - model constructor)
- node_modules (Once you npm install this will be created)
- routes (superRouter.js - this is for operations of CRUD)
- test (mockEnv.js - for mock environment variables, superRouter-test.js - Mocha and Chai are used to test and expect results using our applications resources)
- **server.js** -- starts the server and creates an instance of a router for the superheroes API

#Usage
## In your terminal
- After cloning directory run npm install to install all the required dependancies.
  `npm install`
- Create a `.env` in the root directory this will have you environment variables
  `PORT=2000`
  `MONGODB_URI=mongodb://localhost/dev`
- To start the mongo server dedicate one of terminal window to this and type
  `mongod --dbpath ./db`
  NOTE: You must be in the root directory of this application to start this server correctly.
- In the second terminal tab or window, type
  `npm start`
  nodemon will serve up port you have identified in your `.env` file.
- Lastly in a third and separate window you can make requests to the api using the following commands:
  `http POST localhost:3000/api/superheroes name="exampleHero" power="examplePower"`
  The server will respond with a `200 OK` status and return the new item data. Note the unique ID.
  If you get `400 Bad Request` this means you didn't add all the arguments in the CLI.
- To get an array of all the superheroes IDs currently in the data directory, make a GET request without an ID query:
  `http GET :3000/api/superheroes`
-To read a superhero that exists in the API, make a GET request with the superhero's unique ID:
  *use the id from the POST request's response*
  `http GET :3000/api/superheroes/:id`
-To delete a superhero from the API, make a DELETE request with the superhero's unique ID:
  `http DELETE :3000/api/superheroes/:id`
