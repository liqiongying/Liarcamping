const Models=require('../models/index');

var fn_comment=async(ctx,next)=>{
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
    ctx.body={
        code:1,
        data:"评论成功！"
    }
};

module.exports = {
    'POST /contentcomment':fn_comment,

};