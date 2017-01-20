Lab-13 & 14 Express with MongoDB
===
Server-side routing for two resources

## Description
A REST API for games by device on an HTTP server that users can make POST, GET, PUT, and DELETE requests to with appropriate routes and responses. This lab differs from Lab-11 & 12 in that MongoDB, with the use of Mongoose.js as the ORM, handles model construction, data storage in a database, and CRUD database manipulation methods.
#### Modules
- **server.js** -- starts the server and creates an instance of a router for the games API
- **device.js** -- item constructor that assigns a unique id to each device and takes user input data for:
  - family (device family such as computer or console) *required for POST*
  - platform (more specific such as Windows or Xbox 360) *required for POST*
- **game.js** -- item constructor that assigns a unique id to each game and takes user input data for:
  - title *required for POST*
  - genre *required for POST*
  - developer *required for POST*
  - deviceID *required for POST*
  - publisher
  - ESRB rating
  - release date
- **device-router.js** -- creates routes for doing CRUD operations on device items
- **game-router.js** -- creates routes for doing CRUD operation on game items

## Usage
Before adding game informtion
You will need three separate terminal windows for this simulation.

##### First window
- Create a file in the directory for your environment variables by typing `atom .env`, or whichever text-editor you use in place of atom, and on the first line type `MONGODB_URI=mongodb://localhost/dev`, then save the file.
- You must initiate MongoDB for your session. In one of the terminal windows, type `mongod --dbpath ./db` to indicate the database folder.

##### Second window
- In the second terminal window, type `node server.js` and the server will be up on port 3000 unless you specify otherwise in the `.env` file.
  - If you wish to use a different port, open your `.env` file and on the second line type `PORT=2000` or whichever port you choose. Then use that port in place of `3000` in the below steps.
- As you make requests to the server, the `morgan.js` module logs each request in this window.

##### Third window
Before adding game info, you must add the device family and platform the game operates on.
- To add a new device to the API, type in a POST request, filling the empty quotes with appropriate info:
  - `http POST :3000/api/devices family="" platform=""`
  - The server will respond with a `200 OK` status and return the device info, an empty array that will hold data on individual games, and a `_id` property that you will use when you add game data in the next step.

Now that you have a device resource, copy the `_id` property into `deviceID` in this next step.
- To add a new game to the API, type in a POST request, filling the empty quotes with your data:
  - `http POST :3000/api/games title="" genre="" developer="" deviceID=""`, you can also add info for publisher, ratingESRB, and releaseDate.
  - The server will respond with a `200 OK` status and return the new item data. Note the unique ID.
  - If you get `400 Bad Request` that means you didn't fill out all the properties.
- To get an array of all the game IDs currently in the data directory, make a GET request without an ID query:
  - `http GET :3000/api/games`
  - `200 OK` -- successful request
  - `404 Not Found` -- you typed some endpoint other than specified
- To read a game that exists in the API, make a GET request with the game's unique ID:
  - *use the id from the POST response*
  - `http GET :3000/api/games/*id here*`
  - `200 OK` -- successful request
  - `404 Not Found` -- the game with the ID you supplied does not exist in the API's storage
- To delete a game from the API, make a DELETE request with the game's unique ID:
  - `http DELETE :3000/api/games/*id here*`
  - `204 No Content` -- the game data has been successfully removed
  - `400 Bad Request` -- you forgot to add the unique ID
  - `404 Not Found` -- the game with the ID you supplied already does not exist in the API's storage

You can also perform the same GET and DELETE operations on the `/api/devices` endpoint, for example:
- `http GET :3000/api/devices` will respond with an array of all devices and all the games on each device.
