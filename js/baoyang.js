$(document).ready(function(){
    //保养项目选择
    $(".baoyang_click").on("click","li div span",function(){
        $(this).addClass("active_span").siblings().removeClass("active_span");
    });

    //预约
    $(".choice_l").click(function(){
        var yuyue = $(this).html();
        if(yuyue == "上次预约情况"){
            $(".baoyang_time").slideDown();
            $(".baoyang span:first i").html("上次");
            $(this).html("继续预约");
        }else if(yuyue == "继续预约"){
            $(".baoyang_time").slideUp();
            $(".baoyang span:first i").html("本次");
            $(this).html("上次预约情况");
        }
    });
});