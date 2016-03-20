'use strict';

module.exports = (fileRouter) => {
  fileRouter.route('/files')
  .get((req, res) => {
    console.log('received GET request');
  })
  .post((req, res) => {
    console.log('received POST request');
  })
  .put((req, res) => {
    console.log('received PUT request');
  })
  .delete((req, res) => {
    console.log('received DELETE request');
  })
}
