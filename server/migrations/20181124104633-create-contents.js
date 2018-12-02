'use strict';
// let now = Date.now();
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Contents', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_id: {
        allowNull: false,
        type: Sequelize.INTEGER
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
    },{
        tableName:'contents'
    }).then(()=>{
        return queryInterface.addIndex('contents',{
            name:'title',
            fields:['title']
        })
    }).then(()=>{
        return queryInterface.addIndex('contents',{
            name:'cheater_contact',
            fields:['cheater_contact']
    })
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Contents');
  }
};