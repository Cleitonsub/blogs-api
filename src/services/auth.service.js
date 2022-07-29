const jwtService = require('./jwt.service');

const { User } = require('../database/models');
const { OK } = require('../helpers/httpStatusCode');

const validateLogin = async (email, password) => {
  console.log(email, password);
  if (!email || !password) return { code: 400, message: 'Some required fields are missing' };
  const result = await User.findOne({ where: { email, password } });
  if (!result) return { code: 400, message: 'Invalid fields' };
  const token = jwtService.createToken(email);
  return { code: OK, token };
};

module.exports = {
  validateLogin,
};
