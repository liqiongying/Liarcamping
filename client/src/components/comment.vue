<template>


        <div class="row">
            <div class="col-md-3">
                <!--广告位-->
                @@include('include/ads.html')
            </div>
            <div class="col-md-6">
               <!--<cheaterdetail :title="title" :time="time" :description="description" :like_count="like_count" :comment_count="comment_count"-->
               <!--:content_id="content_id" :uid="uid">-->

               <!--</cheaterdetail>-->
                <cheaterdetail :content="cheatercomment">

                </cheaterdetail>
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
            </div>
            <div class="col-md-3">

            </div>
        </div>

</template>

<script>
    import axios from 'axios'
    import hub from '../main'

    import cheaterdetail from '../components/cheater-detail/cheater-detail.vue'
    import {mapGetters,mapActions} from 'vuex'
    import moment from 'moment'
    export default {
        name: "comment",
        computed: {
            ...mapGetters([
                'cheatercomment'
            ]),
            title() {
                return this.cheatercomment.title
            },
            time() {

                return moment(this.cheatercomment.createdAt).format('YYYY-MM-DD HH:mm:ss')
            },
            description() {
                return this.cheatercomment.description
            },
            like_count() {
                return this.cheatercomment.like_count
            },
            comment_count() {
                return this.cheatercomment.comment_count
            },
            content_id() {
                return this.cheatercomment.id
            },
            uid(){
                return this.$cookie.getCookie('uid')
            }
        },
        components: {
            cheaterdetail
        },
        data() {
            return {
                content: '',
                commentcontent:''
                //     {
                //     time:'',
                //     title:'',
                //     description:'',
                //     like_count:'',
                //     comment_count:''
                // }


            }
        },
        created() {
            if (!this.cheatercomment.id) {
                this.$router.push('/index');
                return;
            }
            // console.log(this.cheatercomment);

        },
        methods: {
            // ...mapActions([
            //     'submitComment'
            // ]),
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
                        this.$router.push('/index');
                    }else {
                        alert("很遗憾，评论失败！")
                    }
                })
            },
            // getData() {
            //
            //     var self = this;
            //     hub.$on('content', function (a) {
            //         self.content = a;
            //     });
            //
            // }
        }
    }
</script>

<style scoped>

</style>