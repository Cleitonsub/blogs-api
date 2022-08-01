const { createUserService } = require('../services/user.service');
const { createToken } = require('../services/jwt.service');

const { CREATED } = require('../helpers/httpStatusCode');

const createUser = async (req, res, next) => {
  try {
    await createUserService(req.body);
    const token = createToken(req.body.email);
    return res.status(CREATED).json({ token });
  } catch (e) {
    next(e);
  }
};

module.exports = {
  createUser,
};
