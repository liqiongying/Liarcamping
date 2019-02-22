<template>
    <div id="login-container">

        <div id="login-top" class="navbar navbar-default login-top">
            <a class="system">骗子集中营</a>
            <a class="welcome"> 欢迎您！</a>

        </div>

        <div id="login-box" style="margin-top: 150px;height: auto">

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
                this.$router.push('/')
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

                                    this.$router.push('/');
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
    @import "../assets/css/cheater-login.css";
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
</style>