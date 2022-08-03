require('dotenv').config();
const jwt = require('jsonwebtoken');

const validateToken = (req, _res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    const e = new Error('Token not found');
    e.name = 'UnauthorizedError';
    throw e;
  }
  try {
    const { data } = jwt.verify(authorization, process.env.JWT_SECRET);
    // console.log(data, req.user);
    req.user = data;
    return next();
  } catch (error) {
    const e = new Error('Expired or invalid token');
      e.name = 'UnauthorizedError';
      throw e;
  }
};

module.exports = validateToken;
