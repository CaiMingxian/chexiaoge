$(document).ready(function(){
    $(".search_box").on("click","span",function(){
        var myphone = $(".search_box input").val();
        if(/^1[34578]\d{9}$/.test(myphone)){
            //location.href="";
        }else{
            $(".search_box input").attr("placeholder","请输入正确的手机号码");
        }
    });
});