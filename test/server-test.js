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

// describe()
