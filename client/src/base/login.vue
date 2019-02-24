<template >
    <div class="modal fade" data-show="true" ref="mydialog" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                    <h4 class="modal-title" >注意</h4>
                </div>
                <div class="modal-body">
                    还没有登陆，赶快去登陆吧！
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
                    <router-link to="/login" type="button" class="btn btn-primary"  data-dismiss="modal">确定登陆</router-link>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
    export default {
        name: "login",
        props:["show"],
        // created(){
        //     if(this.show==true){
        //         this.$refs.mydialog.modal('show');
        //     }
        // }
    }
</script>

<style scoped>

</style>