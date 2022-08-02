const {
  createCategoryService,
  getAllCategoriesService,
} = require('../services/category.service');
const {
  CREATED,
  OK,
} = require('../helpers/httpStatusCode');

const createCategory = async (req, res, next) => {
  try {
    const result = await createCategoryService(req.body);
    return res.status(CREATED).json(result);
  } catch (e) {
    next(e);
  }
};

const getAllCategories = async (_req, res, next) => {
  try {
    const result = await getAllCategoriesService();
    return res.status(OK).json(result);
  } catch (e) {
    next(e);
  }
};

module.exports = {
  createCategory,
  getAllCategories,
};
