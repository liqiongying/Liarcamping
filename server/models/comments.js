'use strict';
module.exports = (sequelize, Sequelize) => {
  const Comments = sequelize.define('Comments', {
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
      content:{
          allowNull: false,
          type: Sequelize.TEXT
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
  Comments.associate = function(models) {
    // associations can be defined here
      Comments.belongsTo(models.Users,{
          foreignKey:'user_id'
          // as:'contents'
      });
      Comments.belongsTo(models.Contents,{
          foreignKey:'content_id'
          // as:'contents'
      });
  };
  return Comments;
};