// 页面载入文件
window.onload = function () {
    eventBind();
};


// 事件绑定
function eventBind(){

    for(var i = 0;i<12;i++){
            var pieContainer = echarts.init(document.getElementById(i));
            pieContainer.setOption(option);
    }


}

// 饼图配置文件
var pieDatas = new Array();
var data1 = [{value:335, name:'直接访问'},
    {value:310, name:'邮件营销'},
    {value:274, name:'联盟广告'},
    {value:235, name:'视频广告'},
    {value:400, name:'搜索引擎'}
];
var data2 = [{value:335, name:'直接访问'},
    {value:567, name:'邮件营销'},
    {value:100, name:'联盟广告'},
    {value:140, name:'视频广告'},
    {value:79, name:'搜索引擎'}
];
for(var i=0;i<6;i++){
    pieDatas.push(data1);
    pieDatas.push(data2);
}


// function createPie(pieDatas){
var option = {
        tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        series : [
            {
                name: '访问来源',
                type: 'pie',
                radius : '90%',
                center: ['50%', '50%'],
                data:pieDatas[i].sort(function (a, b) { return a.value - b.value; }),
                itemStyle: {
                    emphasis: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                },
                label: {
                    show: false
                }
            }
        ]

    };



// }


// --------------------------------------------各种数据处理--------------------------------------------------



