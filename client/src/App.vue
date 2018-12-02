<template>
  <div class="all-container" id="app">
    <div class="main-content">
      <!--导航-->
    <Header></Header>
      <!--巨幕-->
      <div class="jumbotron"id="shouttitle">
        <h1>你的曝光将挽救更多人的损失</h1>
        <p>骗子防不胜防，我们的初衷是曝光骗子，让骗子无处可逃，挽救损失！</p>
        <p><a class="btn btn-primary btn-lg" href="cheater-showcheater.html" role="button">立即曝光</a></p>
      </div>

      <!--分享-->
      <div class="panel panel-default">
        <div class="panel-body" id="share">
          让骗子不再得逞，让更多的人知道我们吧

          <!--分享图标-->
          <button type="button" class="btn btn-default" aria-label="Left Align">
            <span class="glyphicon glyphicon-share" aria-hidden="true"></span>
          </button>
        </div>
      </div>

      <!--下面展示-->
      <div class="row">
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
        <div class="col-md-9">

          <!--个人曝光总海报-->


          <div class="page-header"
               style=" background: #fad3d3;
                padding-top: 9px;
                text-align: center;
                margin-top: 0px">
            <h1>骗子展示 <small>
              <a style="float: right;
                    color: #0f0f0f;
                    margin-top: 20px;"
                 href="cheater-searchcontent.html">更多>>></a></small></h1>
          </div>
          <!--曝光1-->
          <div class="panel panel-default showcheater"
               v-for="content of contents" :key="content.id">

            <div class="panel-body card" >

              <div class="panel-heading">
                <h3 class="panel-title">
                  {{content.title}}
                </h3>
              </div>
              <hr style="margin-bottom: 0px;
                            margin-top: 0px">

              <div class="form-group "
                   style="padding: 15px 0px 0px;
                            margin-bottom: 0px;">
                <button type="submit" class="btn btn-default ">
                  {{content.create_time}}
                </button>
                <button type="reset" class="btn btn-default" style="float: right">
                  分享
                </button>

              </div>
              <div class="panel-body" style="padding: 15px 0px 0px">
                <a class="list-group-item" style="height: auto" href="cheater-content.html">
                  {{content.summary}}
                </a>


                <div class="form-group " style=" margin: 20px 0px 0px;">
                  <a  class="list-group-item col-md-1" style="display: inline;margin-bottom: 0px;text-align: center">
                    点赞({{content.like_count}})
                  </a>

                  <a href="cheater-comment.html" class="list-group-item col-md-1"
                     style="display: inline;float: right;text-align: center">评论({{content.comment_count}})</a>

                </div>
              </div>

            </div>

          </div>
          <!--分页-->
          <div>
            <nav class="text-center">
              <ul class="pagination">
                <li @click="getData(Math.max(1,this_page-1))" :class="{'disabled':this_page==1}">
                  <a href="#" aria-label="Previous">
                    <span aria-hidden="true">&laquo;</span>
                  </a>
                </li>
                <li v-for="p of pages" :class="{'active':p==this_page}"
                :key="p"
                @click="getData(p)">
                  <span>{{p}}</span>
                </li>

                <li @click="getData(Math.min(pages,this_page+1))" :class="{'disabled':this_page==pages}">
                  <a href="#" aria-label="Next">
                    <span aria-hidden="true">&raquo;</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>


        </div>
      </div>
      <div>


      </div>
      <!--底部-->
      <Footer></Footer>
    </div>
  </div>
</template>

<script>
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
import axios from 'axios'


export default {
  name: 'app',
  components: {
      Header,
      Footer
  },
    data(){
      return{
          this_page:1,//当前页
          pages:1,
          per_page:3,//每页显示3条
          count:0,
          contents:[]
      }
    },
  created(){
      this.getData();
  },
    methods:{
      getData(p){
          if(p==this.this_page)
              return;
          this.this_page=p||this.this_page;
          // this.this_page=Math.max(1,this.this_page);//让页数最小值为1
          // this.this_page=Math.min(this.pages,this.this_page);
          axios({
              method:'get',
              url:'http://127.0.0.1:3000',
              params:{
                  this_page:this.this_page
              }
          }).then(rs=>{
              if(!rs.code){
                  this.count=rs.data.count;
                  this.per_page=rs.data.per_page;
                  this.pages=Math.ceil(this.count/this.per_page);
                  this.contents=rs.data.data;

              }
          })
      }
    }
}
</script>
