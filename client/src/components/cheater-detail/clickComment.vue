<template>
    <div class="comments">
       <!--发表评论-->
        <div >
                <div style="display: block">
                    <div class="form-group">

                        <textarea class="form-control" placeholder="评价请注意用词" v-model="commentcontent"></textarea>

                    </div>
                    <div class="form-group text-right" style="padding: 15px">
                        <button class="btn btn-default " @click="submitComment">
                            确认并提交
                        </button>
                        <button type="reset" class="btn btn-default "@click="clear">
                            清空
                        </button>

                    </div>

                </div>


            </div>
        <div class="comment-items-wrap">
            <div v-for="item in comments" :key="item.id" class="comment-item">

                <div class="comment-content-wrap">
                        <span class="comment-author-wrap">
                            <a href="javascript:;" class="comment-author">{{ item.username}}</a>
                        </span>
                    <div class="comment-content" v-text="item.content"></div>
                    <div class="comment-footer">
                        <span class="comment-time" >{{item.time}}</span>
                        <a href="javascript:;" class="comment-action-item comment-reply">回复</a>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
    import axios from 'axios'
    import moment from 'moment'
    import Util from '../../api/Util'
    export default {
        name: "clickComment",
        data() {
            return {
                content: '',
                commentcontent:'',
                from:'',
                comments:[]
            }
        },
        props:["content_id"],
        watch:{
            $route(to,from){//监听路径改变
                this.from=from.path;
                // if(to.path=='/uploadtails'){
                //     this.$store.dispatch('hideHeader');
                // }
            }
        },
        created(){
            if (!this.content_id) {
                this.$router.push('/index');
                return;
            }
            this.getData();
        },
        computed:{
            time() {
                console.log(this.item);
                return moment(this.item.createdAt).format('YYYY-MM-DD HH:mm:ss')
            },
        },
        methods:{
            clear(){
              this.commentcontent="";
            },
            getData(){
                console.log(this.content_id);
                const result=Util.getComment(this.content_id)
               result.then(data=>{
               console.log(data.data.data);
               if(data.data.code===200){
                   this.comments=data.data.data;

               }
           })
            },
            submitComment(){
                var uid=this.$cookie.getCookie('uid');
                // console.log(uid);
                if(uid===''){
                    alert("请先登录哦！");
                    this.$router.push("/login");

                    return;

                }
                // alert(this.content_id);
                if(this.commentcontent===''){
                    alert("评论不能为空!");
                    // Util.showMsg('请输入评论内容!');
                    // this.$root.$refs.toastr.e("ERRROR MESSAGE");
                    return;
                }
                axios({
                    method: 'post',
                    url: 'http://127.0.0.1:3000/contentcomment',
                    data: {
                        content_id:this.content_id,
                        uid:uid,
                        content:this.commentcontent
                    }}).then(({data})=>{
                    // console.log(data.code);

                    if(data.code===1){
                        alert("评论成功");
                        // console.log(data);
                        this.comments=data.data;
                        this.commentcontent='';
                        // this.$router.go(-1);
                    }else {
                        alert("很遗憾，评论失败！")
                    }
                })
            }
        }
    }
</script>

<style scoped>

    .comments .comment-item {
        padding: 18px 0;
    }
    .comments .comment-item .comment-author-wrap {
        color: #888;
        display: block;
        line-height: 1;
        margin-top: 1px;
    }
    a {
        color: #3aced5;
        text-decoration: none;
    }

    .comments .comment-item .comment-content {
        margin-top: 5px;
    }
    .comments .comment-item .comment-footer {
        color: #888;
        font-size: 14px;
        line-height: 1;
        margin-top: 6px;
    }
   .comment-time {
        padding-right: 5px;
    }
    .comments .comment-item .comment-action-item {
        color: #888;
    }
</style>