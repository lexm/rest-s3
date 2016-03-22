'use strict';

var models = require(__dirname + '/../models');
var User = models.User;
var File = models.File;

module.exports = (Router) => {
  Router.route('/')
  .all((req, res, next) => {
    console.log('received /files request');
    next();
  })
  .get((req, res, next) => {
    console.log('received GET request');
    File.find({}, (err, files) => {
      res.json({data: files});
      next();
    })
  })
  .post((req, res, next) => {
    console.log('received POST request');
    next();
  })

  Router.route('/:id')
  .put((req, res, next) => {
    console.log('received PUT request');
    next();
  })
  .delete((req, res, next) => {
    console.log('received DELETE request');
    File.findById(req.params.id, (err, file) => {
      console.log(file);
      file.remove((err, file) => {
        res.json({message: 'file removed'});
        res.end();
        next();
      });
    });
  })
}
