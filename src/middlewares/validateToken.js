const jwt = require('jsonwebtoken');

const validateToken = (req, _res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) {
      const e = new Error('Token not found');
      e.name = 'UnauthorizedError';
      throw e;
    }
    const { data } = jwt.verify(authorization, process.env.JWT_SECRET);
    req.user = data;
  } catch (_e) {
    const e = new Error('Expired or invalid token');
      e.name = 'UnauthorizedError';
      throw e;
  }

  next();
};

module.exports = validateToken;
