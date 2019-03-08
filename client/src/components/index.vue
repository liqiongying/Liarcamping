<template>

   <div>
       <!--巨幕-->
       <div class="jumbotron"id="shouttitle">
           <h1>你的曝光将挽救更多人的损失</h1>
           <p>骗子防不胜防，我们的初衷是曝光骗子，让骗子无处可逃，挽救损失！</p>
           <p><button class="btn btn-primary btn-lg" role="button" @click="show">立即曝光</button></p>
       </div>

       <!--分享-->
       <social-sharing url="https://vuejs.org/"
                       title="骗子集中营"
                       description="Intuitive, Fast and Composable MVVM for building interactive interfaces."
                       quote="Vue is a progressive framework for building user interfaces."
                       hashtags="vuejs,javascript,framework"
                       twitter-user="vuejs"
                       v-cloak inline-template>
           <div class="panel panel-default">
               <div class="panel-body" id="share">
                   让骗子不再得逞，让更多的人知道我们吧

                   <!--分享图标-->
                   <span style="cursor: pointer"><network  network="weibo" id="weibo">
                           <i class="fa fa-fw fa-weibo"></i> Weibo
                       </network>
                   </span>
                   <span style="cursor: pointer">
                   <network network="email" id="email">
                       <i class="fa fa-fw fa-envelope"></i> Email
                   </network>
                   </span>
                   <span style="cursor: pointer;">
                   <network  network="facebook" id="facebook">
                       <i class="fa fa-fw fa-facebook"></i> Facebook
                   </network>
                   </span>
               </div>

           </div>
       </social-sharing>

       <!--下面展示-->
       <div class="row">
           <div class="col-md-3" style="position: relative">
               <!--防骗术-->
            <methods></methods>
               <!--广告位-->
           </div>
           <div class="col-md-9">

               <!--个人曝光总海报-->


               <div class="page-header"
                    style=" background: #fad3d3;
                padding-top: 9px;
                text-align: center;
                margin-top: 0px">
                   <h1>骗子展示 <small>
                       <a style="float: right;
                    color: #0f0f0f;
                    margin-top: 20px;"
                          href="cheater-searchcontent.html">更多>>></a></small></h1>


               </div>
               <!--曝光1-->
               <div class="panel panel-default showcheater"
                    v-for="content of contents" :key="content.id">

                   <div class="panel-body card" >

                       <div class="panel-heading">
                           <router-link :to="{path:'/ContentDetail',query:{content:content}}"
                            class="panel-title " style="white-space : nowrap;overflow: hidden;text-overflow : ellipsis">
                               {{content.title}}
                           </router-link>
                       </div>
                       <hr style="margin-bottom: 0px;
                            margin-top: 0px">

                       <div class="form-group "
                            style="padding: 15px 0px 0px;
                            margin-bottom: 0px;">
                           <button type="submit" class="btn btn-default ">
                               {{content.create_time}}
                           </button>
                           <!--<button type="reset" class="btn btn-default" style="float: right">-->
                               <!--分享-->
                           <!--</button>-->

                       </div>
                       <div class="panel-body" style="padding: 15px 0px 0px">
                           <a class="list-group-item" style="height: auto" >
                               {{content.summary}}
                           </a>


                           <div class="form-group " style=" margin: 20px 0px 0px;">
                               <a  class="list-group-item col-md-1"
                                   style="display: inline;margin-bottom: 0px;text-align: center"
                                   @click="like(content.id)">
                                   点赞({{content.like_count}})
                               </a>

                               <a href="javascript:;" class="list-group-item col-md-1"
                                  style="display: inline;float: right;text-align: center" @click="comment(content.id,content)">评论({{content.comment_count}})</a>

                           </div>
                       </div>

                   </div>

               </div>
               <!--正在加载-->
               <div class="loading-container" v-show="!contents.length">
                   <loading></loading>
               </div>
               <!--分页-->
               <div v-show="contents.length">
                   <nav class="text-center">
                       <ul class="pagination">
                           <li @click="getData(Math.max(1,this_page-1))" :class="{'disabled':this_page==1}">
                               <a href="#" aria-label="Previous">
                                   <span aria-hidden="true">&laquo;</span>
                               </a>
                           </li>
                           <li v-for="p of pages" :class="{'active':p==this_page}"
                               :key="p"
                               @click="getData(p)">
                               <span style="cursor: pointer">{{p}}</span>
                           </li>

                           <li @click="getData(Math.min(pages,this_page+1))" :class="{'disabled':this_page==pages}">
                               <a href="#" aria-label="Next">
                                   <span aria-hidden="true">&raquo;</span>
                               </a>
                           </li>
                       </ul>
                   </nav>
               </div>


           </div>
       </div>
       <div>


       </div>
   </div>


</template>

<script>
    import axios from 'axios'
    import methods from './methods'

    import Loading from '../base/loading'
    import {mapMutations} from 'vuex'
    export default {
        name: "index",
        components:{
            Loading,methods
        },
        data(){
            return{
                this_page:1,//当前页
                pages:1,
                per_page:3,//每页显示3条
                count:0,
                contents:[]
            }
        },
        created(){
            this.getData();

        },
        methods:{
            getData(p){
                if(p==this.this_page)
                    return;
                this.this_page=p||this.this_page;
                // this.this_page=Math.max(1,this.this_page);//让页数最小值为1
                // this.this_page=Math.min(this.pages,this.this_page);
                axios({
                    method:'get',
                    url:'http://127.0.0.1:3000/',
                    params:{
                        this_page:this.this_page
                    }
                }).then(rs=>{
                    if(!rs.code){
                        this.count=rs.data.count;
                        this.per_page=rs.data.per_page;
                        this.pages=Math.ceil(this.count/this.per_page);
                        this.contents=rs.data.data;
                        // console.log(rs.data.data);
                        // this.setContent(rs.data.data);
                    }
                })
            },
            like(content_id){
            axios({
                method: 'post',
                url: 'http://127.0.0.1:3000/like',
                data: {
                    content_id:content_id,
                    uid:this.$cookie.getCookie('uid')
                },
                xhrFields:{withCredentials:true},
                crossDomain: true
            }).then(({data})=>{
            // console.log(data);
                if(data.code===1){
                    alert("点赞成功！");
                    this.contents.forEach(content=>{
                        if(content.id==data.data.id){
                            content.like_count=data.data.like_count;
                        }
                    });

                }else{
                    if(data.code===0){
                        alert(data.data);
                    this.$router.push("/login");
                    }
                    alert(data.data);
                }
            })
            },
            comment(content_id){
                axios({
                    method: 'post',
                    url: 'http://127.0.0.1:3000/comment',
                    data: {
                        content_id:content_id,
                        uid:this.$cookie.getCookie('uid')
                    }}).then(({data})=>{
                        if(data.code==1){
                            this.$router.push('/comment');
                            this.setCheater(data.data);
                            // hub.$emit('content',data.data);
                            // console.log(data.data);
                        }else {
                            alert(data.data);
                        }
                })
            },
            show(){
                if(this.$cookie.getCookie('uid')){
                    this.$router.push('/uploadtails');
                }else{
                    alert("还未登陆，不能曝光哦！");
                }
            },
            ...mapMutations({
                setCheater: 'SET_CHEATER'
                // setContent: 'SET_CONTENT'
            })
        }
    }
</script>

<style scoped>
.net{
    cursor:pointer;
}
.loading-container{
    position: absolute;
    width: 100%;
    top:250%;
    height: auto;
    transform: translateY(-150%);
    margin-bottom: 50px;
}
</style>