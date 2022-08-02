const express = require('express');
const {
  createCategory,
} = require('../controllers/category.controller');
const validateToken = require('../middlewares/validateToken');

const router = express.Router();

router.use(validateToken);
router.post('/', createCategory);

module.exports = router;
