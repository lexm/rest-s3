'use strict';

var fs = require('fs');
var mongoose = require('mongoose');
var express = require('express');
var app = express();

var userRouter = express.Router();
var fileRouter = express.Router()
require(__dirname + '/routes/user_routes.js')(userRouter);
require(__dirname + '/routes/file_routes.js')(fileRouter);

app.lister(config.PORT, () => {
  console.log(`server started on port ${config.PORT}`);
})
