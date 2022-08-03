const { User } = require('../database/models');

const getUserID = async (email) => {
  const user = await User.findOne({ where: { email } });
  return user.id;
};

module.exports = { getUserID };