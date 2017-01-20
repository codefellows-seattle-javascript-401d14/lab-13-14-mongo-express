'use strict';

require('./test-env.js');

const expect = require('chai').expect;
const superagent = require('superagent');

const Trainer = require('../model/trainer.js');
const Pokemon = require('../model/pokemon.js');

require('../server.js');

const apiURL = `http://localhost:${process.env.PORT}`;

describe('Testing pokemon router', function(){
  afterEach((done) => {
    Promise.all([
      Trainer.remove({}),
      Pokemon.remove({}),
    ])
    .then(() => done())
    .catch(done);
  });

  describe('Testing POST with invalid endpoint', function(){
    it('should return a status code of 404', (done) => {
      superagent.post(`${apiURL}/api/boooyaa`)
      .send({})
      .then(done)
      .catch((err) => {
        expect(err.status).to.equal(404);
        done();
      })
      .catch(done);
    });
  });
  describe('Testing POST with bad request', function(){
    before((done) => {
      new Trainer({
        name: 'Misty',
        age: '14',
      }).save()
      .then( trainer => {
        this.tempTrainer = trainer;
        done();
      })
      .catch(done);
    });
    it('should return a status code of 400', (done) => {
      superagent.post(`${apiURL}/api/pokemons`)
      .send({
        name: 'Mewtwo',
        trainerID: this.tempTrainer._id.toString(),
      })
      .then(done)
      .catch((err) => {
        expect(err.status).to.equal(400);
        done();
      })
      .catch(done);
    });
  });
  describe('Testing POST with valid request', function(){
    before((done) => {
      new Trainer({
        name: 'Misty',
        age: '14',
      }).save()
      .then( trainer => {
        this.tempTrainer = trainer;
        done();
      })
      .catch(done);
    });
    it('should return a pokemon and status code of 200', (done) => {
      superagent.post(`${apiURL}/api/pokemons`)
      .send({
        name: 'Mewtwo',
        type: 'Psychic',
        pokedexNum: 150,
        trainerID: this.tempTrainer._id.toString(),
      })
      .then( res => {
        expect(res.status).to.equal(200);
        expect(res.body.name).to.equal('Mewtwo');
        expect(res.body.type).to.equal('Psychic');
        expect(res.body.pokedexNum).to.equal(150);
        expect(Boolean(res.body._id)).to.equal(true);
        done();
      })
      .catch(done);
    });
  });

  describe('Testing GET /api/pokemons/:id', function() {
    beforeEach((done) => {
      new Trainer({
        name: 'Gary',
        age: '13',
      }).save()
      .then(trainer => {
        this.tempTrainer = trainer;
        return new Pokemon({
          name: 'Blastoise',
          type: 'water',
          pokedexNum: 9,
          trainerID: this.tempTrainer._id.toString(),
        }).save();
      })
      .then(pokemon => {
        this.tempPokemon = pokemon;
        done();
      })
      .catch(done);
    });

    it('should respond with a pokemon and status code of 200', (done) => {
      superagent.get(`${apiURL}/api/pokemons/${this.tempPokemon._id.toString()}`)
      .then(res => {
        expect(res.status).to.equal(200);
        expect(res.body.trainerID).to.equal(this.tempTrainer._id.toString());
        expect(res.body.name).to.equal('Blastoise');
        expect(res.body.type).to.equal('water');
        expect(res.body.pokedexNum).to.equal(9);
        done();
      })
      .catch(done);
    });

    it('should respond with a status code of 404', (done) => {
      superagent.get(`${apiURL}/api/pokemons/12`)
      .then(done)
      .catch((err) => {
        expect(err.status).to.equal(404);
        done();
      })
      .catch(done);
    });

    it('should return all ids in an array and status code of 200', (done) => {
      superagent.get(`${apiURL}/api/pokemons`)
       .then(res => {
         expect(res.status).to.equal(200);
         expect(res.body).to.be.instanceof(Array);
         done();
       })
       .catch(done);
    });

  });

  describe('Testing DELETE /api/pokemons:id', function(){
    beforeEach((done) => {
      new Trainer({
        name: 'Gary',
        age: '13',
      }).save()
      .then(trainer => {
        this.tempTrainer = trainer;
        return new Pokemon({
          name: 'Blastoise',
          type: 'water',
          pokedexNum: 9,
          trainerID: this.tempTrainer._id.toString(),
        }).save();
      })
      .then(pokemon => {
        this.tempPokemon = pokemon;
        done();
      })
      .catch(done);
    });

    it('should delete a pokemon and respond with a status of 204', (done) => {
      superagent.delete(`${apiURL}/api/pokemons/${this.tempPokemon._id.toString()}`)
      .then(res => {
        expect(res.status).to.equal(204);
        done();
      })
      .catch(done);
    });

    it('should respond with a 404 status code', (done) => {
      superagent.delete(`${apiURL}/api/pokemons/23232`)
      .then(done)
      .catch((err) => {
        expect(err.status).to.equal(404);
        done();
      })
      .catch(done);
    });
  });
});
