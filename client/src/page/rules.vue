<template>
    <div id="rules-container">

        <div id="login-top" class="navbar navbar-default login-top">
            <a class="system"><router-link to="/">骗子集中营</router-link></a>
            <span class="welcome" > 欢迎您！</span>

        </div>
        <div style="height: 25px"></div>
        <div id="login-box" style="height: auto;width: 80%">
            <h1 style="text-align: center">用户协议</h1>

           <p> 1. 对于用户上传到骗子集中营网站的任何内容，用户同意骗子集中营网站在全世界范围内享有免费的、永久的、不可撤销的、非排他性的使用和再许可的权利。骗子集中营网站享有修改、复制、发行、表演、展览、信息网络传播、改编、翻译、汇编等权利。
           </p>
            <p> 2. 用户上传到骗子集中营网站的资源及其内容不代表骗子集中营网站观点，骗子集中营网站不对资源及其内容的真实、完整、准确及合法性进行任何保证。
            </p>
            <p>  3. 用户应妥善保管自己的骗子集中营网站账户及其密码。因用户自身原因丢失账户、密码或其他重要信息等，用户自行承担一切不利后果。
            </p>
            <p> 4. 因系统维护或升级等原因而需暂停服务时，骗子集中营网站将事先发布公告。因硬件故障或者其他不可抗力而导致暂停服务，于暂停服务期间造成的一切不便与损失，骗子集中营网站不负任何责任。
            </p>
            <p>  5. 骗子集中营网站有权根据互联网的发展和中华人民共和国有关法律、法规及规范性文件的变化，不断修改和完善骗子集中营网站电子资料管理协议的相关条款。骗子集中营网站保留随时修改电子资料管理协议条款的权利。用户使用骗子集中营网站，即意味着同意并自愿遵守电子资料管理协议中所有条款及其最新版本。
            </p>
            <p> 6. 本协议未涉及的问题参见国家有关法律法规。当本协议与国家法律法规冲突时，以国家法律法规为准。
            </p>
            <p> <strong>本协议的最终解释权归骗子集中营网站所有。
            </strong></p>

        </div>


        <div class="white"></div>

    </div>
</template>

<script>
    export default {
        name: "rules"
    }
</script>

<style scoped>

    #rules-container{
        /*max-height: 200px;*/
        background-image: url("../assets/img/bg.jpg");
        height:fit-content;
        background-size: cover;
    }


    #login-top{
        background-image: url("../assets/img/bg.jpg");
        background-size: 1390px 700px;
        border:none;
        opacity: 1;
        width: 100%;
        height: 50px;
        position: fixed;
        top: 0;
    }

    #login-top a{
        font-weight: bold;
        color: #eeeeee;
    }
    #login-top a:hover{
        text-decoration: none;
        color: #b2c5d4;
    }

    #login-box{
        background-image: url("../assets/img/sunny.jpg");
        background-size: 2500px 1000px;
        opacity: 1;
        font-size: 15px;
        width: 300px;
        height: 335px;
        margin: 5px auto auto auto;
        border-radius: 3px;
        border: 1px solid #dafafa;
        padding: 10px 15px;
        background-color: #ffffff;
    }
    #login-box:hover{
        box-shadow: #cccccc 5px 10px 20px;
        cursor: pointer;
    }



    .toLogin a{
        margin-left: 10px;
        text-decoration: none;
        font-size: 12px;
        color: #666666;
    }
    .form-group{
        margin: 1px 10px;
    }
    .title{
        font-size:15px ;
    }


    .system{
        font-size: 30px;
        margin:3px 18px;
        float: left;
        color:#000000
    }

    .welcome{
        float: right;
        margin-top: 14px;
        font-size: 16px;
    }

    .white{
        height: 150px;
    }
    .forgetPsd{
        margin-left:22px;
        color: #0f0f0f;
    }

    .register{
        margin-left: 65px;
        color: #0f0f0f;
    }
    .form-group-button{
        width: 5px;
    }
    .small{
        font-size: 13px;
        position: relative;
        left: 5px;
        margin-top: 0;
        padding-top: 20px;
    }
    #remember{
        margin-top: 15px;
        display: none;
    }
    .another-btn{
        width: 244px;
        height: 40px;
        text-align:center;
        margin-top: 4px;
        margin-left: 22px;
        position: relative;
        right: 11px;
        margin-bottom: 4px;
    }
    /*#login-container{*/
    /*background: #00b3ee;*/
    /*}*/
</style>