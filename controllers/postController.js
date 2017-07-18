const mongoose = require("mongoose");
const Post = mongoose.model("Post");
const User = mongoose.model("User");

exports.getRecentPosts = async (req, res) => {
  const POST_LIMIT = 50;

  const posts = await Post.find().limit(POST_LIMIT);

  res.render("posts", { title: "All Posts", posts });
};

exports.getUserPosts = async (req, res) => {
  const posts = await Post.find({ author: req.user.id });

  res.render("posts", { title: "User Posts", posts });
};
