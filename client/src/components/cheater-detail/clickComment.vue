<template>
    <div  class="panel panel-default">
        <div class="panel-heading">
            <h3 class="panel-title" >
                评论
            </h3>
        </div>
        <div class="panel-body">
            <div style="display: block">
                <div class="form-group">

                    <textarea class="form-control" placeholder="评价请注意用词" v-model="commentcontent"></textarea>

                </div>
                <div class="form-group text-right" style="padding-right: 15px">
                    <button class="btn btn-default " @click="submitComment">
                        确认并提交
                    </button>
                    <button type="reset" class="btn btn-default ">
                        清空
                    </button>

                </div>

            </div>


        </div>
    </div>

</template>

<script>
    import axios from 'axios'

    export default {
        name: "clickComment",
        data() {
            return {
                content: '',
                commentcontent:'',
                from:''

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
        methods:{
            submitComment(){
                // alert(this.content_id);
                if(this.commentcontent==''){
                    alert("评论不能为空!");
                    return;
                }
                axios({
                    method: 'post',
                    url: 'http://127.0.0.1:3000/contentcomment',
                    data: {
                        content_id:this.content_id,
                        uid:this.$cookie.getCookie('uid'),
                        content:this.commentcontent
                    }}).then(({data})=>{
                    if(data.code==1){
                        alert(data.data);

                        this.$router.go(-1);
                    }else {
                        alert("很遗憾，评论失败！")
                    }
                })
            }
        }
    }
</script>

<style scoped>

</style>