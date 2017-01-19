## Description
Lab13/14 Node REST API using HTTP module and file system storage
Implement a rest API and use persistent data
A rest API to search through relevant data for ridiculous things that announcers say mid game
We use this lab to use Express/Mongoose/Mongodb in order to construct our router and parse the body for requests
## Modules
- *server.js  starts the server and creates an instance of a router for the games API
- *comment.js -- item constructor that assigns a unique id to each game and takes user input data for:
  - Announcer  required for POST*
  - Comment  required for POST*
  - Considering adding date or at least year the announcer said what
  *parse-my-body.js parses json body of requests\
  *router.js manages request states
  *storage.js manages stored data by categories and includes CRUD operations(can I put crud, standard terminology right?)

## Usage
- On the command line, type `node server.js` and the server will be up on port 3000
- To add a new game to the API, type in a POST request, filling the empty quotes with your data:
  - `http POST :3000/api/games announcer=<name> comment=<comment>`
  - The server will respond with a `200 OK` status and return the new item data.
  - `400 Bad Request` that means need to fill out all properties
  - `200` -- success
  - `404 Not Found` -- the id doesnt exist
- To DELETE request with the comments unique id:
  - `http DELETE ::3000/api/comments?id=id`
  - `204 No Content` -- removal
  - `400 Bad Request`
  - `404 Not Found` -- does not exist
