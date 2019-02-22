<template>
  <div class="all-container">
    <div class="main-content">

            <router-view></router-view>

    </div>
  </div>
</template>

<script>
export default {
  name: 'app',

    watch:{
      $route(to,from){//监听路径改变
          // console.log(to.path);
          // if(to.path=='/uploadtails'){
          //     this.$store.dispatch('hideHeader');
          // }
      }
    }
}
</script>
