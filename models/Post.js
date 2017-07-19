const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const postSchema = new mongoose.Schema({
  img_url: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  author: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  },
  likes: {
    type: Number,
    default: 0
  }
});

module.exports = mongoose.model('Post', postSchema);
