$(document).ready(function(){
    $(".inquiry_ul").on("click",".noOffer_fu",function(){
        $(".no_offer").slideToggle();
        $(".inquiry_ul li i").toggleClass ("inquiry_jiantou");
    });
});