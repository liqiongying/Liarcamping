<template>
    <div>
        <nav class="navbar navbar-default">
            <div class="container-fluid">
                <!-- Brand and toggle get grouped for better mobile display -->
                <div class="navbar-header " >

                       <span class="navbar-brand" @click="goHome">骗子集中营</span>
                </div>

                <!-- Collect the nav links, forms, and other content for toggling -->
                <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                    <form class="navbar-form navbar-left">
                        <div class="form-group">
                            <input  v-model="search" @keydown.enter="doSearch" class="form-control" placeholder="查找骗子">
                        </div>
                        <button @click="doSearch" class="btn btn-default">
                            搜索</button>
                    </form>
                </div><!-- /.navbar-collapse -->
            </div><!-- /.container-fluid -->

        </nav>

        </div>
</template>

<script>
    import Util from './../api/Util'

    export default {
        name: "SearchToorBar",
        props:['search'],
        methods:{
            doSearch(){
                Util.searchAPI(this.$router,this.search);
            },
            goHome(){
                this.$router.push("/index");
            }
        }
    }
</script>

<style scoped>

</style>