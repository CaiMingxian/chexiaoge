$(document).ready(function(){
    $(".alphabet_list").on("click","li",function(){
        $(".brand_box").css({
            "padding-top": "0"
        });
        var alphabet_html = $(this).html();
        var goId = alphabet_html;
        document.getElementById(goId).scrollIntoView({block: "start"});//{block: "start", behavior: "smooth"}
        $(".brand_box").css({
            "padding-top": "45px"
        });
        $(".Capital").fadeIn(100);
        $(".Capital").text(alphabet_html);
        setTimeout(function(){$(".Capital").fadeOut()},800);
    });

    //滚动页面，字母元素固定于顶部
    var alphTop = $(".aside_alphabet").offset().top;
    var brandTop = $(".brand_box").offset().top;
    var sTop = 0;
    $(window).scroll(function(){
        sTop = $(this).scrollTop();
        // console.log(sTop)
        if(sTop >= (alphTop-45)){
            $(".aside_alphabet").css({
                "top": "45px",
                "position": "fixed"
            });
        }else if(sTop < alphTop){
            $(".aside_alphabet").css({
                "position": "absolute",
                "top": "2px"
            });
        }
        var brand_pad = $(".brand_box").css("padding-top").split("px")[0];
        if(sTop+1 <= brandTop && brand_pad == "45"){
            $(".brand_box").css({
                "padding-top": "0"
            });
        }
        // if(sTop >= 45){
        //     $(".brand-carbox").css({
        //         "position": "fixed"
        //     });
        // }
    });

    //点击畅销品牌
    $(".hot_li").on("click","li",function(){
        $(".brand-carbox").animate({left:"31.5%"},250);
    });

    //点击车辆品牌
    $(".aside_icon").on("click",".brand_list li",function(){
        $(".brand-carbox").animate({left:"31.5%"},250);
    });

    var _switch = false;

    $(".brand-carbox").on({
        "touchstart":function(e){
            startX = e.originalEvent.changedTouches[0].pageX,
            startY = e.originalEvent.changedTouches[0].pageY;
        },
        "touchmove":function(e){
            //获取滑动屏幕时的X,Y
            endX = e.originalEvent.changedTouches[0].pageX,
            endY = e.originalEvent.changedTouches[0].pageY;

            //获取滑动距离
            distanceX = endX-startX;
            distanceY = endY-startY;

            var brand_w = $(".brand-carbox").width()/4;
            
            if(distanceX>0 && (Math.abs(distanceX)-Math.abs(distanceY)) >= brand_w){//Math.abs(distanceX)>Math.abs(distanceY) && 
                $(".brand-carbox").animate({left:"100%"},400);
            }
        }
   });
});