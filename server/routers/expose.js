const Models=require('../models/index');
const path =require('path');
const fs =require('fs');
const moment=require('moment');
const util = require('util');
var formidable = require('koa-formidable')

var fn_expose=async(ctx,next)=>{
    // console.log(files);
    let mkdirs = (dirname, callback)=> {
        fs.exists(dirname, function(exists) {
            if (exists) {
                callback();
            } else {
                mkdirs(path.dirname(dirname), function() {
                    fs.mkdir(dirname, callback);
                });
            }
        });
    };
    let form =formidable.parse(ctx.request);
    function formImage() {
        return new Promise((resolve, reject) => {
            form((opt, {fields, files}) => {

                var t = moment().format('YYYYMMDD_HH_mm_ss_');
                //生成随机数
                var ran = parseInt(Math.random() * 8999 +10000);
                //拿到扩展名
                var extname = path.extname(files.proof.name);
                //path.normalize('./path//upload/data/../file/./123.jpg'); 规范格式文件名
                var oldpath =   path.normalize(files.proof.path);
                //新的路径
                let newfilename=t+ran+extname+files.proof.name;
                console.log('新文件名'+newfilename);
                var newpath =  './upload/proof/'+newfilename;
                // console.log(files.file.path);
                mkdirs('upload/proof', function () {
                    fs.renameSync(oldpath,newpath); //重命名
                    resolve({fields:fields,imgName:newfilename});
                });

            })
        })
    }
    let data = await formImage();
    console.log(data);
    let title = data.fields.title,
        name = data.fields.name,
        contact = data.fields.contact,
        description = data.fields.description,
        money = data.fields.money,
        summary = data.fields.summary,
        uid=data.fields.uid;
    Models.Contents.create({
        user_id:uid,
        title:title,
        cheater_name:name,
        cheater_contact:contact,
        summary:summary,
        description:description,
        loss_money:money,
        proof_src:data.imgName
    })
        .then(msg=>{
            console.log("曝光成功");

        }).catch((err)=>{
        console.log(err);
        ctx.body={
            success:false,
            message:"非常遗憾，曝光失败，请及时联系网站客服！"
        }
    });
    ctx.body={
        success:true,
        message:"恭喜！曝光成功！"
    }
};

module.exports={
    'POST /expose': fn_expose

};