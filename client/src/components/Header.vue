<template>
<header>

    <nav class="navbar navbar-default">
        <div class="container-fluid">
            <!-- Brand and toggle get grouped for better mobile display -->
            <div class="navbar-header">
                <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                    <span class="sr-only">Toggle navigation</span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>
                <a class="navbar-brand" href="cheater-index.html">
                    骗子集中营</a>
            </div>

            <!-- Collect the nav links, forms, and other content for toggling -->
            <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                <ul class="nav navbar-nav ">
                    <li class="active " id="tagline">让骗子无处可逃 <span class="sr-only">(current)</span></li>
                    <!--<li><a href="#">Link</a></li>-->
                    <li class="dropdown header-title">
                        <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">曝光骗子</a>
                    </li>
                </ul>
                <form class="navbar-form navbar-left">
                    <div class="form-group">
                        <input  v-model="searchText" @keydown.enter="doSearch" class="form-control" placeholder="查找骗子">
                    </div>
                    <button @click="doSearch" class="btn btn-default">
                        搜索</button>
                </form>
                <ul class="nav navbar-nav navbar-left">
                    <li>
                        <button type="button" class="btn btn-default" data-toggle="modal" data-target="#helpModal"
                                style="padding: 5px;font-size: 15px;text-align: center;margin-top: 8px;">
                            求助
                        </button>
                    </li>
                </ul>
                <ul class="nav navbar-nav navbar-right" v-if="!login">


                    <li><a><router-link to="/login">登陆</router-link></a></li>
                    <!--<li class="dropdown">-->
                    <!--<a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Dropdown <span class="caret"></span></a>-->
                    <!--<ul class="dropdown-menu">-->
                    <!--<li><a href="#">Action</a></li>-->
                    <!--<li><a href="#">Another action</a></li>-->
                    <!--<li><a href="#">Something else here</a></li>-->
                    <!--<li role="separator" class="divider"></li>-->
                    <!--<li><a href="#">Separated link</a></li>-->
                    <!--</ul>-->
                    <!--</li>-->
                </ul>
                <ul class="nav navbar-nav navbar-right" v-if="login">


                    <!--<li><a><router-link to="/login">{{name}}</router-link></a></li>-->
                    <li class="dropdown">
                    <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">{{name}} <span class="caret"></span></a>
                    <ul class="dropdown-menu">
                    <li><a data-toggle="modal" data-target="#modify">修改用户信息</a></li>
                    <li><a data-toggle="modal" data-target="#delete_user">注销账户</a></li>
                    <li role="separator" class="divider"></li>
                    <li @click="quit"><a>退出登陆</a></li>
                    </ul>
                    </li>
                </ul>

            </div><!-- /.navbar-collapse -->
        </div><!-- /.container-fluid -->
    </nav>

    <!--<div v-if="Filter.length==0">抱歉，尚没有该骗子的信息</div>-->

    <!--点击注销用户弹出模态框-->

    <div class="modal fade" id="delete_user" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                    <h4 class="modal-title" >注意</h4>
                </div>
                <div class="modal-body">
                    注销该账户将删除您的用户名，密码，邮箱。
                    确认要注销该账户吗？
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
                    <button type="button" class="btn btn-primary" @click="delete_user" data-dismiss="modal">确定注销</button>
                </div>
            </div>
        </div>
    </div>

    <!--点击修改用户弹出模态框-->

    <div class="modal fade" id="modify" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                    <h4 class="modal-title" >修改用户信息</h4>
                </div>
                <div class="modal-body">
                    <form method="POST">
                        <div class="form-group">
                            <label for="user">用户名</label>
                            <input type="text" class="form-control"
                                   name="username" id="user" placeholder="你的昵称"
                                   v-model="modify.username" v-validate="'required|max:32'"
                                   data-vv-validate-on="blur">
                            <span v-show="errors.has('username')" class="small" style="color: red">请输入用户名,字符不超过32位</span>

                        </div>
                        <div class="form-group">
                            <label for="pass" style="display: block">密码:</label>
                            <input type="password" class="form-control"
                                   id="pass" placeholder="至少5位密码" v-model="modify.password"
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
                        <!--<div>{{errors.all()}}</div>-->
                    </form>

                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
                    <button type="button" class="btn btn-primary" @click="modify_user" data-dismiss="modal">确定修改</button>
                </div>
            </div>
        </div>
    </div>

    <!--点击求助出现模态框-->
    <!-- Button trigger modal -->


    <!-- Modal -->
    <div class="modal fade" id="helpModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                    <h4 class="modal-title" id="myModalLabel">求助须知</h4>
                </div>
                <div class="modal-body">
                    求助是向警方或个人悬赏获得帮助从而挽救损失，服务费5元。<br/>
                    悬赏金额为受骗金额的10%，求助成功后，将收取平台服务费，为悬赏金额的2%。
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                    <a href="cheater-help.html"><button type="button" class="btn btn-primary" >确定求助</button></a>
                </div>
            </div>
        </div>
    </div>
</header>

</template>

<script>
    import {mapMutations} from 'vuex';
    import axios from 'axios';
    import Util from './../api/Util';

    export default {
        name: "Header",

        data() {
            return {
                delete_u: {
                    username: ''
                },
                name: '',
                login: false,
                modify: {
                    username: '',
                    password: '',
                    oldname: ''
                },
                searchText:''
            }
        },
        // computed:{
        //     Filter(){
        //         return this.search.length ?this.filter:this.filter;
        //     }
        // },
        mounted(){
            /*页面挂载获取保存的cookie值，渲染到页面上*/
            let uname = this.$cookie.getCookie('username');
            this.name = uname;
            /*如果cookie不存在，则跳转到登录页*/
            if(uname == ""){
                this.login=false;
            }
            else
                this.login=true;
        },
        methods:{
            ...mapMutations({
                setContent: 'SET_CONTENT'
            }),
            doSearch(){
                Util.searchAPI(this.$router,this.searchText);
            },
            modify_user(){
                this.modify.oldname=this.name;
                this.$validator.validateAll().then((result) => {
                    if (result) {
                        // eslint-disable-next-line
                        axios({
                            method: 'post',
                            url: 'http://127.0.0.1:3000/modify',
                            data: this.modify
                        }).then(data=>{
                            if(data.data.success){
                                alert('修改成功');
                                this.$cookie.delCookie('username');
                                this.$cookie.setCookie('username',data.data.username,60*60);
                                // console.log(data.data.username);
                                this.name=data.data.username;
                            }else
                                alert('修改失败');
                        });
                        return;
                    }
                    console.log(result);
                    alert('注册有误，请仔细检查！');
                });

            },
            delete_user(){
                this.delete_u.username=this.name;
                axios({
                    method:'post',
                    url: 'http://127.0.0.1:3000/delete',
                    data:this.delete_u
                }).then(data=>{
                    if(data.data.success){
                      alert(data.data.message);
                        this.login=false;
                        this.$cookie.delCookie('username');
                        this.$cookie.delCookie('uid');

                        this.$router.push('/login');
                    }
                    else
                        alert(data.data.message);

                })
            },
            quit(){
                alert("退出登录");
                this.login=false;
                this.$cookie.delCookie('username');
                this.$cookie.delCookie('uid');

                // console.log(this.name);
                this.$router.push('/login');
            }
        }

    }
</script>

<style scoped>

</style>