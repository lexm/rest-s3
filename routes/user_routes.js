'use strict';

module.exports = (Router) => {
  Router.route('/')
  .all((req, res, next) => {
    console.log('received /files request');
    next();
  })
  .get((req, res, next) => {
    console.log('received GET request');
    next();
  })
  .post((req, res, next) => {
    console.log('received POST request');
    next();
  })
  .put((req, res, next) => {
    console.log('received PUT request');
    next();
  })
  .delete((req, res, next) => {
    console.log('received DELETE request');
    next();
  })
}
