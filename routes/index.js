const express = require('express');
const router = express.Router();

const authController = require('../controllers/authController');
const postController = require('../controllers/postController');
const { catchErrors } = require('../handlers/errorHandlers');

// Posts
router.get('/', postController.getRecentPosts);
router.get('/myposts', postController.getUserPosts);
router.post('/newpost', postController.addPost);

// Auth
router.get('/auth/twitter', authController.login);
router.get('/auth/twitter/callback', authController.login, (req, res) => {
  res.redirect('/');
});
router.get('/authfailure', authController.loginFailure, (req, res) => {
  res.redirect('/');
});
router.get('/logout', authController.logout);

module.exports = router;
