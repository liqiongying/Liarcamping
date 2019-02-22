<template>
    <div id="login_container">
        <div id="login-top" class="navbar navbar-default login-top">
            <a class="system">骗子集中营</a>
            <a class="welcome"> 欢迎您！</a>

        </div>

        <div id="login-box" style="margin-top: 150px;height: auto">

        <!--重置表单-->
        <form method="POST"  @submit.prevent="validateForm">
            <p class="title text-center">重置密码</p>
            <hr style="margin-top: 5px">
            <div class="form-group" >
                <label for="user">邮箱</label>
                <input type="text" class="form-control" id="user"
                       name="reset_email" placeholder="注册时用的邮箱"
                       v-model="reset.email" v-validate="'required|email'"
                       data-vv-validate-on="blur">
                <span v-show="errors.has('reset_email')" class="small" style="color: red">邮箱格式不正确</span>

            </div>

            <!--重置密码-->
            <div class="form-group">
                <label  style="display: block">重置密码:</label>
                <input type="password" class="form-control"
                       placeholder="至少5位密码" v-model="reset.password"
                       v-validate="'required|min:5'" name="min_field" ref="password"
                       data-vv-validate-on="blur" >
                <span v-show="errors.has('min_field')" class="small" style="color: red">密码位数应大于5</span>
            </div>

            <div class="form-group" >
                <input class="form-control" v-validate="'required|confirmed:password'" name="password_confirmation" type="password"
                       placeholder="确认密码" data-vv-validate-on="blur">
                <div v-show="errors.has('password_confirmation')" class="small" style="color: red">
                    <p>密码不一致</p>
                </div>
            </div>
            <!--&lt;!&ndash;邮箱验证&ndash;&gt;-->
            <!--<div class="form-group" >-->
            <!--<label  style="display: block">输入验证码:</label>-->
            <!--<input type="text" class="form-control" name="code" placeholder="验证码"-->
            <!--style="width: 50%;display: inline-block" v-validate="'required|verify|length:6'"-->
            <!--data-vv-validate-on="blur">-->
            <!--<span class="help-block" v-show="errors.has('code')">验证码有误</span>-->
            <!--<button type="button" class="btn btn-default" style="float: right"-->
            <!--@click="register_verify($event)"  >-->
            <!--{{register_show}}-->
            <!--</button>-->
            <!--</div>-->
            <!--邮箱验证-->
            <div class="form-group">
                <label style="display: block">输入验证码:</label>
                <input type="text" class="form-control" name="code" placeholder="验证码"
                       style="width: 50%;display: inline-block" v-validate="'required|verify|length:6'" data-vv-validate-on="blur">
                <span class="help-block" v-show="errors.has('code')">验证码有误</span>
                <button type="button" class="btn btn-default" style="float: right"
                        @click="register_verify($event)"  >
                    {{register_show}}
                </button>
            </div>
            <div class="form-group" >

                <button type="submit" class="form-group form-group-button another-btn">重置</button>

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
        name: "reset",
        created() {
            this.$validator.extend('verify', {
                getMessage: (value) => {
                    if(this.timelength>120){
                        return '验证码失效！'
                    }else
                        return '验证码错误！'
                } ,
                validate: (value, args) => {
                    var nowDate = moment();
                    var timelength=nowDate.diff(this.time,'seconds');
                    console.log(value);
                    console.log(this.code_true);


                    this.timelength=timelength;
                    if(value == this.code_true&&timelength<120){
                        return true;
                    }
                    else
                        return false;
                    // return (value == this.code_true&&this.register_show!="获取验证码") ? true : false;
                }
            }, {
                immediate: false
            });
        },
        data(){
            return{
                reset:{
                    email:'',
                    password:'',
                    status:2
                },

                register_show: '获取验证码',
                code_true:'',
                time:'',
                timelength:''
            }
        },
        methods:{
            register_verify(e) {
                // if(this.login.email!==''){
                // if(this.register.username!==''){

                axios({
                    method: 'post',
                    url: 'http://127.0.0.1:3000/email',
                    data: this.reset
                }).then(data=>{
                    // console.log(data.data);
                    if(!data.code){
                        this.code_true=data.data.code;
                    }if(data.data.success==false){
                        alert(data.data.message);
                    }else{

                        this.time=moment();
                        var time = 120;//定义60秒的倒计时
                        //设置一个定时，一秒执行一次
                        console.log(e.target.textContent);
                        // console.log(e.target.textContent);
                        var mytime = setInterval(function () {
                            subs();
                        }, 1000);

                        function subs() {

                            time--;
                            e.target.textContent = "请" + time + "秒后再试";

                            if (time == 0) {
                                clearInterval(mytime);
                                e.target.textContent = "重新发送验证码";
                                e.target.removeAttribute('disabled');//按键可用

                            } else {
                                e.target.setAttribute('disabled', true);

                            }
                        }

                    }
                });

            },
            validateForm() {
                    this.$validator.validateAll().then((result) => {

                        if (result) {
                            axios({
                                method: 'post',
                                url: 'http://127.0.0.1:3000/reset',
                                data: this.reset
                            }).then(data => {
                                console.log(data);
                                if (data.data.success) {
                                    alert('重置成功');


                                    this.$router.push('/login');
                                }
                            });
                            return;
                        }
                            alert("重置失败！");
                    })
                }
            }

    }
</script>

<style scoped>
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