'use strict';

module.exports = (sequelize, DataTypes) => {
  // As linhas abaixo são para auto incremento no desenvolvimento
  /**
   * @param {import('sequelize').Sequelize } sequelize 
   * @param {import('sequelize').DataTypes} DataTypes 
   */
  const Users = sequelize.define('User', {
    id: DataTypes.INTEGER,
    displayName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    image: DataTypes.STRING
  }, {
    underscored: true,
    tablename: 'Users'
  })

  return Users;
};