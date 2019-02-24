<template>
    <div id="login-container">

        <div id="login-top" class="navbar navbar-default login-top">
            <a class="system"><router-link to="/">骗子集中营</router-link></a>
            <a class="welcome"> 欢迎您！</a>

        </div>
        <div class="white"></div>
        <div id="login-box" style="height: auto">

            <!-- 将form表单提交的窗口指向隐藏的ifrmae,并通过ifrmae提交数据。 -->
            <form method="POST" name="formphp" target="formsubmit" @submit.prevent="validateForm('form-login')"
                  data-vv-scope="form-login" >
                <p class="title text-center">欢迎登录</p>
                <hr style="margin-top: 5px">
                <div class="form-group" >
                    <label for="user">邮箱</label>
                    <input type="text" class="form-control"
                           name="login_email" id="user" placeholder="注册时用的邮箱"
                           v-model="login.email" v-validate="'required|email'" data-vv-validate-on="blur">
                    <span v-show="errors.has('form-login.login_email')" class="small" style="color: red">邮箱格式不正确</span>

                </div>
                <div class="form-group" >
                    <label for="pass" style="display: block">密码:</label>
                    <input type="password" class="form-control" name="login_password"
                           id="pass" placeholder="密码" v-model="login.password"
                           v-validate="'required|min:5|max:32'" data-vv-validate-on="blur"
                           style="width: 50%;display: inline-block">
                    <span v-show="errors.has('form-login.login_password')" class="small" style="color: red">密码位数应大于5，小于32</span>
                    <span class="btn bg-dark" style="float: right">

                        <a><router-link to="/reset">忘记密码？</router-link></a>
                    </span>
                </div>
                <div class="form-group small text-center"  >
                    <p>还没有注册<a><router-link to="/register">去注册>>></router-link></a></p>
                </div>
                <div class="form-group " >

                    <button type="submit" class="form-group form-group-button another-btn">登录</button>

                </div>

            </form>
        </div>

    </div>
</template>

<script>
    import axios from 'axios';
    import moment from 'moment';
    import 'moment/locale/zh-cn'
    moment.locale('zh-cn');
    export default {
        name: "login",
        data(){
            return{
                login: {
                    email:'',
                    password:''
                }
            }
        },
        mounted(){
            /*页面挂载获取cookie，如果存在username的cookie，则跳转到主页，不需登录*/
            if(this.$cookie.getCookie('username')){
                this.$router.go(-1);
            }
        },
        methods:{
            validateForm(scope) {
                        this.$validator.validateAll(scope).then((result) => {

                        if (result) {
                            // eslint-disable-next-line
                            axios({
                                method:'post',
                                url:'http://127.0.0.1:3000/login',
                                data:this.login
                            }).then(data=>{
                                // console.log(data.data);
                                alert(data.data.data);
                                if(data.data.code==0){
                                    // console.log("cookie的username"+data.data.dt.username);

                                    this.$cookie.setCookie('username',data.data.dt.username,60*60);
                                    this.$cookie.setCookie('uid',data.data.dt.id,60*60);
                                    // console.log(data.data.dt.id);
                                    // console.log(this.$cookie.getCookie('uid'));

                                    this.$router.go(-1);
                                }
                            });

                        }
                        else alert("登陆出错，请仔细检查！");

                    })
                    }


        }
    }
</script>

<style scoped>

    #login-container{
        /*max-height: 200px;*/
        background-image: url("../assets/img/bg.jpg");
        height: fit-content;
    }
    /*body{*/
    /*background-image: url("../img/greybg.jpg");*/
    /*backgroun-size:1500px 800px;*/

    /*}*/
    /*.all-container{*/
    /*background-image: url("../img/greybg.jpg");*/
    /*background-size: auto;*/
    /*}*/


    #login-top{
        background-image: url("../assets/img/bg.jpg");
        background-size: 1390px 700px;

        opacity: 1;
        width: 100%;
        height: 50px;
        position: fixed;
        top: 0;
    }

    #login-top a{
        font-weight: bold;
        /*color: #ffffff;*/
    }

    #login-box{
        background-image: url("../assets/img/sunny.jpg");
        background-size: 2500px 1000px;
        opacity: 1;
        font-size: 15px;
        width: 300px;
        height: 335px;
        margin: 55px auto 50px auto;
        border-radius: 3px;
        border: 1px solid #dafafa;
        padding: 10px 15px;
        background-color: #ffffff;
    }
    #login-box:hover{
        box-shadow: #cccccc 5px 10px 20px;
        cursor: pointer;
    }

    #login-btn{
        width: 89px;
        height: 25px;
        text-align: left;
        margin-top: 5px;
        margin-left: 0;
        position: relative;
        left: 135px;
        bottom: 38px;
        margin-bottom: 10px;
        margin-bottom: 0;
    }

    #another-btn{
        width: 244px;
        height: 40px;
        text-align:center;
        margin-top: 4px;
        margin-left: 22px;
        position: relative;
        right: 11px;
        margin-bottom: 4px;
    }

    .toLogin a{
        margin-left: 10px;
        text-decoration: none;
        font-size: 12px;
        color: #666666;
    }
    .form-group{
        margin: 1px 10px;
    }
    .title{
        font-size:15px ;
    }


    .system{
        font-size: 30px;
        margin:3px 18px;
        float: left;
        color:#000000
    }

    .welcome{
        float: right;
        margin-top: 14px;
        font-size: 16px;
    }

.white{
    height: 150px;
}
    .forgetPsd{
        margin-left:22px;
        color: #0f0f0f;
    }

    .register{
        margin-left: 65px;
        color: #0f0f0f;
    }
    .form-group-button{
        width: 5px;
    }
    .small{
        font-size: 13px;
        position: relative;
        left: 5px;
        margin-top: 0;
        padding-top: 20px;
    }
    #remember{
        margin-top: 15px;
        display: none;
    }
    .another-btn{
        width: 244px;
        height: 40px;
        text-align:center;
        margin-top: 4px;
        margin-left: 22px;
        position: relative;
        right: 11px;
        margin-bottom: 4px;
    }
    /*#login-container{*/
        /*background: #00b3ee;*/
    /*}*/
</style>