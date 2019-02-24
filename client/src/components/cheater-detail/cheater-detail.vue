<template>
    <div>
        <div class="panel panel-default" >
            <div class="panel-heading">
                <h3 class="panel-title" >
                    {{content.title}}
                </h3>
            </div>
            <div class="form-group " style="padding-top: 15px">
                <button  class="btn btn-default " >
                    {{time}}
                </button>
                <button  class="btn btn-default" style="float: right">
                    分享
                </button>

            </div>
            <div class="panel-body">
                <div style="height: auto;line-height: 1.6;" >
                    {{content.description}}
                </div>



            </div>
            <div class="form-group "v-if="!ifcomment" >
                <button type="button" class="btn btn-default " @click="love(content_id,uid)">
                    点赞({{content.like_count}})
                </button>
                <button type="button" class="btn btn-default" style="float: right"@click="click_comment(content_id,uid)">
                    评论({{content.comment_count}})
                </button>
            </div>
        </div>
        <clickComment v-if="show" :content_id="content_id"></clickComment>
    </div>
</template>

<script>
    import axios from 'axios'
    const moment = require('moment');
    import Util from './../../api/Util'
    import mydialog from './../../base/login'
    import clickComment from './clickComment'

    export default {
        name: "cheater-detail",
        props:["content"],
        components:{
          clickComment
        },
        computed:{
            uid(){
                return this.$cookie.getCookie('uid')
            },
            time(){
                return moment(this.content.createdAt).format('YYYY-MM-DD HH:mm:ss')
            },
            content_id(){
                return this.content.id;
            }
        },
        data(){
            return {
                ifcomment:false,
                show:false,
                nologin:true
            }
        },
        watch:{
            $route(to,from){//监听路径改变
                // console.log(to.path);
                if(to.path=='/comment'){
                    this.ifcomment=true;
                }
            }
        },
        methods:{
            love(content_id,uid){
                const result=Util.love(content_id,uid);
                result.then(({data})=>{
                    if(data.code==1) {
                        alert("点赞成功！");
                        if (this.content_id == data.data.id) {
                            this.like_count = data.data.like_count;
                        }
                    }else if(data.code==0){
                        alert(data.data);
                        this.$router.push('/login');
                    }else{
                        alert(data.data);
                    }
                });

            },
            click_comment(content_id,uid){
                const result=Util.comment(content_id,uid);
                result.then(({data})=>{
                    if(data.code==1){
                        if(this.ifcomment){
                            this.show=false;
                        }else{
                            this.show=true;

                        }
                    }else if(data.code==0){
                        alert(data.data);
                        this.$router.push('/login');
                    }else{
                        alert(data.data);

                    }
                })

            }
        }
    }
</script>

<style scoped>

</style>