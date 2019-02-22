<template>
    <div class="loading">
        <img src="../assets/img/loading.gif" height="90" width="89"/>
        <p class="desc">{{title}} </p>
    </div>
</template>

<script>
    export default {
        name: "loading",
        props:{
            title:{
                type:String,
                default:'正在加载...'
            }
        }
    }
</script>

<style scoped>
.loading{
    width: 100%;
    text-align: center;
}
    .desc{
        line-height: 20px;
    }
</style>