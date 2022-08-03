const express = require('express');
const {
  createPost,
  getAllPosts,
} = require('../controllers/post.controller');
const validateToken = require('../middlewares/validateToken');

const router = express.Router();

router.use(validateToken);
router.post('/', createPost);
router.get('/', getAllPosts);

module.exports = router;
