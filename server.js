'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var config = require(__dirname + '/config/env');
var app = express();

var AWS = require('aws-sdk');
AWS.config.update({region: config.AWSRegion});
var s3 = new AWS.S3();

var userRouter = express.Router();
var fileRouter = express.Router();
userRouter.use((req, res, next) => {
  next();
});

fileRouter.use((req, res, next) => {
  next();
});

require(__dirname + '/routes/user_routes.js')(userRouter, s3, config);
require(__dirname + '/routes/file_routes.js')(fileRouter, s3, config);

app.use(bodyParser.json());
app.use('/users', userRouter);
app.use('/files', fileRouter);

console.log(config);
app.listen(config.PORT, () => {
  console.log(`server started on port ${config.PORT}`);
});
