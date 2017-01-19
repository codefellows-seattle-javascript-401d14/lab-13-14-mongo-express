## Description
Lab13/14 Node REST API using HTTP module and file system storage
Implement a rest API and use persistent data
A rest API to search through relevant data for ridiculous things that announcers say mid game
We use this lab to use Express/Mongoose/Mongodb in order to construct our router and parse the body for requests
Added as second model to use as a child of our parent. Sport is the parent.

## Usage
- On the command line, type `node server.js` and the server will be up on port 3000
- To add a new Sport to the API, type in a POST request, filling the empty quotes with your data:
  - `http /api/post announcer=<name> comment=<comment>`
  - The server will respond with a `200 OK` status and return the new item data.
  - `400 Bad Request` that means need to fill out all properties
  - `200` -- success
  - `404 Not Found` -- the id doesnt exist
- To DELETE request with the comments unique id:
  - `http DELETE ::3000/api/comments?id=id`
  - `204 No Content` -- removal
  - `400 Bad Request`
  - `404 Not Found` -- does not exist


  ## Modules
  - *server.js  starts the server and creates an instance of a router for the sport API
  - *sport.js -- item constructor that assigns a unique id to each sport and takes user input data for:

    - Sport  required for POST*
    - network  required for POST*
    -announcer required for POST*
    -comments required for POST*
  - *comment.js -- item constructor that assigns a unique id to each comment and takes user input data for:
    -comment required for POST*
    -year required for POST*
    -team required for POST*
    *comment-router.js routes
    *sport-router.js manages request states

  ## Testing
  To run the tests use npm install once all is installed type mocha into your terminal command line.
