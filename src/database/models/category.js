'use strict';

module.exports = (sequelize, DataTypes) => {
  /**
   * As linhas abaixo são para auto incremento no desenvolvimento
   * @param {import('sequelize').Sequelize } sequelize 
   * @param {import('sequelize').DataTypes} DataTypes 
   */
  const User = sequelize.define('Category', {
    id: {
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER,
    },
    name: DataTypes.STRING,
  }, {
    timestamps: false,
    tablename: 'Categories'
  }
  )
  return User;
};
