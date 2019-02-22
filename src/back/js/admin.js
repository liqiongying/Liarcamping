console.log("back index.js");
$(document).ready(function () {
    $("#example-advanced").treetable({ expandable: true });
    initData();
});
function initData() {
    $.ajax({
        url: "/api/newCar", //请求的接口地址
        type: "GET", //请求类型
        data: {
        }, //请求参数
        success: function(data){ //请求成功时候的回调函数

            console.log(data);
        },
        error: function () { //请求失败时候的回调函数

        }
    });
}