const jwt = require('jsonwebtoken');
const Joi = require('joi');
const Sequelize = require('sequelize');
const { BlogPost, PostCategory, Category, User } = require('../database/models');
const config = require('../database/config/config');
require('dotenv').config();

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

const validateUpdateBody = (data) => {
  const schema = Joi.object({
    postId: Joi.number().required(),
    token: Joi.string().required(),
    title: Joi.string().required(),
    content: Joi.string().required(),
  });
  const { error } = schema.validate(data);
  if (error) {
    const valiError = { name: 'ValidationError', message: 'Some required fields are missing' };
    throw valiError;
  }
};

const validateUserIdWithPost = async (postId, token) => {
  const { data } = jwt.verify(token, process.env.JWT_SECRET);
  const userId = await User.findOne({ where: { email: data }, attributes: ['id'] });
  const userIdFromPost = await BlogPost.findOne({ where: { id: postId }, attributes: ['userId'] });
  if (userId.dataValues.id !== userIdFromPost.dataValues.userId) {
    const error = { name: 'UnauthorizedError', message: 'Unauthorized user' };
    throw error;
  }
  return true;
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
  return result;
};

const getPostByIdService = async (id) => {
  const result = await BlogPost.findOne({
    where: { id },
    include: [{
      model: User, 
      as: 'user',
      attributes: { exclude: ['password'] },
    }, {
      model: Category,
      as: 'categories',
    }],
  });
  if (!result) {
    const error = { name: 'NotFoundError', message: 'Post does not exist' };
    throw error;
  }
  return result;
};

const updatePostByIdService = async (dataPost) => {
  validateUpdateBody(dataPost);
  const { postId, token, title, content } = dataPost;
  const validateUser = await validateUserIdWithPost(postId, token);
  if (validateUser) {
    const t = await sequelize.transaction();
    try {
      await BlogPost.update({ title, content }, { where: { id: postId }, transaction: t });
      const result = await BlogPost.findByPk(postId, { include: [
          { model: User, as: 'user', attributes: { exclude: ['password'] } },
          { model: Category, as: 'categories' }],
          transaction: t,
      });
      await t.commit();
      return result;
    } catch (error) {
      await t.rollback();
    }
  }
};

const deletePostByIdService = async (dataPost) => {
  const { postId, token } = dataPost;
  const validatePost = await getPostByIdService(postId);
  const validateUser = await validateUserIdWithPost(postId, token);
  if (validateUser && validatePost) {
    const t = await sequelize.transaction();
    try {
      await PostCategory.destroy({ where: { postId }, transaction: t });
      await BlogPost.destroy({ where: { id: postId }, transaction: t });
      await t.commit();
      return true;
    } catch (error) {
      await t.rollback();
    }
  }
};

const getAllPostsByUserIdService = async (userId) => {
  const post = await BlogPost.findAll({ 
      where: { userId },
    });
  if (!post || !userId) {
    const error = { name: 'NotFoundError', message: 'Post does not exist' };
    throw error;
  }
  return post;
};

module.exports = {
  createPostService,
  getAllPostsService,
  getPostByIdService,
  updatePostByIdService,
  deletePostByIdService,
  getAllPostsByUserIdService,
};
