const express = require('express');
const router = express.Router();

const authController = require('../controllers/authController');
const postController = require('../controllers/postController');
const { catchErrors } = require('../handlers/errorHandlers');

// Posts
router.get('/', catchErrors(postController.getRecentPosts));
router.get(
  '/myposts',
  authController.isLoggedIn,
  catchErrors(postController.getMyPosts)
);
router.get('/userposts/:id', catchErrors(postController.getUserPosts));

// Auth
router.get('/auth/twitter', authController.login);
router.get('/auth/twitter/callback', authController.login, (req, res) => {
  res.redirect('/');
});
router.get('/authfailure', authController.loginFailure, (req, res) => {
  res.redirect('/');
});
router.get('/logout', authController.isLoggedIn, authController.logout);

// API
router.post(
  '/newpost',
  authController.isLoggedIn,
  catchErrors(postController.addPost)
);
router.post(
  '/api/like/:id',
  authController.isLoggedIn,
  catchErrors(postController.likePost)
);
router.post(
  '/api/delete/:id',
  authController.isLoggedIn,
  catchErrors(postController.deletePost)
);

module.exports = router;
