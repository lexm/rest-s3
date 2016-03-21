'use strict';

var models = require(__dirname + '/../models')
var User = models.User;

module.exports = (Router) => {
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
    })
  })
  .put((req, res, next) => {
    console.log('received PUT request for ' + req.params.user);
    next();
  })
  .delete((req, res, next) => {
    console.log('received DELETE request for ' + req.params.user);
    next();
  })
}
