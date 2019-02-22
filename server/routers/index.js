const Models=require('../models/index');
const moment = require('moment');
const Sequelize=require('sequelize');
var fn_root = async (ctx, next) => {
    // console.log(ctx.session.uid);
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
                create_time:moment(d.createdAt).format('YYYY-MM-DD HH:mm:ss'),
                like_count:d.like_count,
                comment_count:d.comment_count
            }
        }
    )};
};
var fn_like = async (ctx, next) =>{
    let content_id = ctx.request.body.content_id;
    // let uuid=ctx.session.uuid;
    // console.log("用户:"+uuid);

    let uid=ctx.request.body.uid;
    // console.log("用户:"+uid);
    if(!uid){
        return ctx.body={
            code:0,
            data:"还没有登陆，不能点赞哦！"
        }
    }
    let content=await Models.Contents.findById(content_id);
    if(!content){
        return ctx.body={
            code:2,
            data:"没有内容，不能点赞哦！"
        }
    }
    let like=await Models.Likes.findOne({
            where:{
                [Sequelize.Op.and]:[
                    {'content_id':content_id},
                    {'user_id':uid}]
            }
    });
    if(like){
        return ctx.body={
            code:4,
            data:"已经赞过了，不能再赞哦！"
        }
    }
    content.set('like_count',content.get('like_count')+1);
    content.save();

    await Models.Likes.build({
        content_id:content_id,
        user_id:uid
    }).save();
    ctx.body={
        code:1,
        data:content
    }
};
var fn_comment = async (ctx, next) =>{
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
module.exports = {
    'GET /': fn_root,
    'POST /like':fn_like,
    'POST /comment':fn_comment,

};