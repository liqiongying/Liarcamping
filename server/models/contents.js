'use strict';
module.exports = (sequelize, Sequelize) => {
  const Contents = sequelize.define('Contents', {
      id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
      },
      user_id: {
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

      },
      title:{
          allowNull: false,
          type: Sequelize.STRING(50)

      },
      cheater_name:{
          allowNull: true,
          type: Sequelize.STRING(32)
      },
      cheater_contact:{
          allowNull: false,
          type: Sequelize.STRING(32)
      },
      summary:{
          allowNull:false,
          type: Sequelize.STRING(200)
      },
      description:{
          allowNull:false,
          type: Sequelize.TEXT
      },
      loss_money:{
          allowNull:false,
          type: Sequelize.INTEGER
      },
      proof_src:{
          allowNull:false,
          type: Sequelize.STRING(50)
      },
      like_count:{
          allowNull:false,
          type: Sequelize.INTEGER,
          defaultValue:0
      },
      comment_count:{
          allowNull:false,
          type: Sequelize.INTEGER,
          defaultValue:0
      }
  }, {});
  Contents.associate = function(models) {
    // associations can be defined here
      Contents.belongsTo(models.Users,{
          foreignKey:'user_id'
          // as:'contents'
      });
      Contents.hasMany(models.Comments,{
          foreignKey:'content_id'
          // as:'contents'
      });

  };
  return Contents;
};