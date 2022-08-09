const {
  createUserService,
  getAllUsersService,
  getByIdService,
  deleteUserService,
} = require('../services/user.service');
const {
  createToken,
} = require('../services/jwt.service');
const {
  CREATED,
  OK,
  NO_CONTENT,
} = require('../helpers/httpStatusCode');

const createUser = async (req, res, next) => {
  try {
    await createUserService(req.body);
    const token = createToken(req.body.email);
    return res.status(CREATED).json({ token });
  } catch (e) {
    next(e);
  }
};

const getAllUsers = async (_req, res, next) => {
  try {
    const result = await getAllUsersService();
    return res.status(OK).json(result);
  } catch (e) {
    next(e);
  }
};

const getById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const result = await getByIdService(id);
    return res.status(OK).json(result);
  } catch (e) {
    next(e);
  }
};

const deleteUser = async (req, res, next) => {
  const token = req.headers.authorization;
  try {
    await deleteUserService(token);
    return res.status(NO_CONTENT).end();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createUser,
  getAllUsers,
  getById,
  deleteUser,
};
