'use strict';
module.exports = (sequelize, Sequelize) => {
  const Likes = sequelize.define('Likes', {
      id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
      },
      content_id: {
          allowNull: false,
          type: Sequelize.INTEGER,
          reference:{
              model:"Contents",
              key:"id"
          }
      },
      user_id:{
          allowNull: false,
          type: Sequelize.INTEGER,
          reference:{
              model:"Users",
              key:"id"
          }
      },
      createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
          defaultValue:new Date()

      },
      updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
          defaultValue:new Date()

      }
  }, {});
  Likes.associate = function(models) {
    // associations can be defined here
      Likes.belongsTo(models.Users,{
          foreignKey:'user_id'
          // as:'contents'
      });
      Likes.belongsTo(models.Comments,{
          foreignKey:'content_id'
          // as:'contents'
      });
  };
  return Likes;
};