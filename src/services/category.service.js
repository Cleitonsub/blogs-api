const Joi = require('joi');
const { Category } = require('../database/models');

const validateBody = (data) => {
  const schema = Joi.object({
    name: Joi.string().required(),
  });

  const { error, value } = schema.validate(data);

  if (error) throw error;

  return value;
};

const createCategoryService = async (categoryBody) => {
  const validate = validateBody(categoryBody);
  if (validate) {
    const { name } = validate;
    const nameCategory = await Category.findOne({ where: { name } });
    if (nameCategory) {
      const error = { name: 'ConflictError', message: 'Category already registered' };
      throw error;
    }
    return categoryBody;
  }
};

module.exports = {
  createCategoryService,
};