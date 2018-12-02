'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

// const ID_TYPE = Sequelize.STRING(50);
//
// function defineModel(name, attributes) {
//     var attrs = {};
//     for (let key in attributes) {
//         let value = attributes[key];
//         if (typeof value === 'object' && value['type']) {
//             value.allowNull = value.allowNull || false;
//             attrs[key] = value;
//         } else {
//             attrs[key] = {
//                 type: value,
//                 allowNull: false
//             };
//         }
//     }
//     attrs.id = {
//         type: ID_TYPE,
//         primaryKey: true
//     };
//     attrs.createdAt = {
//         type: Sequelize.BIGINT,
//         allowNull: false
//     };
//     attrs.updatedAt = {
//         type: Sequelize.BIGINT,
//         allowNull: false
//     };
//     attrs.version = {
//         type: Sequelize.BIGINT,
//         allowNull: false
//     };
//     return sequelize.define(name, attrs, {
//         tableName: name,
//         timestamps: false,
//         hooks: {
//             beforeValidate: function (obj) {
//                 let now = Date.now();
//                 if (obj.isNewRecord) {
//                     if (!obj.id) {
//                         obj.id = generateId();
//                     }
//                     obj.createdAt = now;
//                     obj.updatedAt = now;
//                     obj.version = 0;
//                 } else {
//                     obj.updatedAt = Date.now();
//                     obj.version++;
//                 }
//             }
//         }
//     });
// }

const TYPES = ['STRING', 'INTEGER', 'BIGINT', 'TEXT', 'DOUBLE', 'DATEONLY', 'BOOLEAN'];

// var db = {
//     defineModel: defineModel
// };
for (let type of TYPES) {
    db[type] = Sequelize[type];
}

// db.ID = ID_TYPE;

module.exports = db;
