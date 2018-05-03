$(document).ready(function(){
    //头部导航
    $(".filter-nav").on("click","span",function(){
        
        var index = $(this).index();
        if(index == 1){
            location.href="brandSelection.html";
        }else{
            var clickStatu = $(this).attr("data-clickstatu");

            //data-clickstatu=true是第二次点击
            if(clickStatu == "true"){
                $(this).removeClass("active_energy");
                $(this).attr("data-clickstatu",false);

                $(".intelligence_box").hide();
                $(".carprice_box").hide();
                $(".carListscreen_box").hide();
                $(".carlist_goodslist").show();

            }else{
                $(this).attr("data-clickstatu",true).siblings().attr("data-clickstatu",false);

                    
                $(this).addClass("active_energy").siblings().removeClass("active_energy");

                $(".carlist_goodslist").show();

                if(index == 0){
                    $(".carprice_box").hide();
                    $(".carListscreen_box").hide();
                    $(".intelligence_box").show();
                }else if(index == 2){
                    $(".carListscreen_box").hide();
                    $(".intelligence_box").hide();
                    $(".carprice_box").show();
                }else if(index == 3){
                    $(".intelligence_box").hide();
                    $(".carprice_box").hide();
                    $(".carListscreen_box").show();
                    $(".carlist_goodslist").hide();
                }else if(index == 4){
                    
                }
            }
        }
    });

    //点击黑色背景
    $(".sort_box").on("click",".sort_bg",function(){
        $(this).parent(".sort_box").hide();
    });

    //导航下拉
    $(".sort_box").on("click","li",function(){
        $(this).addClass("active_energy").siblings().removeClass("active_energy");
    });

    //点击筛选里面的li
    $(".car_screen_ul").on("click","li",function(){
        $(this).children("span").addClass("active_touch");
        $(this).siblings().children("span").removeClass("active_touch");
    });

});