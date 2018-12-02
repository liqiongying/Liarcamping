'use strict';
// let now = Date.now();
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Comments', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      content_id: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      user_id:{
          allowNull: false,
          type: Sequelize.INTEGER
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
    }).then(()=>{
        return queryInterface.addIndex('comments',{
            name:'user_id',
            fields:['user_id']
        })
    }).then(()=>{
        return queryInterface.addIndex('comments',{
            name:'content_id',
            fields:['content_id']
        })
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Comments');
  }
};