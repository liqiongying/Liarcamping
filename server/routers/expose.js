const Models=require('../models/index');

var fn_expose=async(ctx,next)=>{
    var title = ctx.request.body.title,
    name = ctx.request.body.name,
    contact = ctx.request.body.contact,
    description = ctx.request.body.description,
    money = ctx.request.body.money,
    summary = ctx.request.body.summary,
    proof=ctx.request.body.proof,
    uid=ctx.request.body.uid;
    console.log(uid);

    await Models.Contents.create({
        user_id:uid,
        title:title,
        cheater_name:name,
        cheater_contact:contact,
        summary:summary,
        description:description,
        loss_money:money,
        proof_src:proof[0]
    }).then((msg)=>{
        console.log(msg);
        ctx.body={
            success:true,
            message:"恭喜！曝光成功！"
        }
    }).catch((err)=>{
        console.log(err);
        ctx.body={
            success:false,
            message:"非常遗憾，曝光失败，请及时联系网站客服！"
        }
    })
};

module.exports={
    'POST /expose': fn_expose
};