const errors = {
  ValidationError: 400,
  UnauthorizedError: 401,
  NotFoundError: 404,
  ConflictError: 409,
};
    
const errorHandlerMiddleware = ({ name, message }, _req, res, _next) => {
  const status = errors[name];
  // console.log(status);
  if (!status) return res.sendStatus(500);
  return res.status(status).json({ message });
};

module.exports = errorHandlerMiddleware;
