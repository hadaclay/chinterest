const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
const mongodbErrorHandler = require("mongoose-mongodb-errors");

const userSchema = new mongoose.Schema({
  twitter_id: {
    type: String,
    required: true
  },
  profile_img: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  likedPosts: {
    type: [mongoose.Schema.ObjectId],
    ref: "Post"
  }
});

module.exports = mongoose.model("User", userSchema);
