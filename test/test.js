var supertest = require("supertest");
var should = require("should");
var app = require('../server');
var server = supertest.agent(app);

describe('mimeTypesIcons', function() {

  describe('type found "image.png"', function() {
    it('it should return status code 301', function(done) {
      server
      .get('/image.png')
      .expect(301)
      .end(function(err, res) {
        res.status.should.equal(301);
        done();
      });
    });
  });

  describe('type and icon size found "image.gif?size=96"', function() {
    it('it should return status code 301', function(done) {
      server
      .get('/image.gif?size=96')
      .expect(301)
      .end(function(err, res) {
        res.status.should.equal(301);
        done();
      });
    });
  });

  describe('type found and icon size not found "image.jpg?size=12"', function() {
    it('it should return status code 302', function(done) {
      server
      .get('/image.jpg?size=12')
      .expect(302)
      .end(function(err, res) {
        res.status.should.equal(302);
        done();
      });
    });
  });

  describe('type not found "file.x"', function() {
    it('it should return status code 302', function(done) {
      server
      .get('/file.x')
      .expect(302)
      .end(function(err, res) {
        res.status.should.equal(302);
        done();
      });
    });
  });

  describe('type not found and icon size found "file.x?size=16"', function() {
    it('it should return status code 302', function(done) {
      server
      .get('/file.x?size=16')
      .expect(302)
      .end(function(err, res) {
        res.status.should.equal(302);
        done();
      });
    });
  });

  describe('type and icon not found "file.x?size=12"', function() {
    it('it should return status code 302', function(done) {
      server
      .get('/file.x?size=12')
      .expect(302)
      .end(function(err, res) {
        res.status.should.equal(302);
        done();
      });
    });
  });

});