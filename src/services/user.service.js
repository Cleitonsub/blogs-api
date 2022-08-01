const Joi = require('joi');
const { User } = require('../database/models');

const validateBody = (data) => {
  const schema = Joi.object({
    displayName: Joi.string().min(8).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    image: Joi.string().required(),
});

const { error, value } = schema.validate(data);

if (error) throw error;

return value;
};

const createUserService = async (userBody) => {
  const validate = validateBody(userBody);
  if (validate) {
    const { email } = validate;
    const emailUser = await User.findOne({ where: { email } });
    if (emailUser) {
      const error = { name: 'ConflictError', message: 'User already registered' };
      throw error;
    }
    const result = await User.create(userBody);
    return result;
  }
};

module.exports = {
  createUserService,
};