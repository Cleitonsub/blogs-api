const {
  createCategoryService,
} = require('../services/category.service');
const {
  CREATED,
} = require('../helpers/httpStatusCode');

const createCategory = async (req, res, next) => {
  try {
    const result = await createCategoryService(req.body);
    return res.status(CREATED).json(result);
  } catch (e) {
    next(e);
  }
};

module.exports = {
  createCategory,
};
