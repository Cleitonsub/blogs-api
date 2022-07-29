const { validateLogin } = require('../services/auth.service');

const login = async (req, res) => {
  const { email, password } = req.body;
  const { code, message, token } = await validateLogin(email, password);
  if (message) return res.status(code).json({ message });

  return res.status(code).json({ token });
};

// const validateToken = async (req, _res, next) => {
//   const { token } = req.headers;
//   const user = authService.validateToken(token);
//   req.user = user;

//   next();
// };

module.exports = {
  login,
};
