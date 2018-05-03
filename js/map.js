window.onload=function(){

    var _lng = "113.333726";
    var _lat = "23.180485";
    var map;
    map = new AMap.Map('map', {
        zoom: 16,
        scrollWheel: false
    });

    AMapUI.loadUI(['misc/PositionPicker'], function (PositionPicker) {
        var positionPicker = new PositionPicker({
            mode: 'dragMap',
            map: map
        });

        positionPicker.on('success', function(positionResult) {
            getShop(positionResult.position.lng, positionResult.position.lat, 5, 10);
        });
        positionPicker.on('fail', function(positionResult) {
			
        });
        var onModeChange = function(e) {
            positionPicker.setMode(e.target.value)
        };
        positionPicker.start([113.333726, 23.180485]);
    });

    //点击回到最开始的位置
    $(".localtion").click(function(){
        AMapUI.loadUI(['misc/PositionPicker'], function (PositionPicker) {
            var positionPicker = new PositionPicker({
                mode: 'dragMap',
                map: map
            });

            positionPicker.on('success', function(positionResult) {
                getShop(positionResult.position.lng, positionResult.position.lat, 5, 10);
            });
            positionPicker.on('fail', function(positionResult) {

            });
            var onModeChange = function(e) {
                positionPicker.setMode(e.target.value)
            };
            positionPicker.start([113.333726, 23.180485]);
        });
    });

    var xbjMarker = new AMap.Marker({
        position: [_lng, _lat]
    });
    xbjMarker.setMap(map);

    // 设置label标签
    xbjMarker.setLabel({//label默认蓝框白底左上角显示，样式className为：amap-marker-label
        offset: new AMap.Pixel(-53, -26),//修改label相对于maker的位置
        content: "新百佳服装网络创业园"
    });

    /**
     * 创建高德地图
     * markerArr json所有地图的标注  
     * markerArr[i].longitude 经度
     * markerArr[i].latitude 纬度
     */
    function GaodeCreateMap(map, markerArr) {
        this.markerArr = markerArr;
        this.initMap = function () {
            this.createMap();//创建地图
            this.setMapEvent();//设置地图事件
        };
        this.createMap = function () {
            
            
            for (var i = 0; i < markerArr.length; i++) {
                var p0 = markerArr[i].longitude;
                var p1 = markerArr[i].latitude;
                if(markerArr[i].isOnline == 1){//线上
                    var imgUrl = imgIP + markerArr[i].shopLogo;
                    var shangxia_class = "map_xianshang_bg";
                }/*else if(markerArr[i].isOnline == 0){//线下// && active_imgId == "undefined"
                    var imgUrl = "img/xianxia.png";
                    var shangxia_class = "map_xianxia_bg";
                }*/

                var marker = this.addMarker(p0, p1, markerArr[i].nid, imgUrl, shangxia_class, -17, -17);
                this.addInfoWindow(marker, markerArr[i]);
                // marker.on('click', function() {
                //     console.log($(this));
                // });

            }
        }
        /**
         * 添加标注
         * @param {type} Lng 经度
         * @param {type} Lat 纬度
         * @param {type} imgUrl 标注图片路径
         * @param {type} width 标注宽
         * @param {type} height 标注搞
         * @param {type} radius 圆形幅度
         * @param {type} top 垂直偏移
         * @param {type} left 水平偏移
         * @returns {AMap.Marker}
         */
        this.addMarker = function (Lng, Lat, marker_nid, imgUrl, map_img , top, left) {
            return new AMap.Marker({
                map: map,
                //icon: imgUrl,
                position: [Lng, Lat],
                offset: new AMap.Pixel(top, left),
                content: '<div class="' + map_img + '" id="'+ marker_nid +'" data-clickstatu="false"><img src="' + imgUrl + '" /></div>'
            });

        }
        
        this.addInfoWindow = function (marker, shop) {
            marker.setMap(map);
            var openInfoWinFun = function (e) {
                //点击店铺
                var nidId = "#"+shop.nid;
                var clickstatu = $(nidId).attr("data-clickstatu");
                
                if(clickstatu == "false"){
                    $(nidId).addClass('active_xianshang_bg').removeClass('map_xianshang_bg');
                    
                    var nidId_left = Number($(nidId).parents(".amap-marker").css('left').split("px")[0]);
                    nidId_left = nidId_left-10;
                    $(nidId).parents(".amap-marker").css({
                        "z-index": '101',
                        "left":nidId_left+"px"
                    });
                    $(".but_more").hide();
                    $(".findmore").hide();
                    $(".moreshop_list").hide();
                    $(".mapshop_name").show();
                    $(nidId).attr("data-clickstatu","true");
                }else if(clickstatu == "true"){
                    $(nidId).removeClass('active_xianshang_bg').addClass('map_xianshang_bg');
					
                    var nidId_left = Number($(nidId).parents(".amap-marker").css('left').split("px")[0]);
                    nidId_left = nidId_left+10;
                    $(nidId).parents(".amap-marker").css({
                        "z-index": '101',
                        "left":nidId_left+"px"
                    });
                    $(".but_more").show();
                    $(".findmore").show();
                    $(".mapshop_name").hide();
                    $(nidId).attr("data-clickstatu","false");
                }
            };
            marker.on("click", openInfoWinFun);
        }
		
        //事件设置
        this.setMapEvent = function () {
        };
        this.initMap();
    }

    /**
    * 获取地图并标注
    * 其中内部create方法是根据上级经纬度获取附件商家信息的
    * lng 经度
    * lat 纬度
    * isBaidu true:百度地图api || false:高德地图api
    * juli
    * pageSize
    * @type AMap.Map
    */
	
    function getShop(lng, lat, juli, pageSize) {
        /**
         * (根据店铺经纬度度获取店铺信息按远近距离)创建地图并标注
         * lng 经度
         * lat 纬度
         * flag true:百度地图api false:高德地图api
         * juli 距离(单位公里)
         * pageSize 最多显示数量 
         */
        function create(lng, lat, juli, pageSize) {
            $.ajax({
                type: 'POST',
                /*url: "http://192.168.88.110:8080/api/shop",*/ //接口地址
                url: "http://gxtxapi.sharedservice.cn/api/shop", //接口地址
                data: {
                    action: 'GetMapShopList',
                    sLng:_lng,
                    sLat:_lat,
                    lng: lng,
                    lat: lat,
                    juli: juli,
                    pageSize: pageSize,
                    pageIndex:"1",
                    pageSize:"10",
                    token: ""
                },
                success: function (data) {
                    var json = JSON.parse(data);
                    var objdata = JSON.parse(json.datas);

                    var active_imgId = $(".active_xianshang_bg").attr("id");

                    if (json.status == "success" && active_imgId == undefined) {
                        var markerArr = $.parseJSON(json.datas);
                        GaodeCreateMap(map, markerArr);
                    }

                }
            });
        }
        create(lng, lat, juli, pageSize);
    };
    $(".but_more").click(function(){
        $(this).hide();
        $(".moreshop_list").slideDown();
    });
    $(".down_moreshop").click(function(){
        $(".but_more").show();
        $(".moreshop_list").slideUp();
    });
    $(".mapheader_r").click(function(){
        $(".mapheader_m input").val("");
    });
    
    //隐藏高德地图logo
    $(".amap-logo").css({"display":"none"});
    $(".amap-copyright").css({"visibility":"hidden"});
};