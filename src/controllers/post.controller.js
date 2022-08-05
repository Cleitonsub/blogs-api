const {
  createPostService,
  getAllPostsService,
  getPostByIdService,
  updatePostByIdService,
  deletePostByIdService,
} = require('../services/post.service');
const {
  CREATED,
  OK,
  NO_CONTENT,
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

const getPostById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const result = await getPostByIdService(id);
    return res.status(OK).json(result);
  } catch (error) {
    next(error);
  }
};

const updatePostById = async (req, res, next) => {
  const postId = req.params.id;
  const { title, content } = req.body;
  const token = req.headers.authorization;
  const data = { postId, token, title, content };
  try {
    const result = await updatePostByIdService(data);
    return res.status(OK).json(result);
  } catch (error) {
    next(error);
  }
};

const deletePostById = async (req, res, next) => {
  const postId = req.params.id;
  const token = req.headers.authorization;
  const data = { postId, token };
  try {
    const result = await deletePostByIdService(data);
    if (result) {
      return res.status(NO_CONTENT).end();
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createPost,
  getAllPosts,
  getPostById,
  updatePostById,
  deletePostById,
};