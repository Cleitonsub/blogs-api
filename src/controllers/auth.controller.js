const { OK } = require('../helpers/httpStatusCode');
const { validateLogin } = require('../services/auth.service');

const login = async (req, res, next) => {
  try {
    const token = await validateLogin(req.body);
    return res.status(OK).json({ token });
  } catch (e) {
    next(e);
  }
};

module.exports = {
  login,
};
