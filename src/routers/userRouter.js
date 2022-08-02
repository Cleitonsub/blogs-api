const express = require('express');
const userController = require('../controllers/user.controller');
const validateToken = require('../middlewares/validateToken');

const router = express.Router();

router.post('/', userController.createUser);
router.use(validateToken);
router.get('/', userController.getAllUsers);
router.get('/:id', userController.getById);

module.exports = router;
