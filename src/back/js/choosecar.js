//获取图片
$(document).ready(function () {
    initData();
});

function initData() {
    $.ajax({
            url: "/api/carInfoList",
            type: "GET",
            // async: false,
            data: {},
            success: function (data) {
                var carArray = JSON.parse(data);
                var carInfo = carArray['carInfo'];//数组
                // console.log(carInfo[inital]);
                // var character=carInfo[inital];
                searchabc(carInfo);
                var cardhtml = "";

                for (var i = 0; i < carInfo.length; i++) {

                    cardhtml += "<div class='card' id='"+carInfo[i]['id']+"' onclick='tests("+carInfo[i]['id']+")'><img src='../img/" + carInfo[i]['img'] + "'/></div>";

                }
                // console.log(cardhtml);

                $(".allcard").html(cardhtml);

            },
            error: function () {
            }
        }
    );
}
// $("#fen").on("click", "img", function() {
//
// });

var arraycar = [];
function searchabc(carabc) {
    $(".abc1").on("click",function(){
        var num = $(this).attr("value") ;
        var newhtml ="";
        console.log(carabc);
        for (var i = 0; i < carabc.length; i++) {
            if (carabc[i]["initial"]===num){
                newhtml+=  "<div class='card' id='"+carabc[i]['id']+"' onclick='tests("+carabc[i]['id']+")'><img src='../img/" + carabc[i]['img'] + "'/></div>";

            }
        }
        $(".allcard").html(newhtml);
        console.log(num);
    })

    $("#searchbtn").on("click",function(){
        var num1 = $("#search1").val() ;
        var num2 = $("#search2").val() ;
        var newhtml ="";
        console.log(num1,num2.length);
        for (var i = 0; i < carabc.length; i++) {
            if(num1.length===0|num2.length===0){
                if (carabc[i]["brand"]===num1|carabc[i]["type"]===num2){
                    newhtml +=  "<div class='card' id='"+carabc[i]['id']+"' onclick='tests("+carabc[i]['id']+")'><img src='../img/" + carabc[i]['img'] + "'/></div>";

                }
            }
            else {
                if (carabc[i]["brand"]===num1&carabc[i]["type"]===num2){
                    newhtml +=  "<div class='card' id='"+carabc[i]['id']+"' onclick='tests("+carabc[i]['id']+")'><img src='../img/" + carabc[i]['img'] + "'/></div>";

                }
            }

        }
        $(".allcard").html(newhtml);
    })
}


function tests(id){
    //alert(id,src);
    // var imgid= $(this).attr("id");
    var imgid= id;
    var imgsrc= $("#"+id).children("img").attr("src");
    //alert(imgsrc);
    // var imgsrc=src;
    console.log(imgid);
    var carObj = {
        'cid': imgid,
        'src': imgsrc
    };
    // console.log(objContains(arraycar, imgid));
    var index = objContains(arraycar, imgid);
    if(index === -1){
        editArray(carObj,id);
    } else {
        arraycar.splice(index, 1);
        $("#"+id).css("background-color","white");
        // console.log($("#content").find("img").eq(arraycar.indexOf(imgsrc)));
        // $("#content").find("img").eq(arraycar.indexOf(imgsrc)).remove();
        appendHtml();
    }
}

/*
$(".card").on("click", "img", function() {
    var imgid= $(this).attr("id");

    var imgsrc= $(this).attr("src");
    console.log(imgid);
    var carObj = {
      'cid': imgid,
      'src': imgsrc
    };
    // console.log(objContains(arraycar, imgid));
    var index = objContains(arraycar, imgid);
    if(index === -1){
        editArray(carObj,this);
    } else {
        arraycar.splice(index, 1);
        $(this).parent("div").css("background-color","white");
        // console.log($("#content").find("img").eq(arraycar.indexOf(imgsrc)));
        // $("#content").find("img").eq(arraycar.indexOf(imgsrc)).remove();
        appendHtml();
    }
} );
*/
function objContains(arr, id) {
    for (var i = 0; i < arr.length; i++) {
        var obj = arr[i];
        if (obj['cid'] === id) {
            return i;
        }
    }
    return -1;
}
$("#clear").click(function() {
    clearcontent();
    arraycar.splice(0,arraycar.length);
} );

function editArray(obj,id) {


    console.log(arraycar);
    if(arraycar.length < 4){
        arraycar.push(obj);
        // console.log(thiscar);
        $("#"+id).css("background-color","grey");
        console.log(arraycar);
    } else {
        alert("图片数量不能超过4个哦！");
    }
    appendHtml();
}
function appendHtml() {
    var html = '';
    for (var i = 0; i < arraycar.length; i++) {
        html += "<img src='" + arraycar[i]['src'] + "' class='choose'  />";
    }
    $("#content").html(html);
}
function clearcontent() {
    $("#content").html("");
}

