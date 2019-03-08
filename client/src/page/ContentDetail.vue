<template>
    <div class="row">
        <div class="col-md-3">
            <!--防骗术-->
            <methods></methods>
        </div>
        <div class="col-md-6">
            <cheater_detail :content="content"></cheater_detail>

        </div>
        <div class="col-md-3">
            <!--广告位-->
            @@include('include/ads.html')
        </div>

    </div>
</template>

<script>
    import cheater_detail from './../components/cheater-detail/cheater-detail'
    import methods from './../components/methods'

    export default {
        name: "ContentDetail",
        components:{
            cheater_detail,
            methods
        },
        created() {
            if (!this.content.id) {
                this.$router.push('/index');
                return;
            }
            console.log(this.content);

        },
        computed:{
            content(){
                return this.$route.query.content;
            }
        }
    }
</script>

<style scoped>

</style>