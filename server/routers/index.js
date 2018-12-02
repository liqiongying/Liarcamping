const Models=require('../models/index');
var moment = require('moment');

var fn_root = async (ctx, next) => {
    let this_page=ctx.query.this_page||1;
    let per_page=ctx.query.per_page||3;
    let offset=(this_page-1)*per_page;
    let data= await Models.Contents.findAndCountAll({
        limit:3,
        offset,
        // include:{
        //     model:Models.Comments
        // }
    });
     ctx.body ={
        code:0,
        count:data.count,
        per_page:per_page,
        data:data.rows.map( d=>{
            return{
                id:d.id,
                title:d.title,
                summary:d.summary,
                create_time:moment(d.createdAt,).format('YYYY-MM-DD HH:mm:ss'),
                like_count:d.like_count,
                comment_count:d.comment_count
            }
        }
    )};
};


module.exports = {
    'GET /': fn_root
};