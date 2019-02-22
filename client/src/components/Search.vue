<template>
    <div>
        <SearchToolBar :search="search"/>

        <div class="col-md-9" style="position: relative" >
            <div v-if="result">抱歉，尚没有该骗子的信息</div>
            <div v-for="info in searchResultList" :key="info.id" >
                <SearchResultItem :info="info" :search="search" />
            </div>
            <!--正在加载-->
            <div class="loading-container" v-show="isShowLoading">
                <loading></loading>
            </div>


        </div>
        <div class="col-md-3" style="position: relative">
            <!--防骗术-->
            <div class="panel panel-default showmethod">

                <div class="panel-heading">你应该知道的防骗术</div>
                <!--<div class="panel-body">

                </div>-->
                <div class="list-group">
                    <a href="cheater-content.html" class="list-group-item">
                        Cras justo odio
                    </a>
                    <a href="cheater-content.html" class="list-group-item">Dapibus ac facilisis in</a>
                    <a href="cheater-content.html" class="list-group-item">Dapibus ac facilisis in</a>
                    <a href="cheater-content.html" class="list-group-item">Dapibus ac facilisis in</a>

                    <a href="cheater-content.html" class="list-group-item">Dapibus ac facilisis in</a>
                    <a href="cheater-content.html" class="list-group-item">Morbi leo risus</a>
                    <a href="cheater-content.html" class="list-group-item">Porta ac consectetur ac</a>
                    <a href="cheater-content.html" class="list-group-item">Vestibulum at eros</a>
                </div>
            </div>
            <!--广告位-->
            @@include('include/ads.html')
        </div>


    </div>

</template>

<script>
    import Loading from '../base/loading'
    import Util from './../api/Util'
    import SearchToolBar from './SearchToolBar'
    import SearchResultItem from './SearchResultItem'
    import {mapGetters,mapActions,mapMutations} from 'vuex'
    export default {
        computed:{
            ...mapGetters([
                'content'
            ]),
            search(){
                return this.$route.params.searchText;
            }
        },
        components:{
            SearchToolBar,
            SearchResultItem,
            Loading
        },
        name: "Search",
        data(){
          return{
              searchResultList:[],
              result:false,
              isShowLoading:true
          }
        },
        beforeRouteUpdate(to,from,next){
            next();
          this.doSearchResult();
        },
        created(){
            this.doSearchResult();
        },
        methods:{
            doSearchResult(){
                const {searchText}=this.$route.params;
                console.log(searchText);
                if(searchText){
                    const result=Util.search(searchText);
                    result.then(val=>{
                        console.log(val.data.result.length);
                        if(val.data.result.length!==0){
                            this.result=false;
                            this.searchResultList=val.data.result;
                            this.isShowLoading=false;
                        }else{
                            // this.searchResultList=val.data.result;
                            this.result=true;
                            this.isShowLoading=false;
                        }
                    })

                }
            }
        }
    }
</script>

<style scoped>

</style>