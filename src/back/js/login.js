$(document).ready(function(){
    eventBind()
    var strName = localStorage.getItem('keyName');
    var strPass = localStorage.getItem('keyPass');
    if(strName){
        $('#user').val(strName);
    }if(strPass){
        $('#pass').val(strPass);
    }
});

function loginBtn_click(){
    var strName = $('#user').val();
    var strPass = $('#pass').val();
        localStorage.setItem('keyName',strName);
        if($('#remember').is(':checked')){
            localStorage.setItem('keyPass',strPass);
        }else{
            localStorage.removeItem('keyPass');
        }
}


function eventBind() {
    var loginBtn =document.getElementById("login-btn");
    loginBtn.onclick = function () {
        appendContent();
    }
}
function appendContent(){
    var user=document.getElementById("user");
    if(user.value==""){
        javascript:alert("用户名不能为空,请重新输入")
        // window.location.href="home.html";
    }
}