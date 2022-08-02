const {
  createUserService,
  getAllUsersService,
  getByIdService,
} = require('../services/user.service');
const {
  createToken,
} = require('../services/jwt.service');
const {
  CREATED,
  OK,
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

module.exports = {
  createUser,
  getAllUsers,
  getById,
};
