const { User } = require('../database/models');
const { createToken } = require('./jwt.service');
const { checkPassword } = require('./password.service');

const validateLogin = async (authBody) => {
  const { email, password } = authBody;
  if (!email || !password) {
    const error = {
      name: 'ValidationError',
      message: 'Some required fields are missing',
    };
    throw error;
  }
  const result = await User.findOne({ where: { email, password } });

  checkPassword(password, result.password);

  if (!result) {
    const error = { name: 'ValidationError', message: 'Invalid fields' };
    throw error;
  }
  const token = createToken(authBody.email);
  return token;
};

module.exports = {
  validateLogin,
};
