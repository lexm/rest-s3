'use strict';

var models = require(__dirname + '/../models');
// var config = require(__dirname + '/../config/env');
var User = models.User;

module.exports = (Router, S3, config) => {
  Router.route('/')
  .post((req, res, next) => {
    User.find({name: req.body.name}, (err, users) => {
      if (users.length) {
        res.write(users[0].name + ' already added');
        res.end()
      } else {
        var newUser = new User(req.body);
        newUser.save((err, user, next) => {
          res.write('Welcome ' + user.name);
          res.end();
        });
        var params = {Bucket: config.bucketName, Key: req.body.name + '/', Body: 'this is something'};
        S3.upload(params, (err, data) => {
          if(err) {
            console.log('error creating folder for ' + req.body.name);
            console.log(err);
          } else {
            console.log('successfully created folder for ' + req.body.name);
          }
        })
      }
    });
  })
  .get((req, res, next) => {
    User.find({}, (err, users) => {
      res.json({data: users});
      next();
    });
    console.log('received GET request');
  })

  Router.route('/:user')
  .get((req, res, next) => {
    User.find({name: req.params.user}, (err, namedUser) => {
      res.json(namedUser);
    });
  })
  .put((req, res, next) => {
    User.findOneAndUpdate({name: req.params.user}, {$set: req.body}, (err, namedUser) => {
      if(err) {
        res.write('user ' + req.params.user + ' not found');
        return res.send(err);
      } else {
        res.write('user '  + req.params.user + ' renamed to ' + namedUser.name);
        res.end();
      }
    })
    console.log('received PUT request for ' + req.params.user);
    next();
  })
  .delete((req, res, next) => {
    var exUser = req.params.user;
    User.findOne({'name': exUser}, (err, namedUser) => {
      console.log(namedUser);
      namedUser.remove((err, namedUser) => {
        res.write('user ' + exUser + ' removed');
        res.end();
        next();
      });
    });
    console.log('received DELETE request for ' + exUser);
  });

  Router.route('/:user/files')
  .post((req, res, next) => {
    User.findOne({'name': req.params.user}, (err, curUser) => {
      if(err) {
        console.log(curUser, err);
      } else {
        console.log(curUser);
        var key = req.params.user + '/' + req.body.fileName;
        console.log(key);
        var params = {
          'Bucket': config.bucketName,
          'Key': key,
          'ACL': 'public-read',
          'Body': req.body.content
        };
        console.log(params);
        S3.upload(params, function(err, data) {
          if(err) {
            console.log(err);
          } else {
            console.log('loaded data to ' + key);
            var newUrl = 'https://s3-' + config.AWSRegion + '.amazonaws.com/' +
                         config.bucketName + '/' + key;
            console.log(newUrl);
            next();
          }
        })
      }
    })
  })
}
