const Joi = require('joi');
const Sequelize = require('sequelize');
const { BlogPost, PostCategory, Category, User } = require('../database/models');
const config = require('../database/config/config');

const sequelize = new Sequelize(config.development);

const validateBody = async (data) => {
  const schema = Joi.object({
    title: Joi.string().required(),
    content: Joi.string().required(),
    categoryIds: Joi.array().required(),
  });
  const { error } = schema.validate(data);
  if (error) {
    const valiError = { name: 'ValidationError', message: 'Some required fields are missing' };
    throw valiError;
  }
  
  const categories = await Category.findAll({ where: { id: data.categoryIds } });
  const categoriesIds = categories.map((e) => e.dataValues.id);
  if (categoriesIds.length !== data.categoryIds.length) {
    const valiError = { name: 'ValidationError', message: '"categoryIds" not found' };
    throw valiError;
  }
};

const createPostService = async (PostBody, userId) => {
  const t = await sequelize.transaction();
  await validateBody(PostBody);
  try {
    const { title, content, categoryIds } = PostBody;
    const post = await BlogPost.create(
      { title, content, userId },
      { transaction: t },
    );

    const category = categoryIds.map((c) => ({ postId: post.id, categoryId: c }));
    
    await PostCategory.bulkCreate(
      category,
      { validate: true, transaction: t, raw: true },
    );

    await t.commit();
    return post.toJSON();
  } catch (e) {
    await t.rollback();
  }
};

const getAllPostsService = async () => {
  const result = await BlogPost.findAll({
    include: [{
      model: User, 
      as: 'user',
      attributes: { exclude: ['password'] },
    }, {
      model: Category,
      as: 'categories',
    }],
  });
  console.log(result);
  return result;
};

module.exports = {
  createPostService,
  getAllPostsService,
};