'use strict';

module.exports = (sequelize, DataTypes) => {
  /**
   * As linhas abaixo são para auto incremento no desenvolvimento
   * @param {import('sequelize').Sequelize } sequelize 
   * @param {import('sequelize').DataTypes} DataTypes 
   */
  const BlogPost = sequelize.define('BlogPost', {
    id: {
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER,
    },
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    published: {
      defaultValue: DataTypes.NOW,
      type: DataTypes.DATE,
    },
    updated: {
      defaultValue: DataTypes.NOW,
      type: DataTypes.DATE,
    },
  }, {
    timestamps: false,
    tablename: 'BlogPosts'
  });

  BlogPost.associate = (models) => {
    BlogPost.belongsTo(models.User, { foreignKey: 'userId', as: 'Users' })
  };

  return BlogPost;
};
