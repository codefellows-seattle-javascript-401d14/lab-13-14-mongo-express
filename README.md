401 JS --  Lab 13 express with mongo
===


## Resources  
* [express docs](http://expressjs.com/en/4x/api.html)
* [bodyparser docs](https://github.com/expressjs/body-parser)
* [superagent docs](https://visionmedia.github.io/superagent/)
* [http errors docs](https://github.com/jshttp/http-errors)


##  Documentation  
* This project builds an http server and utilizes express, mongo and mongoose as a server, a database and an ORM. This REST API allows users to make http requests with data about Trainers. There is also a second resource that was added of Pokemon that is the child of Trainers.

## Usage
* Open terminal and type command `node server.js`

* You will now be able to make requests using CRUD operations.

###HTTP requests for Trainers
* POST: `http POST :4000/api/trainers name="" age= `
  if successful, will return with `200` status code, otherwise `400` for bad request, or `404` for not found

* GET:  `http GET :4000/api/trainers/:id `
  if successful, will return with `200` status code, otherwise `400` for bad request, or `404` for not found

* DELETE:  `http DELETE :4000/api/trainers/:id `
  if successful, will return with `200` status code, otherwise `400` for bad request, or `404` for not found


###HTTP requests for Pokemon
* POST: `http POST :4000/api/pokemons name="" type="" pokedexNum="" `
  if successful, will return with `200` status code, otherwise `400` for bad request, or `404` for not found

* GET:  `http GET :4000/api/pokemons/:id `
  if successful, will return with `200` status code, otherwise `400` for bad request, or `404` for not found

* DELETE:  `http DELETE :4000/api/pokemons/:id `
  if successful, will return with `200` status code, otherwise `400` for bad request, or `404` for not found
