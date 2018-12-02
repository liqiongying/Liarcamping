'use strict';
// let now = Date.now();
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Users', {
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
    },{
      tableName:'users'
    }).then(()=>{
        return queryInterface.addIndex('users',{
          name:'username',
          unique:true,
          fields:['username']
        })
        });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Users');
  }
};