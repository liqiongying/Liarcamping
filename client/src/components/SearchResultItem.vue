<template>
    <div>

    <div  class="panel panel-default search-result-item" >
        <div class="panel-body card" >

            <div class="panel-heading">
                <router-link class="panel-title title" :to="{path:'/SearchContent',query:{content:info,searchtext:search}}">
                    {{info.title}}
                </router-link>
                <span class="name">骗子：{{info.cheater_name}}</span>
            </div>
            <hr style="margin-bottom: 0px;
                            margin-top: 0px">


            </div>
            <div class="panel-body" style="padding: 15px 0px 0px">
                <div class="list-group-item summary" style="height: auto" href="cheater-content.html">
                    {{info.summary}}
                </div>
                <div class="time">
                    {{time}}
                </div>
            </div>

        </div>

        <!--<a class="search-result-item-link" >-->
        <!--<div class="title">{{info.title}}</div>-->
        <!--<div class="cheater">-->
            <!--<span class="pianzi">骗子：</span>-->
            <!--<span class="name">{{info.cheater_name}}</span>-->
            <!--<span class="time">{{time}}</span>-->
        <!--</div>-->
        <!--<div class="summary">{{info.summary}}</div>-->
        <!--</a>-->
    </div>
</template>

<script>
    const moment = require('moment');
    export default {
        name: "SearchResultItem",
        props:["info","search"],
        computed:{
            time(){
                return moment(this.info.createdAt).format('YYYY-MM-DD HH:mm:ss')
            }
        }
    }
</script>

<style scoped>

div.search-result-item:hover{
    /*background-color: #fff;*/
    /*cursor: pointer;*/
    /*background: grey;*/
    /*padding: 20px;*/
    /*text-align: left;*/
    /*display: inline-block;*/
}
.title:hover{
    color:#00b3ee;
    text-decoration: none;
    cursor: pointer;
}
.search-result-item{
    color: #555
}

.cheater{
    text-align: right;
}
    .title{
        display: inline-block
        /*color: #333;*/
        /*font-size: 1.3em;*/
    }
    .time{
        text-align: right;
        padding-right: 15px;
    }
.name{
    position:absolute;
    right: 35px;
}
.summary{
    /*color: #333;*/
    border: none;
}
    .pianzi{
        color: #333;

    }
</style>