var mongoose = require('mongoose');

var DB_PORT = process.env.MONGOLAB_URI || 'mongodb://localhost/db';
mongoose.connect(DB_PORT);

var models = {};

require('./User')(mongoose, models);
require('./File')(mongoose, models);

module.exports = models;
