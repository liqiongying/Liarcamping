const Models=require('../models/index');
const nodemail=require('./nodemailer');
const md5=require('md5');

var fn_login = async (ctx, next) => {
    var email = ctx.request.body.email.trim(),
        password = ctx.request.body.password.trim();
    let user =await Models.Users.findOne({
        where:{
            email:email
        }
    });
    if (user===null){
        return ctx.body={
            code:1,
            data:"邮箱不存在"
        }
    }
    if(user.get('password')!==md5(password)){

        return ctx.body={
            code:1,
            data:"密码错误"
        }
    }
        // ctx.session.uid=user.get('id');
        // console.log("你好，我存了"+ctx.session.uid);
        ctx.body={
            code:0,
            dt:{
                id:user.get('id'),
                username:user.get('username')
            },
            data:"登陆成功！欢迎您，"+user.get('username')
        };
        // ctx.session.set('uuid',user.get('id'),{
        //     httpOnly:true
        // })
    ctx.session.uuid=user.get('id');

    // console.log(ctx.session.uuid);

};

var fn_register= async (ctx, next) => {
    var username = ctx.request.body.username.trim(),
        password = ctx.request.body.password.trim(),
        email = ctx.request.body.email.trim();
    await Models.Users.create({
        username:username,
        password:md5(password),
        email:email
    }).then((msg)=>{
        console.log(msg);
        ctx.body={
            success:true
        }
    }).catch((err)=>{
        console.log(err);
        ctx.body={
            success:false
        }
    });
};

var fn_reset=async(ctx,next)=>{


    var password = ctx.request.body.password.trim(),
        email = ctx.request.body.email.trim();
    let user =await Models.Users.findOne({
        where:{
            email:email
        }
    });
    if(user){
        await user.update({
            password:md5(password),
            updatedAt:new Date()
        }).then(result=>{
            console.log('updated success!');
            console.log(result);
            ctx.body={
                        success:true,
                        message:"密码重置成功"
                    }
        }).catch((err)=>{
            console.log(err);
            ctx.body={
                success:false
            }
        });
    }else {
         ctx.body={
                    success:false,
                    message:"邮箱未注册"
                }
    }

    // console.log(user);
};
var fn_email=async(ctx,next)=>{
        // console.log(ctx.request.body.email);
        var email = ctx.request.body.email.trim();//刚刚从前台传过来的邮箱
        console.log(email);
        var status=ctx.request.body.status;
        // console.log(status);
        var code = await createSixNum();//随机六位数
        // var date = new Date();//获取当前时间
        // var isLive = "no";
        var result_email =await Models.Users.findOne({
            where:{email:email}
        });
        console.log(result_email);
    if(status==1){
        var username = ctx.request.body.username;//刚刚从前台传过来用户名
        var result =await Models.Users.findOne({
            where:{
                username:username
            }
        });
        if(result!=null){
            ctx.body ={
                success:false,
                message:"账号已经存在"
            }
        }
        if(result_email!=null){
            ctx.body ={
                success:false,
                message:"邮箱已经存在"
            }
        }else {
            var mail = {
                // 发件人
                from: '<Liarcamping@163.com>',
                // 主题
                subject: '骗子集中营网站邮箱注册验证',//邮箱主题
                // 收件人
                to:email,//前台传过来的邮箱
                // 邮件内容，HTML格式
                text: '欢迎注册！请用'+code+'作为你的验证码'//发送验证码
            };
            await nodemail(mail);//发送邮件
            var toDate = (new Date()).getTime();
            ctx.body ={
                code:code,
                time:toDate,
                success:true,
                message:"账号可行"
            }
        }



    }
    if(status==2){
        if(result_email==null){
            ctx.body ={success:false,message:"邮箱未注册"}
        }
        else{
            var mail = {
                // 发件人
                from: '<Liarcamping@163.com>',
                // 主题
                subject: '骗子集中营邮箱重置密码验证',//邮箱主题
                // 收件人
                to:email,//前台传过来的邮箱
                // 邮件内容，HTML格式
                text: '用'+code+'作为你的验证码'//发送验证码
            };
            await nodemail(mail);//发送邮件
            var toDate = (new Date()).getTime();
            ctx.body ={
                code:code,
                time:toDate,
                success:true,
                message:"账号可行"
            }
        }
    }

    function createSixNum()
    {
        var Num="";
        for(var i=0;i<6;i++)
        {
            Num+=Math.floor(Math.random()*10);
        }

        return Num;
    }
};
var fn_delete=async(ctx,next)=>{
    var username=ctx.request.body.username.trim();
    await Models.Users.destroy({
        where:{
            username:username
        }
    }).then(function(result){
        console.log('destroy'+username);
        console.log(result);
        ctx.body={
            success:true,
            message:"注销成功"
        }
    }).catch((error)=>{
        console.log(error);
        ctx.body={
            success:false,
            message:"注销失败！"
        }
    });
};
var fn_modify=async(ctx,next)=>{
    var oldname=ctx.request.body.oldname.trim();
    var username=ctx.request.body.username.trim();
    var password = ctx.request.body.password.trim();
    // var uid=ctx.session.uid;
    console.log(username);
    let user =await Models.Users.findOne({
        where:{
            username:oldname
        }
    });
    console.log(user);

    if(user!=null){
        await user.update({
            username:username,
            password:md5(password),
            updatedAt:new Date()
        }).then(result=>{
            console.log('updated success!');
            ctx.body={
                username:username,
                success:true,
                message:"用户信息修改成功"
            }
        }).catch((err)=>{
            console.log(err);
            ctx.body={
                success:false,
                message:"用户信息修改失败"
            }
        });
    }else{
        ctx.body={
            success:false,
            message:"不存在用户，用户信息修改失败"
        }
    }



   };
module.exports = {
    'POST /login': fn_login,
    'POST /register': fn_register,
    'POST /email':fn_email,
    'POST /reset': fn_reset,
    'POST /delete': fn_delete,
    'POST /modify': fn_modify,

};