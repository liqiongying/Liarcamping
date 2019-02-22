const Models=require('../models/index');
const Sequelize=require('sequelize');
const moment = require('moment');
const Op = Sequelize.Op;
var fn_search= async(ctx,next)=>{
    let key=ctx.query.key;
    let searchResult=await Models.Contents.findAll({
        where:{
            [Op.or]:[{title:{
                    [Op.like]:'%'+key+'%'
                }},{cheater_name:{
                    [Op.like]:'%'+key+'%'
                }},{summary:{
                    [Op.like]:'%'+key+'%'
                }}]
        }});
    ctx.body={
        result:searchResult
    };
};
module.exports = {
    'GET /search': fn_search,
};