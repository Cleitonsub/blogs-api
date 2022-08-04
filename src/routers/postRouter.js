const express = require('express');
const {
  createPost,
  getAllPosts,
  getPostById,
  updatePostById,
} = require('../controllers/post.controller');
const validateToken = require('../middlewares/validateToken');

const router = express.Router();

router.use(validateToken);
router.post('/', createPost);
router.get('/', getAllPosts);
router.get('/:id', getPostById);
router.put('/:id', updatePostById);

module.exports = router;
