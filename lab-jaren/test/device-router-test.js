'use strict';

require('./mock-env.js');

const expect = require('chai').expect;
const superagent = require('superagent');

const Device = require('../model/device.js');

require('../server.js');

const baseURL = `http://localhost:${process.env.PORT}`;

describe('testing device router', function() {
  let mockData = {
    family: 'console',
    platform: 'PS4',
  };
  afterEach(done => {
    Device.remove({})
    .then(() => done())
    .catch(done);
  });

  describe('testing POST /api/devices', function() {
    it('should respond with a device', done => {
      superagent.post(`${baseURL}/api/devices`)
      .send(mockData)
      .then(res => {
        expect(res.status).to.equal(200);
        expect(res.body.family).to.equal('console');
        expect(res.body.platform).to.equal('PS4');
        done();
      })
      .catch(done);
    });
    it('should respond with status 400 bad request', done => {
      superagent.post(`${baseURL}/api/devices`)
      .send({})
      .then(done)
      .catch(err => {
        expect(err.status).to.equal(400);
        done();
      })
      .catch(done);
    });
  });

  describe('testing GET /api/devices/:id', function() {
    beforeEach(done => {
      new Device(mockData).save()
      .then(device => {
        this.tempDevice = device;
        done();
      })
      .catch(done);
    });
    it('should respond with a device', done => {
      superagent.get(`${baseURL}/api/devices/${this.tempDevice._id}`)
      .then(res => {
        expect(res.status).to.equal(200);
        expect(res.body.family).to.equal('console');
        expect(res.body.platform).to.equal('PS4');
        done();
      })
      .catch(done);
    });
    it('should respond with a 404 because bad id', done => {
      superagent.get(`${baseURL}/api/devices/42`)
      .then(done)
      .catch(err => {
        expect(err.status).to.equal(404);
        done();
      })
      .catch(done);
    });
  });

  describe('testing GET /api/devices', function() {
    before(done => {
      new Device(mockData).save()
      .then(device => {
        this.tempDevice = device;
        done();
      })
      .catch(done);
    });
    it('should respond with all the devices', done => {
      superagent.get(`${baseURL}/api/devices`)
      .then(res => {
        expect(res.status).to.equal(200);
        expect(res.body).to.be.instanceof(Array);
        expect(res.body[0]._id).to.equal(this.tempDevice._id.toString());
        done();
      })
      .catch(done);
    });
    it('bad endpoint should respond with 404', done => {
      superagent.get(`${baseURL}/api/allthedevices`)
      .then(done)
      .catch(err => {
        expect(err.status).to.equal(404);
        done();
      })
      .catch(done);
    });
  });

  describe('testing DELETE /api/devices/:id', function() {
    before(done => {
      new Device(mockData).save()
      .then(device => {
        this.tempDevice = device;
        done();
      })
      .catch(done);
    });
    it('should remove a device with status 204', done => {
      superagent.delete(`${baseURL}/api/devices/${this.tempDevice._id}`)
      .then(res => {
        expect(res.status).to.equal(204);
        done();
      })
      .catch(done);
    });
    it('should respond with status 404', done => {
      superagent.delete(`${baseURL}/api/devices/42`)
      .then(done)
      .catch(err => {
        expect(err.status).to.equal(404);
        done();
      })
      .catch(done);
    });
  });
});
