const mongoose = require('mongoose');
const Post = mongoose.model('Post');
const User = mongoose.model('User');

exports.getRecentPosts = async (req, res) => {
  const POST_LIMIT = 50;

  const posts = await Post.find().populate('author').limit(POST_LIMIT);

  res.render('posts', { title: 'All Posts', posts });
};

exports.getUserPosts = async (req, res) => {
  const posts = await Post.find({ author: req.user._id }).populate('author');

  res.render('posts', { title: 'User Posts', posts });
};

exports.addPost = async (req, res) => {
  req.sanitizeBody('url');
  req.checkBody('url', 'Invalid Image URL').notEmpty();
  req.sanitizeBody('description');
  req.checkBody('description', 'Invalid Description').notEmpty();

  const errors = req.validationErrors();
  if (errors) {
    req.flash('is-danger', errors.map(err => err.msg));
    res.redirect('back');
    return;
  }

  const post = await new Post({
    img_url: req.body.url,
    description: req.body.description,
    author: req.user._id
  }).save();

  res.redirect('back');
};
