const supertest = require("supertest");
const should = require("should");
const app = require('../server');
const server = supertest.agent(app);

describe('mimeTypesIcons', () => {

  describe('type found "image.png"', () => {
    it('it should return status code 301', (done) => {
      server
      .get('/image.png')
      .expect(301)
      .end((err, res) => {
        res.status.should.equal(301);
        done();
      });
    });
  });

  describe('type and icon size found "image.gif?size=96"', () => {
    it('it should return status code 301', (done) => {
      server
      .get('/image.gif?size=96')
      .expect(301)
      .end((err, res) => {
        res.status.should.equal(301);
        done();
      });
    });
  });

  describe('type found and icon size not found "image.jpg?size=12"', () => {
    it('it should return status code 302', (done) => {
      server
      .get('/image.jpg?size=12')
      .expect(302)
      .end((err, res) => {
        res.status.should.equal(302);
        done();
      });
    });
  });

  describe('type not found "file.x"', () => {
    it('it should return status code 302', (done) => {
      server
      .get('/file.x')
      .expect(302)
      .end((err, res) => {
        res.status.should.equal(302);
        done();
      });
    });
  });

  describe('type not found and icon size found "file.x?size=16"', () => {
    it('it should return status code 302', (done) => {
      server
      .get('/file.x?size=16')
      .expect(302)
      .end((err, res) => {
        res.status.should.equal(302);
        done();
      });
    });
  });

  describe('type and icon not found "file.x?size=12"', () => {
    it('it should return status code 302', (done) => {
      server
      .get('/file.x?size=12')
      .expect(302)
      .end((err, res) => {
        res.status.should.equal(302);
        done();
      });
    });
  });

});