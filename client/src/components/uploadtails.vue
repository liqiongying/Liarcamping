<template>

        <div class="row">
            <div class="col-md-3">
                <!--广告位-->

            </div>
            <div class="col-md-6">
                <!--曝光个人信息填写-->
                <div class="panel panel-default">
                    <div class="panel-heading">
                        <h3 class="panel-title text-center">
                            骗子信息填写

                        </h3>
                    </div>
                    <div class="panel-body">
                        <div>
                            <form class="form-horizontal" method="post" action="index.vue" enctype="multipart/form-data" @submit="show">

                                <!--标题-->
                                <div class="form-group">
                                    <label for="inputPassword" class="col-sm-4 control-label">
                                        文章标题
                                    </label>
                                    <div class="col-sm-7">
                                        <input name="title"  class="form-control"  placeholder="文章标题(50字以内)"
                                               v-validate="'required|max:50|min:3'" data-vv-validate-on="blur" v-model="cheater.title">
                                        <span v-show="errors.has('title')" class="small" style="color: red">{{errors.first('price')}}标题不能为空，不能超过50字，少于3位数</span>

                                    </div>
                                </div>
                                <!--骗子姓名-->
                                <div class="form-group">
                                    <label for="inputPassword" class="col-sm-4 control-label">
                                        骗子姓名
                                    </label>
                                    <div class="col-sm-7">
                                        <input name="name" class="form-control" id="inputPassword" placeholder="姓名"
                                               v-validate="'required|max:10'" data-vv-validate-on="blur" v-model="cheater.name">
                                        <span v-show="errors.has('name')" class="small" style="color: red">名字不能为空，不能超过10个字</span>

                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="inputPassword" class="col-sm-4 control-label">
                                        所用的联系方式
                                    </label>
                                    <div class="col-sm-7">
                                        <input name="contact" class="form-control"  placeholder="微信号/电话/QQ号"
                                               v-validate="'required|max:50|min:3'" data-vv-validate-on="blur" v-model="cheater.contact">

                                        <span v-show="errors.has('contact')" class="small" style="color: red">联系方式不能为空，不能超过50个字，少于3个字</span>

                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="inputPassword" class="col-sm-4 control-label">
                                        详情描述
                                    </label>
                                    <div class="col-sm-7">
                                        <textarea class="form-control" rows="10" name="tails" placeholder="时间地点起因经过结果，回忆得越详细越好(1万字以内)"
                                                  v-validate="'required|max:10000|min:50'" data-vv-validate-on="blur" v-model="cheater.description">
                                        </textarea>
                                        <span v-show="errors.has('tails')" class="small" style="color: red">故事不能为空，不能超过1万个字，少于50个字</span>

                                    </div>
                                </div>
                                <div class="form-group">
                                    <label  class="col-sm-4 control-label">
                                        损失总金额
                                    </label>
                                    <div class="col-sm-7">
                                        <input name="money" class="form-control"  placeholder="金额(尽量用单位，如10000元写1万元)"
                                               v-validate="'required|max:20|min:2'" data-vv-validate-on="blur" v-model="cheater.money">

                                        <span v-show="errors.has('contact')" class="small" style="color: red">损失金钱不能为空，字数不能超过20位，少于2位</span>

                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="inputPassword" class="col-sm-4 control-label">
                                        上传证据
                                    </label>
                                    <div class="col-sm-7">
                                        <croppa canvas-color="wheat"
                                                v-model="myCroppa1"
                                                :accept="'image/*'"
                                                :file-size-limit="2097152"
                                                @file-type-mismatch="onFileTypeMismatch"
                                                @file-size-exceed="onFileSizeExceed"
                                                :width="198"
                                                :height="198"
                                                placeholder="请点击这里上传" :show-loading="true">
                                        </croppa>

                                        <!--&lt;!&ndash;缩略图&ndash;&gt;-->
                                        <!--<div class="row">-->
                                            <!--<div class="col-xs-6 col-md-3">-->
                                                <!--<label class="thumbnail" for="upload" >-->
                                                    <!--<img  height="258" width="258" :src="src"/>-->

                                                <!--</label>-->
                                                <!--<input type="file" style="display: none" id="upload" multiple class="file"-->
                                                       <!--accept="image/gif,image/jpeg,image/jpg,image/png" @change="uploadfile"/>-->

                                            <!--</div>-->

                                        <!--</div>-->

                                    </div>
                                </div>

                                <!--&lt;!&ndash;奖励金&ndash;&gt;-->
                                <!--<div class="form-group">-->
                                <!--<label  class="col-sm-4 control-label">-->
                                <!--故事奖励金（营子）-->
                                <!--</label>-->
                                <!--<div class="col-sm-7">-->
                                <!--<select name="money" id="money" data-toggle="tooltip" data-placement="top"-->
                                <!--title="用户看您的文章需要的营子"  class="btn btn-default dropdown-toggle">-->
                                <!--<option value="0">免费分享</option>-->
                                <!--<option value="2">2</option>-->
                                <!--<option value="4">4</option>-->
                                <!--<option value="6">6</option>-->
                                <!--<option value="8">8</option>-->
                                <!--<option value="10">10</option>-->

                                <!--</select>-->
                                <!--</div>-->

                                <!--</div>-->
                                <!--概述-->
                                <div class="form-group">
                                    <label for="inputPassword" class="col-sm-4 control-label">
                                        故事概述
                                    </label>
                                    <div class="col-sm-7">
                                        <textarea name="summary" class="form-control" rows="10" placeholder="决定读者是否会阅读全文的内容概述"
                                                  v-validate="'required|max:50|min:2'" data-vv-validate-on="blur"
                                                  v-model="cheater.summary"></textarea>
                                        <span v-show="errors.has('summary')" class="small" style="color: red">故事概述不能为空，字数不能超过50位，少于2位</span>

                                    </div>
                                </div>

                            </form>
                        </div>
                    </div>
                    <div class="panel-footer text-right">
                        <button type="submit" class="btn btn-default " @click="show">
                            确认并提交
                        </button>
                        <button type="reset" class="btn btn-default ">
                            清空
                        </button>


                    </div>
                </div>
            </div>
            <div class="col-md-3">

            </div>
        </div>


