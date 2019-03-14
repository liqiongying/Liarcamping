const Models=require('../models/index');
const moment = require('moment');
var fn_commentcontent = async (ctx, next) =>{
    let content_id = ctx.request.body.content_id;
    let uid=ctx.request.body.uid;
    if(!uid){
        return ctx.body={
            code:0,
            data:"还没有登陆，不能评论哦！"
        }
    }
    let content=await Models.Contents.findById(content_id);
    if(!content){
        return ctx.body={
            code:2,
            data:"没有内容，不能评论哦！"
        }
    }
    // content.set('comment_count',content.get('comment_count')+1);
    // content.save();
    ctx.body={
        code:1,
        data:content
    }
};

const fn_comment=async(ctx,next)=>{
    let content_id = ctx.request.body.content_id;
    let commentcontent=ctx.request.body.content;
    let uid=ctx.request.body.uid;
    // console.log(content_id);
    let content=await Models.Contents.findById(content_id);
    console.log(content);
    content.set('comment_count',content.get('comment_count')+1);
    content.save();
    await Models.Comments.build({
        content_id:content_id,
        user_id:uid,
        content:commentcontent
    }).save();
    let data=await Models.Comments.findAndCountAll({
        limit:15,
        where:{
            content_id:content_id
        },
        include:{
            model:Models.Users
        },
        order:[[ 'id', 'DESC']]
    });

    ctx.body={
        code: 1,
        data: data.rows.map( d=>{
                return{
                    id:d.id,
                    username:d.User.username,
                    content:d.content,
                    time:moment(d.createdAt).format('YYYY-MM-DD HH:mm:ss'),
                }
            }
        )
    }
};
const fn_getcomment=async(ctx,next)=>{
    let content_id=ctx.query.content_id;
    console.log(content_id);
    if (!content_id) {
        ctx.body={
            code: -200,
            message: '参数错误'
        }
    }else{

         let data=await Models.Comments.findAndCountAll({
                limit:15,

             where:{
                    content_id:content_id
                },
             include:{
                 model:Models.Users
             },
             order:[["id", 'DESC']]
            });
         // let username=await Models.Users.findById(data)

            ctx.body={
                code: 200,
                data: data.rows.map( d=>{
                        return{
                            id:d.id,
                            username:d.User.username,
                            content:d.content,
                            time:moment(d.createdAt).format('YYYY-MM-DD HH:mm:ss'),
                        }
                    }
                )
            }

    }
};
module.exports = {
    'POST /contentcomment':fn_comment,
    'GET /getComment':fn_getcomment,
    'POST /comment':fn_commentcontent,
};