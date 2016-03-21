'use strict';

var fs = require('fs');
var mongoose = require('mongoose');
var express = require('express');
var bodyParser = require('body-parser');
var config = require(__dirname + '/config/env');
var app = express();
var models = require(__dirname + '/models');
var User = models.User;
var File = models.File;

var userRouter = express.Router();
var fileRouter = express.Router();
userRouter.use((req, res, next) => {
  console.log('received request');
  next();
})
fileRouter.use((req, res, next) => {
  console.log('received request');
  next();
})
require(__dirname + '/routes/user_routes.js')(userRouter);
require(__dirname + '/routes/file_routes.js')(fileRouter);

app.use(bodyParser.json());
app.use('/users', userRouter);
app.use('/files', fileRouter);

console.log(config);
app.listen(config.PORT, () => {
  console.log(`server started on port ${config.PORT}`);
})
