const mongoose = require('mongoose');
const Post = mongoose.model('Post');
const User = mongoose.model('User');

exports.getRecentPosts = async (req, res) => {
  res.render('recentPosts', { title: 'All Posts' });
};
