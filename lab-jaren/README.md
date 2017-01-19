Lab-13 Express with MongoDB

## Description
A REST API for games on an HTTP server that users can make POST, GET, PUT, and DELETE requests to with appropriate routes and responses. This lab differs from Lab-11 & 12 in that MongoDB, with the use of Mongoose.js as the ORM, handles model construction, data storage in a database, and CRUD database manipulation methods.
##### Modules
- **server.js** -- starts the server and creates an instance of a router for the games API
- **game.js** -- item constructor that assigns a unique id to each game and takes user input data for:
  - title *required for POST*
  - genre *required for POST*
  - developer *required for POST*
  - publisher
  - platforms
  - ESRB rating
  - release date
- **storage.js** -- storage for item data; stores each item by item type and id
- **game-router.js** -- creates routes for doing create, read, and delete operations on items

## Usage
You will need three separate terminal windows for this simulation.
First window:
- Create a file in the directory for your environment variables by typing `atom .env`, or whichever text-editor you use in place of atom, and on the first line type `MONGODB_URI=mongodb://localhost/dev`, then save the file.
- You must initiate MongoDB for your session. In one of the terminal windows, type `mongod --dbpath ./db` to indicate the database folder.
Second window:
- In the second terminal window, type `node server.js` and the server will be up on port 3000 unless you specify otherwise in the `.env` file.
  - If you wish to use a different port, open your `.env` file and on the second line type `PORT=2000` or whichever port you choose. Then use that port in place of `3000` in the below steps.
- As you make requests to the server, the `morgan.js` module logs each request in this window.
Third window:
- To add a new game to the API, type in a POST request, filling the empty quotes with your data:
  - `http POST :3000/api/games title="" genre="" developer="" publisher="" platforms="" ratingESRB="" releaseDate=""`
  - The server will respond with a `200 OK` status and return the new item data. Note the unique ID.
  - If you get `400 Bad Request` that means you didn't fill out all the properties.
- To get an array of all the game IDs currently in the data directory, make a GET request without an ID query:
  - `http GET :3000/api/games`
  - `200 OK` -- successful request
  - `404 Not Found` -- you typed some endpoint other than specified
- To read a game that exists in the API, make a GET request with the game's unique ID:
  - *use the id from the POST request's response*
  - `http GET :3000/api/games/*id here*`
  - `200 OK` -- successful request
  - `404 Not Found` -- the game with the ID you supplied does not exist in the API's storage
- To delete a game from the API, make a DELETE request with the game's unique ID:
  - `http DELETE :3000/api/games/*id here*`
  - `204 No Content` -- the game data has been successfully removed
  - `400 Bad Request` -- you forgot to add the unique ID
  - `404 Not Found` -- the game with the ID you supplied already does not exist in the API's storage
