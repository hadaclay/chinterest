const passport = require('passport');
const mongoose = require('mongoose');
const TwitterStrategy = require('passport-twitter').Strategy;
const User = mongoose.model('User');

passport.use(
  new TwitterStrategy(
    {
      consumerKey: process.env.TWITTER_CONSUMER_KEY,
      consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
      callbackURL: `http://localhost:3000/auth/twitter/callback`
    },
    async (token, tokenSecret, profile, cb) => {
      let user = await User.findOne({ twitter_id: profile.id_str });

      if (user) {
        return cb(null, user);
      }

      console.log(profile);
      user = await new User({
        twitter_id: profile.id_str,
        name: profile.username,
        profile_img: profile.profile_image_url_https
      }).save();
      cb(null, user);
    }
  )
);

passport.serializeUser((user, cb) => {
  return cb(user.id);
});

passport.deserializeUser(async (obj, cb) => {
  const user = await User.findById(obj);
  cb(null, user);
});
