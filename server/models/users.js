'use strict';
module.exports = (sequelize, Sequelize) => {
  const Users = sequelize.define('Users', {
      id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
      },
      username: {
          allowNull: false,
          type: Sequelize.STRING(32)
      },
      password: {
          allowNull: false,
          type: Sequelize.STRING(32)
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
  }, {
    tableName:'users'
  });
  Users.associate = function(models) {
    // associations can be defined here
      Users.hasMany(models.Contents,{
        foreignKey:'user_id'
          // as:'contents'
      });
      Users.hasMany(models.Comments,{
          foreignKey:'user_id'
          // as:'contents'
      });
  };
  return Users;
};