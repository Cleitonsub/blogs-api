const {
  createPostService,
  getAllPostsService,
} = require('../services/post.service');
const {
  CREATED,
  OK,
} = require('../helpers/httpStatusCode');
const { getUserID } = require('../helpers/getUserId');

const createPost = async (req, res, next) => {
  const id = await getUserID(req.user);
  try {
    const result = await createPostService(req.body, id);
    return res.status(CREATED).json(result);
  } catch (e) {
    next(e);
  }
};

const getAllPosts = async (_req, res) => {
  const result = await getAllPostsService();
  return res.status(OK).json(result);
};

module.exports = {
  createPost,
  getAllPosts,
};