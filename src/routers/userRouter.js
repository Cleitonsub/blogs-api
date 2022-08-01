const express = require('express');
const userController = require('../controllers/user.controller');
const validateToken = require('../middlewares/validateToken');

const router = express.Router();

router.get('/', validateToken, userController.getAllUsers);
router.post('/', userController.createUser);

module.exports = router;
