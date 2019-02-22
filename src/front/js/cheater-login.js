
$(document).ready(function(){
    eventBind();
    var strName = localStorage.getItem('keyName');
    if(strName){
        $('#user').val(strName);
    }

});



function eventBind() {
    var loginBtn =document.getElementById("another-btn");
    loginBtn.onclick = function () {
        appendContent();
    }
}
function appendContent(){
    var x=document.forms["formphp"]["user"].value;
    console.log(x);
    var atpos=x.indexOf("@");
    var dotpos=x.lastIndexOf(".");
      if (atpos<1 || dotpos<atpos+2 || dotpos+2>=x.length) {
        alert("邮箱无效，请重新输入！");
    } else
        window.location.href = "cheater-index.html";


}





