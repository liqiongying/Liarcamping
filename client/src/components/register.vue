<template>
    <div id="login-container">

        <div id="login-top" class="navbar navbar-default login-top">
            <a class="system">骗子集中营</a>
            <a class="welcome"> 欢迎您！</a>

        </div>

        <div id="login-box" style="margin-top: 100px; height: auto">

            <!-- 将form表单提交的窗口指向隐藏的ifrmae,并通过ifrmae提交数据。 -->
            <form method="POST" name="formphp" target="formsubmit"
                  @submit.prevent="validateBeforeSubmit">
                <p class="title text-center">欢迎注册</p>
                <hr style="margin-top: 5px">
                <div class="form-group">
                    <label for="user">用户名</label>
                    <input type="text" class="form-control"
                           name="username" id="user" placeholder="你的昵称"
                           v-model="register.username" v-validate="'required|max:32'"
                           data-vv-validate-on="blur">
                    <span v-show="errors.has('username')" class="small" style="color: red">请输入用户名,字符不超过32位</span>

                </div>
                <div class="form-group">
                    <label for="pass" style="display: block">密码:</label>
                    <input type="password" class="form-control"
                           id="pass" placeholder="至少5位密码" v-model="register.password"
                           v-validate="'required|min:5|max:32'" data-vv-as="field" name="min_field"
                           data-vv-validate-on="blur"  ref="password">
                    <span v-show="errors.has('min_field')" class="small" style="color: red">密码位数应大于5,小于32</span>
                        <!--style="width: 50%;display: inline-block">-->
                    <!--<button type="button" class="btn btn-default" style="float: right">-->
                    <!--获取验证码-->
                    <!--</button>-->
                </div>

                <div class="form-group">
                    <input class="form-control" v-validate="'required|confirmed:password'" name="password_confirmation" type="password"
                            placeholder="确认密码" data-vv-as="password" data-vv-validate-on="blur">
                    <div v-show="errors.has('password_confirmation')" class="small" style="color: red">
                        <p>密码不一致</p>
                    </div>
                </div>
                <!--邮箱-->
                <div class="form-group">
                    <label for="user">邮箱</label>
                    <input type="text" class="form-control remuser"
                           name="email"  placeholder="邮箱 " v-model="register.email"
                           v-validate="'required|email'" data-vv-validate-on="blur"
                           >
                    <span v-show="errors.has('email')" class="small" style="color: red">邮箱格式不正确</span>
                </div>
                <!--邮箱验证-->
                <div class="form-group">
                    <label for="pass" style="display: block">输入验证码:</label>
                    <input type="text" class="form-control" name="code" placeholder="验证码"
                           style="width: 50%;display: inline-block" v-validate="'required|verify|length:6'" data-vv-validate-on="blur">
                    <span class="help-block" v-show="errors.has('code')">验证码错误</span>
                    <button type="button" class="btn btn-default" style="float: right"
                            @click="register_verify($event)"  >
                        {{register_show}}
                    </button>
                </div>

                <div class="form-group small">
                    <p>点击登录即表示，您同意我们的<a href="">服务条款</a>。</p>
                </div>

                <div class="another">

                    <button type="submit" class="form-group form-group-button" id="another-btn" >注册</button>

                </div>
                <!--<div>{{errors.all()}}</div>-->
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
                    // console.log(this.time);
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
        name: "register",
        data() {
            return {
                register: {
                    username: '',
                    password: '',
                    email: '',
                    status:1
                },
                register_show: '获取验证码',
                code_true:'',
                time:'',
                timelength:''
            }
        },
        methods: {
            validateBeforeSubmit() {
                // console.log(result);
                this.$validator.validateAll().then((result) => {
                    if (result) {
                        // eslint-disable-next-line
                        axios({
                            method: 'post',
                            url: 'http://127.0.0.1:3000/register',
                            data: this.register
                        }).then(data=>{
                            if(data.data.success){
                                alert('注册成功');
                                // console.log(data.data.success);
                                this.$router.push('/login');
                            }
                        });
                        return;
                    }
                    console.log(result);
                    alert('注册有误，请仔细检查！');
                });
            },
            register_verify(e) {
                if(this.register.email!==''){
                    if(this.register.username!==''){
                        axios({
                            method: 'post',
                            url: 'http://127.0.0.1:3000/email',
                            data: this.register
                        }).then(data=>{
                            // console.log(data.data);
                            if(!data.code){
                                this.code_true=data.data.code;
                            }if(data.data.success==false){
                                alert(data.data.message);
                            }else{

                                this.time=moment();
                                var time = 60;//定义60秒的倒计时
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
                                        e.target.textContent = "发送验证码";
                                        e.target.removeAttribute('disabled');//按键可用

                                    } else {
                                        e.target.setAttribute('disabled', true);

                                    }
                                }

                            }
                        });




                    }else alert("请输入用户名")

                }
                else alert("请输入邮箱");

            }
        }
    }
</script>

<style scoped>

</style>