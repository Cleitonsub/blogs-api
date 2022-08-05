const express = require('express');
const {
  createUser,
  getAllUsers,
  getById,
} = require('../controllers/user.controller');
const validateToken = require('../middlewares/validateToken');

const router = express.Router();

router.post('/', createUser);
router.use(validateToken);
router.get('/', getAllUsers);
router.get('/:id', getById);

module.exports = router;
