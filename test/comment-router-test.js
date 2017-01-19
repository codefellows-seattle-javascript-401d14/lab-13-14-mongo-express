'use strict';

require('./mock-env.js');
const superagent = require('superagent');
const expect = require('chai').expect;

//get our model comstructors
const Sport = require('../model/sport.js');
const Comment = require('../model/comment.js');


const baseURL = `http://localhost:${process.env.PORT}`;
//start server
require('../server.js');
describe('testing comment router', function(){
  afterEach((done) => {
    Promise.all([
      Sport.remove({}),
      Comment.remove({}),
    ])
    .then(() => done())
    .catch(done);
  });

  describe('testing POST /api/comments', function(){
    //before we make a note we need to mock a list
    beforeEach((done) => {
      new Sport({sport: ' c[○┬●]כ ', network: '⨌⨀_⨀⨌', announcer: '<|º감º|>'  }).save()
      .then(sport => {
        this.tempSport = sport;
        done();
      })
      .catch(done);
    });

    it('should respond with a comment', (done) => {
      superagent.post(`${baseURL}/api/comments`)
      .send({
        comment: '|[●▪▪●]|',
        year: '(♥_♥)',
        team: '☃',
        sportID: this.tempSport._id.toString(),
      })
      .then(res => {
        expect(res.status).to.equal(200);
        expect(res.body.comment).to.equal('|[●▪▪●]|');
        expect(res.body.year).to.equal('(♥_♥)');
        expect(res.body.team).to.equal('☃');
        expect(Boolean(res.body._id)).to.equal(true);
        done();
      })
      .catch(done);
    });

    it('should respond with a 400', (done) => {
      superagent.post(`${baseURL}/api/comments`)
      .send({})
      .then(done)
      .catch(res => {
        expect(res.status).to.equal(400);
        done();
      })
      .catch(done);
    });
  });

  describe('testing GET /api/comments:id', function(){
    beforeEach((done) => {
      new Sport({sport: ' c[○┬●]כ ', network: '⨌⨀_⨀⨌', announcer: '<|º감º|>'  }).save()
      .then(sport => {
        this.tempSport = sport;
        return new Comment({
          comment: '|[●▪▪●]|',
          year: '(♥_♥)',
          team: '☃',
          sportID: this.tempSport._id.toString(),
        }).save();
      })
      .then(comment => {
        this.tempComment = comment;
        done();
      })
      .catch(done);
    });
    it('should return 404 status', (done) => {
      superagent.delete(`${baseURL}/api/comments/54321`)
      .then(done)
      .catch(err => {
        expect(err.status).to.equal(404);
        done();
      })
      .catch(done);

      it('should respond with a comment', (done) => {
        superagent.get(`${baseURL}/api/comments/${this.tempComment._id.toString()}`)
      .then(res => {
        expect(res.status).to.equal(200);
        expect(res.body.comment).to.equal('|[●▪▪●]|');
        expect(res.body.year).to.equal('(♥_♥)');
        expect(res.body.team).to.equal('☃');
        expect(res.body.sportID).to.equal(this.tempSport._id.toString());
        expect(Boolean(res.body._id)).to.equal(true);
        done();
      })
      .catch(done);
      });
    });
  });

  describe('testing DELETE /api/comments', function(){
    beforeEach(done => {
      new Sport({sport: ' c[○┬●]כ ', network: '⨌⨀_⨀⨌', announcer: '<|º감º|>'  }).save()
    .then(sport => {
      this.tempSport = sport;
      return new Comment({
        comment: '|[●▪▪●]|',
        year: '(♥_♥)',
        team: '☃',
        sportID: this.tempSport._id.toString(),
      }).save();
    })
    .then(comment => {
      this.tempComment = comment;
      done();
    })
    .catch(done);
    });

    it('should delete a comment', (done) => {
      superagent.delete(`${baseURL}/api/comments/${this.tempComment._id}`)
    .then(res => {
      expect(res.status).to.equal(204);
      done();
    })
    .catch(done);
    });

    it('should return 404 status', (done) => {
      superagent.delete(`${baseURL}/api/comments/54321`)
    .then(done)
    .catch(err => {
      expect(err.status).to.equal(404);
      done();
    })
    .catch(done);
    });
  });
});
