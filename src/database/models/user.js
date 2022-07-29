'use strict';

module.exports = (sequelize, DataTypes) => {
  /**
   * As linhas abaixo são para auto incremento no desenvolvimento
   * @param {import('sequelize').Sequelize } sequelize 
   * @param {import('sequelize').DataTypes} DataTypes 
   */
  const User = sequelize.define('User', {
    id: {
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER,
    },
    displayName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    image: DataTypes.STRING
  }, {
    timestamps: false,
    tablename: 'Users'
  }
  )
  return User;
};
