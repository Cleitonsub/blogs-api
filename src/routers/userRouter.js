const express = require('express');
const {
  createUser,
  getAllUsers,
  getById,
  deleteUser,
} = require('../controllers/user.controller');
const validateToken = require('../middlewares/validateToken');

const router = express.Router();

router.post('/', createUser);
router.use(validateToken);
router.get('/', getAllUsers);
router.get('/:id', getById);
router.delete('/me', deleteUser);

module.exports = router;
