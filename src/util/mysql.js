const db = require('../../server/db');
module.exports = db.defineModel('users', {
    username:{
        type:db.STRING(32)
    },
    password: db.STRING(32)
}, {
    paranoid:false,
    tableName:'users',
    indexes:[
        {
            id:'id',
            fields:['id']
        }
    ]
});

