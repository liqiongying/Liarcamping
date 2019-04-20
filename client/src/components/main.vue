<template>
    <div>
        <!--导航-->
        <Header></Header>
        <router-view></router-view>
        <Footer></Footer>
    </div>

</template>

<script>
    import Header from '../components/Header.vue'
    import Footer from '../components/Footer.vue'
    // import KeepAlive from "../../../bower_components/vue/src/core/components/keep-alive";
    export default {
        name: "Main",
        components:{

            Header,
            Footer
        },
    }
</script>

<style scoped>

</style>