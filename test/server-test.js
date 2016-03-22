'use strict';

process.env.MONGO_URI = 'mongodb://localhost/db_test';
var mongoose = require('mongoose');
var chai = require('chai');
var chaiHttp = require('chai-http');
chai.use(chaiHttp);

var request = chai.request;
var expect = chai.expect;

var models = require(__dirname + '/../models');
var User = models.User;
var File = models.File;

require(__dirname + '/../server');

var newUser = 'sally';

describe('testing user API', function(){
  // it('should be able to add a new user', function(done) {
  //   request('localhost:3000')
  //   .post('/users')
  //   .send({name: newUser, files: []})
  //   .end(function(err, res) {
  //     expect(err).to.eql(null);
  //     expect(res.text).to.eql('Welcome ' + newUser);
  //     done();
  //   })
  // });
  it('should be able to list new user', function(done) {
    request('localhost:3000')
    .get('/users/' + newUser)
    .end(function(err, res) {
      expect(err).to.eql(null);
      expect(res.body.length).to.not.eql(0);
      expect(res.body[0].name).to.eql(newUser);
      expect(res.body[0].files).to.eql([]);
      expect(res.body[0]._id).to.not.be.null;
      done();
    });
  });
  it('should be able to post a file for new user', function(done) {
    request('localhost:3000')
    .post('/users/' + newUser + '/files')
    .send({'fileName': 'thisFile.txt', 'content': 'here\'s some content'})
    .end(function(err, res) {
      expect(err).to.eql(null);
      expect(res.text).to.eql('file thisFile.txt added for user ' + newUser);
      done();
    });
  });
  it('should be able to list files owned by user', function(done) {
    done();
  });
});
