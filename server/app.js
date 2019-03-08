const Koa=require('koa');
const bodyParser = require('koa-bodyparser');
const router = require('koa-router')();
const serve = require('koa-static');
const cors = require('koa2-cors');
const render = require('koa-art-template');
const path=require('path');
const fs=require('fs');
// var formidable = require('koa-formidable')
// app.use(formidable());
const Models=require('./models/index');
const session = require('koa-session');
const app =new Koa();
app.keys = ['l am a girl.l want to fly'];
app.use(session({
    key: 'a boy likes eating',
    maxAge: 86400000,
    overwrite: true, /** (boolean) can overwrite or not (default true) */
    httpOnly: true, /** (boolean) httpOnly or not (default true) */
    signed: true, /** (boolean) signed or not (default true) */
}, app));
app.use(cors({
    origin: [ "http://localhost:8080"],
    exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
    maxAge: 5,
    credentials: true,
    allowMethods: ['GET', 'POST', 'DELETE'],
    allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
}));
app.use(bodyParser());
// router.post('/login',async (ctx)=>{
//     ctx.body="首页";
//     console.log(ctx.request.body);
//
// });
// app.use(router.routes());
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

