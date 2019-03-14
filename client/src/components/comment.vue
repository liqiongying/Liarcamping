<template>


        <div class="row">
            <div class="col-md-3">
                <!--广告位-->

            </div>
            <div class="col-md-6">
               <!--<cheaterdetail :title="title" :time="time" :description="description" :like_count="like_count" :comment_count="comment_count"-->
               <!--:content_id="content_id" :uid="uid">-->

               <!--</cheaterdetail>-->
                <cheaterdetail :content="cheatercomment">

                </cheaterdetail>
                <!--<clickComment :content_id="content_id" ></clickComment>-->
            </div>
            <div class="col-md-3">

            </div>
        </div>

</template>

<script>
    import axios from 'axios'
    import hub from '../main'
    import clickComment from '../components/cheater-detail/clickComment.vue'
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
            cheaterdetail,
            clickComment
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