</template>

<script>
    import 'vue-croppa/dist/vue-croppa.css'
    import {mapGetters}from 'vuex'
    import axios from 'axios';
import Util from '../api/Util'
    export default {
        data(){
            return {
                // src: require('../assets/img/addfile.png'),
                myCroppa1: {},
                // myCroppa2: {},myCroppa3: {}, myCroppa4: {},myCroppa5: {},myCroppa6: {},
                cheater:{
                    title:'',
                    summary:'',
                    description:'',
                    name:'',
                    money:'',
                    contact:'',
                    proof:[],
                    uid:''

                }

            }
        },
        computed:{
            uid(){
                return this.$cookie.getCookie('uid')
            }
        },
        created() {
            // console.log(this.uid);
            if (!this.uid) {

                this.$router.push('/index');
                return;
            }
            // console.log(this.cheatercomment);

        },

        methods:{
            onFileTypeMismatch (file) {
                alert('文件格式不正确，请选择 jpeg 或png 格式')
            },
            onFileSizeExceed (file) {
                if(file.size>2097152){
                    alert('文件大小不能超过2MB.')

                }
                console.log(file);
            },
            show(){
                this.$validator.validateAll().then((result) => {
                    // console.log(this.cheater);
                    if (result) {
                        console.log(this.uid);

                        this.cheater.uid=this.uid;
                        // eslint-disable-next-line
                        if (!this.myCroppa1.hasImage()) {
                            alert('no image to upload')
                            return
                        }
                        this.myCroppa1.generateBlob((blob) => {
                            // write code to upload the cropped image file (a file is a blob)
                            var fd = new FormData();
                            fd.append('proof', blob,'_proof_'+this.cheater.uid);
                            fd.append('title',this.cheater.title);
                            fd.append('name',this.cheater.name);
                            fd.append('contact',this.cheater.contact);
                            fd.append('description',this.cheater.description);
                            fd.append('money',this.cheater.money);
                            fd.append('summary',this.cheater.summary);
                            fd.append('uid',this.cheater.uid);
                            axios({
                                method: 'post',
                                url: 'http://127.0.0.1:3000/expose',
                                data:fd,
                                processData: false,
                                contentType: false,
                            }).then(data=>{
                                console.log(data);

                                if(data.data.success){
                                    alert(data.data.message);
                                    console.log(data.data);
                                    this.$router.push('/');
                                }
                            }).catch(function (error) {
                                console.log(error);
                            });
                            return;
                        }, 'image/jpeg', 0.8)
                        console.log(result);


                    }
                    console.log(result);
                    // alert(data.data.message);
                });

            },
            uploadfile(e){
                let _this = this;
                let file = e.target.files[0];
                this.cheater.proof.push(file.name);
                // console.log(this.cheater.proof);
                if (!e || !window.FileReader||!file)
                    alert("抱歉，出错啦！");
                    return;
                let data = new FormData();
                data.append("file", file, file.name);
                console.log(data.get('file'));
                var reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onloadend = function () {
                    _this.src = this.result;
                    console.log(this.result);
                };



            },
            uploadCroppedImage() {
            }


        },
        name: "uploadtails"
    }
</script>

<style scoped>

</style>