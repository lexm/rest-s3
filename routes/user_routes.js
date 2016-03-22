'use strict';

var models = require(__dirname + '/../models');
var User = models.User;
var File = models.File;

module.exports = (Router, S3, config) => {
  Router.route('/')
  .post((req, res) => {
    User.find({name: req.body.name}, (err, users) => {
      if (users.length) {
        res.write(users[0].name + ' already added');
        res.end();
      } else {
        var newUser = new User(req.body);
        newUser.save((err, user) => {
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
        });
      }
    });
  })
  .get((req, res, next) => {
    User.find({}, (err, users) => {
      res.json({data: users});
      next();
    });
  });

  Router.route('/:user')
  .get((req, res) => {
    User.find({name: req.params.user}, (err, namedUser) => {
      res.json(namedUser);
    });
  })
  .put((req, res, next) => {
    var uName = req.params.user;
    User.findOneAndUpdate({name: uName}, {$set: req.body}, (err, namedUser) => {
      if(err) {
        res.write('user ' + uName + ' not found');
        return res.send(err);
      } else {
        res.write('user ' + uName + ' renamed to ' + namedUser.name);
        res.end();
      }
    });
    console.log('received PUT request for ' + req.params.user);
    next();
  })
  .delete((req, res, next) => {
    var exUser = req.params.user;
    User.findOne({'name': exUser}, (err, namedUser) => {
      namedUser.remove((err, namedUser) => {
        res.write('user ' + exUser + ' removed');
        res.end();
        next();
      });
    });
    console.log('received DELETE request for ' + exUser);
  });

  Router.route('/:user/files')
  .post((req, res) => {
    User.findOne({'name': req.params.user}, (err, curUser) => {
      if(err) {
        console.log(err);
      } else {
        var fName = req.body.fileName;
        var uName = req.params.user;
        var key = uName + '/' + fName;
        var params = {
          'Bucket': config.bucketName,
          'Key': key,
          'ACL': 'public-read',
          'Body': req.body.content
        };
        S3.upload(params, function(err, data) {
          if(err) {
            console.log(err);
          } else {
            console.log('loaded data to ' + key);
            var newUrl = 'https://s3-' + config.AWSRegion + '.amazonaws.com/' +
                         config.bucketName + '/' + key;
            var newFile = new File({
              fileName: fName,
              fileUrl: newUrl
            });
            newFile.save((err, file) => {
              User.update({name: uName}, { $push: { files: file._id } }, (err, data) => {
                if(err) {
                  console.log(err);
                } else {
                  res.write('file ' + file.fileName  + ' added for user ' + uName);
                  res.end();
                }
              });
            });
          }
        });
      }
    });
  })
  .get((req, res) => {
    User
    .findOne({'name': req.params.user}, (err, curUser) => {
      if(err) {console.log(err);}
    })
    .populate('files')
    .exec((err, user) => {
      res.json(user.files);
      res.end();
    });
  });
};
