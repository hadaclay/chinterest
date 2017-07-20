const mongoose = require('mongoose');
const Post = mongoose.model('Post');
const User = mongoose.model('User');

exports.getRecentPosts = async (req, res) => {
  const POST_LIMIT = 50;

  const posts = await Post.find()
    .sort({ _id: '-1' })
    .populate('author')
    .limit(POST_LIMIT);

  res.render('posts', { title: 'All Posts', posts });
};

exports.getMyPosts = async (req, res) => {
  const posts = await Post.find({ author: req.user._id })
    .sort({ _id: '-1' })
    .populate('author');

  res.render('posts', { title: 'My Posts', posts });
};

exports.getUserPosts = async (req, res) => {
  const posts = await Post.find({ author: req.params.id })
    .sort({ _id: '-1' })
    .populate('author');

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

  await User.findOneAndUpdate(
    { _id: req.user.id },
    { $addToSet: { likedPosts: post._id } }
  );

  res.redirect('back');
};

exports.likePost = async (req, res) => {
  const userLikes = req.user.likedPosts.map(post => post.toString());

  const operator = userLikes.includes(req.params.id) ? '$pull' : '$addToSet';
  const likeChange = operator === '$pull' ? -1 : 1;

  await User.findOneAndUpdate(
    { _id: req.user._id },
    { [operator]: { likedPosts: req.params.id } }
  );

  const post = await Post.findOne({ _id: req.params.id }).exec();
  const postLikes = post.likes;

  post.likes = postLikes + likeChange;
  await post.save();

  res.redirect('back');
};

exports.deletePost = async (req, res) => {
  const post = await Post.findOne({ _id: req.params.id });

  if (post.author.toString() !== req.user._id.toString()) {
    req.flash('is-danger', 'Unable to delete post.');
    return res.redirect('back');
  }

  await post.remove();
  res.redirect('back');
};
