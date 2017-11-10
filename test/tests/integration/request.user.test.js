var assert = require('assert');
var request = require('supertest');
var helpers = require('we-test-tools').helpers;
var http, we, agent;

describe('userRequest', function () {
  before(function (done) {
    http = helpers.getHttp();
    agent = request.agent(http);
    we = helpers.getWe();
    done();
  });

  describe('findAll', function () {
    it('get /user should return one user', function (done) {
      request(http)
      .get('/user')
      .set('Accept', 'application/json')
      .expect(200)
      .end(function (err, res) {
        if (err) {
          console.log(res.text);
          throw new Error(err);
        }

        assert(res.body.user);
        assert.equal(res.body.user[0].id, 1);

        done();
      });
    });
  });
});
