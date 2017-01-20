'use strict';

require('./mock-env.js');
const expect = require('chai').expect;
const superagent = require('superagent');
const Device = require('../model/device.js');
const Game = require('../model/game.js');

require('../server.js');

const baseURL = `http://localhost:${process.env.PORT}`;

describe('testing game router', function() {
  afterEach(done => {
    Promise.all([
      Device.remove({}),
      Game.remove({}),
    ])
    .then(() => done())
    .catch(done);
  });

  describe('testing POST /api/games', function() {
    beforeEach(done => {
      new Device({
        family: 'console',
        platform: 'PS4',
      }).save()
      .then(device => {
        this.tempDevice = device;
        done();
      })
      .catch(done);
    });
    it('should respond with a game', done => {
      superagent.post(`${baseURL}/api/games`)
      .send({
        title: 'Star Wars: Battlefront',
        genre: 'action',
        developer: 'EA Digital Illusions CE AB',
        deviceID: this.tempDevice._id.toString(),
      })
      .then(res => {
        expect(res.status).to.equal(200);
        expect(res.body.title).to.equal('Star Wars: Battlefront');
        expect(res.body.genre).to.equal('action');
        expect(res.body.developer).to.equal('EA Digital Illusions CE AB');
        done();
      })
      .catch(done);
    });
    it('should respond status 400 bad request', done => {
      superagent.post(`${baseURL}/api/games`)
      .send({
        title: 'Half-life 3',
        deviceID: this.tempDevice._id.toString(),
      })
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
      new Device({
        family: 'console',
        platform: 'PS4',
      }).save()
      .then(device => {
        this.tempDevice = device;
        return new Game({
          title: 'Star Wars: Battlefront',
          genre: 'action',
          developer: 'EA Digital Illusions CE AB',
          deviceID: this.tempDevice._id.toString(),
        }).save();
      })
      .then(game => {
        this.tempGame = game;
        done();
      })
      .catch(done);
    });
    it('should respond with a game', done => {
      superagent.get(`${baseURL}/api/games/${this.tempGame._id}`)
      .then(res => {
        expect(res.status).to.equal(200);
        expect(res.body.title).to.equal('Star Wars: Battlefront');
        expect(res.body.genre).to.equal('action');
        expect(res.body.developer).to.equal('EA Digital Illusions CE AB');
        done();
      })
      .catch(done);
    });
    it('should respond with a 404 because bad id', done => {
      superagent.get(`${baseURL}/api/games/42`)
      .then(done)
      .catch(err => {
        expect(err.status).to.equal(404);
        done();
      })
      .catch(done);
    });
  });

  describe('testing GET /api/games', function() {
    beforeEach(done => {
      new Device({
        family: 'console',
        platform: 'PS4',
      }).save()
      .then(device => {
        this.tempDevice = device;
        return new Game({
          title: 'Star Wars: Battlefront',
          genre: 'action',
          developer: 'EA Digital Illusions CE AB',
          deviceID: this.tempDevice._id.toString(),
        }).save();
      })
      .then(game => {
        this.tempGame = game;
        done();
      })
      .catch(done);
    });
    it('should return all the games', done => {
      superagent.get(`${baseURL}/api/games`)
      .then(res => {
        expect(res.status).to.equal(200);
        expect(res.body).to.be.instanceof(Array);
        done();
      })
      .catch(done);
    });
    it('bad endpoint should return 404', done => {
      superagent.get(`${baseURL}/api/allthegames`)
      .then(done)
      .catch(err => {
        expect(err.status).to.equal(404);
        done();
      })
      .catch(done);
    });
  });

  describe('testing DELETE /api/games/:id', function() {
    beforeEach(done => {
      new Device({
        family: 'console',
        platform: 'PS4',
      }).save()
      .then(device => {
        this.tempDevice = device;
        return new Game({
          title: 'Star Wars: Battlefront',
          genre: 'action',
          developer: 'EA Digital Illusions CE AB',
          deviceID: this.tempDevice._id.toString(),
        }).save();
      })
      .then(game => {
        this.tempGame = game;
        done();
      })
      .catch(done);
    });
    it('should remove a game with status 204', done => {
      superagent.delete(`${baseURL}/api/games/${this.tempGame._id}`)
      .then(res => {
        expect(res.status).to.equal(204);
        done();
      })
      .catch(done);
    });
    it('should return status 404', done => {
      superagent.delete(`${baseURL}/api/games/42`)
      .then(done)
      .catch(err => {
        expect(err.status).to.equal(404);
        done();
      })
      .catch(done);
    });
  });
});
