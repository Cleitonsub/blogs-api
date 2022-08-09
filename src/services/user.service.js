const jwt = require('jsonwebtoken');
const Joi = require('joi');
const Sequelize = require('sequelize');
const { User, BlogPost, PostCategory } = require('../database/models');
const config = require('../database/config/config');
const { getAllPostsByUserIdService } = require('./post.service');
require('dotenv').config();

const sequelize = new Sequelize(config.development);

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
    const result = await User.create(validate);
    return result;
  }
};

const getAllUsersService = async () => {
  const result = await User.findAll({ attributes: { exclude: 'password' } });
  if (!result) {
    throw new Error();
  }
  return result;
};

const getByIdService = async (id) => {
  const result = await User.findOne({ where: { id }, attributes: { exclude: 'password' } });
  if (!result) {
    const error = { name: 'NotFoundError', message: 'User does not exist' };
    throw error;
  }
  return result;
};

const deleteUserService = async (token) => {
  const { data } = jwt.verify(token, process.env.JWT_SECRET);
  const { dataValues: { id } } = await User.findOne({ where: { email: data } });
  const posts = await getAllPostsByUserIdService(id);
  const postIds = await posts.map((post) => post.dataValues.id);
  const t = await sequelize.transaction();
  try {
    await Promise.all([postIds.map((postId) => PostCategory.destroy({ where: { postId } }))]);
    await BlogPost.destroy({ where: { userId: id }, transaction: t });
    await User.destroy({ where: { id }, transaction: t });
    await t.commit();
    return true;
  } catch (error) {
    await t.rollback();
  }
};

module.exports = {
  createUserService,
  getAllUsersService,
  getByIdService,
  deleteUserService,
};
