const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const mongodbErrorHandler = require('mongoose-mongodb-errors');

const postSchema = new mongoose.Schema({});

module.exports = mongoose.model('Post', postSchema);
