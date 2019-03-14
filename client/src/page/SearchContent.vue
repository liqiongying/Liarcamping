<template>
    <div>
    <SearchToolBar :search="search"/>

    <div class="row">
            <div class="col-md-3">
                <!--广告位-->

            </div>
            <div class="col-md-6">
                <cheater_detail :content="content"></cheater_detail>

            </div>
            <div class="col-md-3">
                <!--广告位-->

            </div>

    </div>
    </div>
</template>

<script>
    import cheater_detail from './../components/cheater-detail/cheater-detail'
    import SearchToolBar from './../components/SearchToolBar'

    export default {
        name: "SearchContent",
        components:{
            cheater_detail,
            SearchToolBar
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
            },
            search(){
                return this.$route.query.searchText;

            }
        }
    }
</script>

<style scoped>

</style>