const express = require('express');
const {
  createCategory,
  getAllCategories,
} = require('../controllers/category.controller');
const validateToken = require('../middlewares/validateToken');

const router = express.Router();

router.use(validateToken);
router.post('/', createCategory);
router.get('/', getAllCategories);

module.exports = router;
