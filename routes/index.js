const express = require('express');
const router = express.Router();

const authController = require('../controllers/authController');
const postController = require('../controllers/postController');
const { catchErrors } = require('../handlers/errorHandlers');

router.get('/', postController.getRecentPosts);

router.get('/auth/twitter', authController.login);
router.get('/auth/twitter/callback', authController.login, authController.loginCallback);

module.exports = router;
