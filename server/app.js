const Koa=require('koa');
const bodyParser = require('koa-bodyparser');
const router = require('koa-router')();
const serve = require('koa-static');
const cors = require('koa2-cors');
const render = require('koa-art-template');
const path=require('path');
const Models=require('./models/index');
const app =new Koa();
app.use(cors({
    origin: [ "http://localhost:8080"],
    exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
    maxAge: 5,
    credentials: true,
    allowMethods: ['GET', 'POST', 'DELETE'],
    allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
}));
// app.use(async (ctx,next)=>{
//     ctx.set('Access-Control-Allow-Origin','*');
//     ctx.set("Access-Control-Allow-Methods", "OPTIONS, GET, PUT, POST, DELETE");
//     ctx.set("Access-Control-Allow-Headers", "x-requested-with, accept, origin, content-type");
//     ctx.set("Content-Type", "application/json;charset=utf-8");
//     await next();
// });
app.use(bodyParser());
// app.use(async (ctx,next)=>{
//     await next();
//     ctx.response.type='text/html';
//     ctx.response.body='<h1>你好,李金凤!</h1>'
// });

// app.use(serve(__dirname + '/../dist'));
// render(app, {
//     root: path.join(__dirname, '/../dist'),
//     extname: '.html',
//     debug: process.env.NODE_ENV !== 'production'
// });

// 导入controller middleware:
const controller = require('./controller');

// 使用middleware:
app.use(controller());


app.listen(3000);
console.log('hi!');

