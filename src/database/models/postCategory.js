'use strict';

module.exports = (sequelize, DataTypes) => {
  /**
  * As linhas abaixo são para auto incremento no desenvolvimento
  * @param {import('sequelize').Sequelize } sequelize 
  * @param {import('sequelize').DataTypes} DataTypes 
  */
  /*
    Duas primaryKey conforme exemplo do professor luizcalaca na
    aula 24.4 em src/database/models/attendance.js
  */
  const PostCategory = sequelize.define('PostCategory', {
    postId: {
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    categoryId: {
      primaryKey: true,
      type: DataTypes.INTEGER
    },
  }, {
    timestamps: false,
    tablename: 'PostCategories'
  });

/*
  Isso bugou a minha mente.
  Codigo inspirado no nosso amigo de turma KleversonEller
*/
  PostCategory.associate = (models) => {
    models.Category.belongsToMany(models.BlogPost, {
      foreignKey: 'postId',
      as: 'BlogPosts',
      otherKey: 'categoryId',
      through: PostCategory
    });

    models.BlogPost.belongsToMany(models.Category, {
      foreignKey: 'categoryId',
      as: 'Categories',
      otherKey: 'postId',
      through: PostCategory
    });
  };
  
  return PostCategory;
};
