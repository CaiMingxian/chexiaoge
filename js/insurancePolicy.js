$(document).ready(function(){
    //checkbox添加阻止冒泡事件
    $("input[type='checkbox']").click(function(e){  
        e.stopPropagation();   
    }); 
    //交强险
    $(".strong_insurance").on("click","label",function(e){
        var strongsure = $(this).find("input[type='checkbox']")[0].checked;
        if(strongsure == true){
            $(".strong_in").slideUp();
        }else if(strongsure == false){
            $(".strong_in").slideDown();
        }
    });
    //商业险
    $(".commercial_insurance").on("click","li:first label",function(e){
        var commercialsure = $(this).find("input[type='checkbox']")[0].checked;
        if(commercialsure == true){
            $(".commercial_insurance li").not("li:first").slideUp();
        }else if(commercialsure == false){
            $(".commercial_insurance li").not("li:first").slideDown();
        }
    });
    //车辆损失险
    $(".commercial_insurance").on("click",".carloss_isurance label",function(e){
        var comInsure = $(this).find("input[type='checkbox']")[0].checked;
        if(comInsure == true){
            $(".carloss").slideUp();
        }else if(comInsure == false){
            $(".carloss").slideDown();
        }
    });
    //投保不投保
    $(".glass_box").on("click","li",function(){
        $(this).addClass('active_toubao').siblings().removeClass('active_toubao');
    });
    //不计免赔
    $(".commercial_insurance").on("click",".gray_em",function(){
        var redStatr = $(this).attr("data-red");
        if(redStatr == "true"){
            $(this).removeClass("active_em").attr("data-red",false);
        }else{
            $(this).addClass("active_em").attr("data-red",true);
        }
    });
});