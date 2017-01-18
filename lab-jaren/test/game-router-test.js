'use strict';

require('./mock-env.js');

const expect = require('chai').expect;
const superagent = require('superagent');

const Game = require('../model/game.js');

require('../server.js');

const baseURL = `http://localhost:${process.env.PORT}`;

describe('testing game router', function() {
  let mockData = {
    title: 'Mario Kart: Double Dash!!',
    genre: 'racing/driving',
    developer: 'Nintendo EAD',
    publisher: 'Nintendo of America Inc.',
    platforms: 'GameCube',
    ratingESRB: 'Everyone',
    releaseDate: 'Nov 17, 2003',
  };
  afterEach(done => {
    Game.remove({})
    .then(() => done())
    .catch(done);
  });

  describe('testing POST /api/games', function() {
    it('should return a list', done => {
      superagent.post(`${baseURL}/api/games`)
      .send(mockData)
      .then(res => {
        expect(res.status).to.equal(200);
        expect(res.body.title).to.equal('Mario Kart: Double Dash!!');
        expect(res.body.genre).to.equal('racing/driving');
        expect(res.body.developer).to.equal('Nintendo EAD');
        expect(res.body.publisher).to.equal('Nintendo of America Inc.');
        expect(res.body.platforms).to.equal('GameCube');
        expect(res.body.ratingESRB).to.equal('Everyone');
        expect(res.body.releaseDate).to.equal('Nov 17, 2003');
        done();
      })
      .catch(done);
    });
    it('should return a 400 status', done => {
      superagent.post(`${baseURL}/api/games`)
      .send({})
      .then(done)
      .catch(err => {
        expect(err.status).to.equal(400);
        done();
      })
      .catch(done);
    });
  });

  describe('testing GET /api/games/:id', function() {
    beforeEach(done => {
      new Game(mockData).save()
      .then(game => {
        this.tempGame = game;
        done();
      })
      .catch(done);
    });
    it('should return a game', done => {
      superagent.get(`${baseURL}/api/games/${this.tempGame._id}`)
      .then(res => {
        expect(res.status).to.equal(200);
        expect(res.body.title).to.equal('Mario Kart: Double Dash!!');
        expect(res.body.genre).to.equal('racing/driving');
        expect(res.body.developer).to.equal('Nintendo EAD');
        expect(res.body.publisher).to.equal('Nintendo of America Inc.');
        expect(res.body.platforms).to.equal('GameCube');
        expect(res.body.ratingESRB).to.equal('Everyone');
        expect(res.body.releaseDate).to.equal('Nov 17, 2003');

        done();
      })
      .catch(done);
    });
    it('should return a 404 because bad id', done => {
      superagent.get(`${baseURL}/api/games/42`)
      .then(done)
      .catch(err => {
        expect(err.status).to.equal(404);
        done();
      })
      .catch(done);
    });
  });
});
