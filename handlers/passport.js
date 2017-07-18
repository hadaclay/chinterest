const passport = require("passport");
const mongoose = require("mongoose");
const TwitterStrategy = require("passport-twitter").Strategy;
const User = mongoose.model("User");

passport.use(
  new TwitterStrategy(
    {
      consumerKey: process.env.TWITTER_CONSUMER_KEY,
      consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
      callbackURL: `http://localhost:3000/auth/twitter/callback`
    },
    async (token, tokenSecret, profile, cb) => {
      let user = await User.findOne({ twitter_id: profile.id });

      if (user !== null) {
        return cb(null, user);
      }

      user = await new User({
        twitter_id: profile.id,
        name: profile.username,
        profile_img: profile._json.profile_image_url_https
      }).save();

      cb(null, user);
    }
  )
);

passport.serializeUser((user, cb) => {
  return cb(null, user.id);
});

passport.deserializeUser(async (obj, cb) => {
  const user = await User.findOne({ _id: obj });
  cb(null, user);
});
