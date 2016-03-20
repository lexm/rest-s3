'use strict';

var fs = require('fs');
var mongoose = require('mongoose');
var express = require('express');
var config = require(__dirname + '/config/env');
var app = express();

// var Router = express.Router();
// require(__dirname + '/routes/user_routes.js')(Router);
// require(__dirname + '/routes/file_routes.js')(Router);
// Router.use((req, res, next) => {
//   console.log('received request');
//   next();
// })

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

app.use('/users', userRouter);
app.use('/files', fileRouter);

console.log(config);
app.listen(config.PORT, () => {
  console.log(`server started on port ${config.PORT}`);
})
