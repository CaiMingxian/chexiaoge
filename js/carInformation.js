$(document).ready(function(){
    //checkbox添加阻止冒泡事件
    $("input[type='checkbox']").click(function(e){  
        e.stopPropagation();   
    }); 

    //同为投保人被投保人
    $(".carOwner_news").on("click","label",function(e){
        var carOwner = $(this).find("input[type='checkbox']")[0].checked;
        if(carOwner == true){
            $(".toubao_beitoubao_box").slideUp();
        }else if(carOwner == false){
            $(".toubao_beitoubao_box").slideDown();
        }
    });

    //单位投保
    $(".toubao_beitoubao_box").on("click","label",function(e){
        var comInsure = $(this).find("input[type='checkbox']")[0].checked;
        if(comInsure == true){
            $(".unit_insure").hide();
            $(".c_insure").show();
        }else if(comInsure == false){
            $(".unit_insure").show();
            $(".c_insure").hide();
        }
    });

    //当页面跳页又返回，保存选中的状态
    var carOwner = $(".carOwner_news label").find("input[type='checkbox']")[0].checked;
    if(carOwner == true){
        $(".toubao_beitoubao_box").show();
    }else if(carOwner == false){
        $(".toubao_beitoubao_box").hide();
    }

    var comInsure = $(".toubao_beitoubao_box label").find("input[type='checkbox']")[0].checked;
    if(comInsure == false){
        $(".unit_insure").hide();
        $(".c_insure").show();
    }else if(comInsure == true){
        $(".unit_insure").show();
        $(".c_insure").hide();
    }
    
    //机构类型选择
    $(".toubao_beitoubao_box").on("click",".unit_insure li:nth-child(3)",function(){
        stop();
        $(".jigouleixing_box").show();
    });

    $(".jigouleixing_box").on("click","ul li",function(){
        move();
        $(this).children("i").children("img").show();
        $(this).siblings().children("i").children("img").hide();
        $(".unit_insure li:nth-child(3) input").val($(this).children("em").html());
        $(".jigouleixing_box").hide();
    });

    //座位号加减效果
    $(".zuowei_num").on("click",".add",function(){//加
        var input_text = $(this).prev().val();
        var num = parseInt(input_text)+1;
        if(num==0){return;}
        $(this).prev().val(num);
    });
    $(".zuowei_num").on("click",".jian",function(){//减
        var input_text = $(this).next().val();
        var num = parseInt(input_text)-1;
        if(num==0){return;}
        $(this).next().val(num);
    });

    $(".zuowei_num input").blur(function(){
        var zuo_num = $(this).val();
        if(zuo_num == ""){
            $(this).val("1");
        }
    })

    $(".license_plate").on("click","li:nth-child(7)",function(){
        $(".zuoweishu_box").show();
        stop();
    });

    $(".zuoweishu").on("click","p span",function(){
        $(".zuoweishu_box").hide();
        $(".license_plate li:nth-child(7) input").val($(".zuowei_num input").val());
        move();
    });

    //点击透明背景消失
    $(".effect_bg").click(function(){
        $(this).parent().hide();
        move();
    });
    
    //点击车牌弹窗的完成按钮
    $(".carpai_input").on("click","p span",function(){
        var carNum = $(".car_in input").val();
        if(carNum != ""){
            $(".carpai_box").hide();
            $(".car_number").text(" > "+carNum);
            $(".car_in input").val("");
            move();
        }
    });

    //日历弹窗
    $(".cI_ul").on("click","#register_time",function(){
        $(".calendar_box").show();
    });

    //==============app弹出层上禁止页面滚动=================
    
    /***实现滚动条无法滚动***/
    function stop(){
        $("body").css({
            overflow: 'hidden'
        });
    }

    /***取消滑动限制***/
    function move(){
        $("body").css({
            overflow: ''
        });       
    }

});