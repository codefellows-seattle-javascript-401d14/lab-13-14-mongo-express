401 JS --  Lab 14 second resource
===

## Submission Instructions
  * Work in a fork of this repository
  * Work in a branch on your fork
  * Write all of your code in a directory named `lab-` + `<your name>` **e.g.** `lab-duncan`
  * Submit a pull request to this repository
  * Submit a link to your pull request on canvas
  * Submit a question, observation, and how long you spent on canvas  
  
## Learning Objectives  
* Students will understand the purpose of a server side router 
* Students will be able to implement a rest API using using nodes http module

## Resources  
* [express docs](http://expressjs.com/en/4x/api.html)
* [bodyparser docs](https://github.com/expressjs/body-parser)
* [superagent docs](https://visionmedia.github.io/superagent/)
* [http errors docs](https://github.com/jshttp/http-errors)

## Requirements  
#### Configuration  
<!-- list of files, configurations, tools, ect that are required -->
Your lab directory must include  
* **README.md** -- with a documention about your lab
* **.gitignore** -- with a robust gitignore
 * **IGNORE DB DIRECTORY**
 * **IGNORE .env FILE**
* **.eslintrc** -- with the class .eslintrc file
* **.eslintignore** -- with the class .eslintignore
* **.package.json** -- with all dependencies and dev-dependencies 
* **lib/** - a directory for helper modules
* **model/** - a directory for constructor functions
* **test/** - a directory for test modules
* **db/** - a direrctory for your mongodb
* **server.js** - entry point to your program
 
#### Feature Tasks  
<!-- a list or description of the feature tasks you want the students to implement -->
* Create a mongoose model that creates a second _resource_ with at least 4 properties
 * the properties cant be same as the class lecture reource
 * one of its properties must be the ID of your previous module
 * the resource must have a many to one relationship with your model from yesterday (its the many)
 * use `schema.pre('save', (next)  => {})` to write validation that the ID for your previous model exits
* Add a propertie to your previous model that will conatin an array of your new models IDs
 * use 'ref' to make the array aware of which model the ID's are referencing
 * every time you create your new model push its ID into the IDarray on your old model
* Create the `require('bodyparser').json()` module on `POST` and `PUT` requests
* Create a router for doing `CREATE`, `READ`, and `DELETE` operations on your _resource_
  
**dont name your endpoints `/api/resources` name them after your model ie. `/api/note`**  
  
###### `POST` `/api/<resources>` 
* pass data as stringifed json in the body of a post request to create a resource
* if their was no _resource_ with that id it should respond with a 404
 
###### `GET` `/api/<resources>/:id` 
* if their was no _resource_ with that id it should respond with a 404
 
###### `DELETE` `/api/<resources>/:id` 
* on success it should return 204 status with no content in the body
* if their was no _resource_ with that id it should respond with a 404
 
## Testing  
* write a test to ensure that your api returns a status code of 404 for routes that have not been registered
* write tests to ensure your `/api/resource-name` endpoint responds as described for each condition below:
 * `GET` - test 404, responds with 'not found' for valid request made with an id that was not found
 * `GET` - test 200, response body like `{<data>}` for a request made with a valid id 
 * `DELETE` - test 404, responds with 'not found' for valid request made with an id that was not found
 * `DELETE` - test 200, response body like `{<data>}` for a request made with a valid id 
 * `POST` - test 400, responds with 'bad request' for if no `body provided` or `invalid body`
 * `POST` - test 200, response body like  `{<data>}` for a post request with a valid body
 
##  Documentation  
<!-- a description of what you want the student to write about in their readme --> 
* Write a description of your project in your readme
* Write api documetnion for your routes in your readme

## Bonus
* **2pts** a `GET` request to `/api/simple-resource-name`  should retrun an array of all of the resources
 
## Rubric  
* 2ps Configuration
* 3pts Feature Tasks
* 3pts Tests
* 2pts Documentation
