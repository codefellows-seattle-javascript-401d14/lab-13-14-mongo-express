'use strict';

require('./mock-env.js');
const expect = require('chai').expect;
const superagent = require('superagent');

const Brewery = require('../model/brewery.js');
const Beer = require('../model/beer.js');
const baseURL = `http://localhost:${process.env.PORT}`;
require('../server.js');

describe('testing beer router', function() {
  afterEach((done) => {
    Promise.all([
      Brewery.remove({}),
      Beer.remove({}),
    ])
    .then(() => done())
    .catch(done);
  });

  describe('testing POST /api/beers', function() {
    beforeEach((done) => {
      new Brewery({nameOfBrewery: 'Sierra Nevada'}).save()
      .then(brewery => {
        this.tempbrewery = brewery;
        done();
      })
      .catch(done);
    });

    it('should respond with a beer', (done) => {
      superagent.post(`${baseURL}/api/beers`)
      .send({
        nameOfBeer: 'Humble Mumble IPA',
        typeOfBeer:'IPA',
        percentOfBeer: 7.4,
        breweryID: this.tempbrewery._id.toString(),
      })
      .then(res => {
        expect(res.status).to.equal(200);
        expect(res.body.nameOfBeer).to.equal('Humble Mumble IPA');
        expect(res.body.typeOfBeer).to.equal('IPA');
        expect(res.body.percentOfBeer).to.equal(7.4);
        expect(Boolean(res.body.created)).to.equal(true);
        done();
      })
      .catch(done);
    });
    it('should respnd with a 400', (done) => {
      superagent.post(`${baseURL}/api/beers`)
      .send({})
      .then(done)
      .catch(res => {
        expect(res.status).to.equal(400);
        done();
      })
      .catch(done);
    });
    it('should respnd with a beer', (done) => {
      superagent.post(`${baseURL}/api/beers`)
      .send({
        nameOfBeer: {type: String, required: true},
        typeOfBeer:{type: String, required: true},
        percentOfBeer: {type: Number, required: true},
      })
      .then(done)
      .catch(res => {
        expect(res.status).to.equal(400);
        done();
      })
      .catch(done);
    });
  });

  describe('testing GET /api/beers/:id', function() {
    beforeEach((done) => {
      new Brewery({nameOfBrewery: 'random'}).save()
      .then(brewery => {
        this.tempbrewery = brewery;
        return new Beer({
          nameOfBeer: 'whatever',
          typeOfBeer: 'stout',
          percentOfBeer: 8.9,
          breweryID: this.tempbrewery._id.toString(),
        }).save()
        .then(beer => {
          this.tempbeer = beer;
          done();
        })
        .catch(done);
      });
      it('should rspond with a beer', (done) => {
        superagent.get(`${baseURL}/api/beers/${this.tempbeer._id.toString()}`)
        .then(res => {
          expect(res.status).to.equal(200);
          expect(res.body.breweryID).to.equal(this.tempbrewery._id.toString());
          expect(res.body.nameOfBeer).to.equal('whatever');
          expect(res.body.typeOfBeer).to.equal('stout');
          expect(res.body.percentOfBeer).to.equal(8.9);
          done();
        })
        .catch(done);
      });
      it('should return a 404 error on an invalid id', (done) => {
        superagent.get(`${baseURL}/api/beers/3456`)
        .then(done)
        .catch(err => {
          expect(err.status).to.equal(404);
          done();
        })
        .catch(done);
      });
    });

    describe('testing DELETE /api/beers/:id', function() {
      beforeEach(done => {
        new Brewery({nameOfBrewery: 'random'}).save()
        .then(brewery => {
          this.tempbrewery = brewery;
          new Beer({
            nameOfBeer: 'whatever',
            typeOfBeer: 'stout',
            percentOfBeer: 8.9,
            breweryID: this.tempbrewery._id.toString(),
          }).save()
          .then(beer => {
            this.tempbeer = beer;
            done();
          })
          .catch(done);
        });
        it('should give a 204 status with a valid id', (done) => {
          superagent.delete(`${baseURL}/api/beers/${this.tempbeer._id}`)
          .then(res => {
            expect(res.status).to.equal(204);
            done();
          })
          .catch(done);
        });
        it('should give a 404 status with an invaild id', (done) => {
          superagent.delete(`${baseURL}/api/beer/34566`)
          .then(done)
          .catch(err => {
            expect(err.status).to.equal(404);
            done();
          })
          .catch(done);
        });
      });

//BOUNS
      describe('test GET /api/beers', function() {
        beforeEach(done => {
          new Brewery({nameOfBrewery: 'random'}).save()
          .then(brewery => {
            this.tempbrewery = brewery;
            new Beer({
              nameOfBeer: 'whatever',
              typeOfBeer: 'stout',
              percentOfBeer: 8.9,
              breweryID: this.tempbrewery._id.toString(),
            }).save()
            .then(beer => {
              this.tempbeer = beer;
              done();
            })
            .catch(done);
          });

          it('should return all beers', (done) => {
            superagent.get(`${baseURL}/api/beers`)
            .then(res => {
              expect(res.status).to.equal(200);
              expect(res.body).to.be.instanceof(Array);
              done();
            })
            .catch(done);
          });
          it('on bad id should return 404 error', (done) => {
            superagent.get(`${baseURL}/api/brews`)
            .then(done)
            .catch(err => {
              expect(err.status).to.equal(404);
              done();
            })
            .catch(done);
          });
        });
      });
    });
  });
});
