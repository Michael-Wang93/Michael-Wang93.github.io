$(function(){
	
		$('.tab_c').find('td').click(function(){
			$(this).addClass('actives').siblings('td').removeClass('actives');
			$('.main_map').find('.tab_warp').eq($(this).index()).show().siblings('.tab_warp').hide();
			if($(this).attr("id")=="mapBtn"){
				if(!flag){
					initMap();
					flag=1;
				}
			}
		});
		initMap();
		$("#map").css("height",($(window).height()-50)); 
		//$(".code_map").css("height",($(window).height()/16-6.3)+"em"); 
		var wd = $(window).width()-20;
		var hg = $(window).height()-120;
		$("#img").css({width:wd,height:hg});
		setTimeout(function(){myScroll = new iScroll('map1',{ hScrollbar: false, vScrollbar: false})},200);
	//changeBlock();
	var elem = document.getElementById('mySwipe');

	
	var domain=location.href.substring(0,location.href.indexOf("/html/"));
	    
	 	/*document.getElementById("img").addEventListener(
				"click",function(){
		                            WeixinJSBridge.invoke("imagePreview",{
					"urls":[domain+"/img/map.gif"],"current":domain+"/img/map.gif"
					})},!1);*/
		//var wd = $(".map01").width()-30;
		//var hg = $(window).height()-100;
		//$("#img").css({width:wd,height:hg});
	 	
});

var flag=0;

var mapObj, toolbar, overview, scale;

function initMap () {
	var map = new AMap.Map('map', {
        resizeEnable: true,
        zoom:15,
        center: [108.360324,22.811526]
        
    });

	AMap.plugin(['AMap.ToolBar','AMap.Scale'],function(){
		var toolBar = new AMap.ToolBar();
		var scale = new AMap.Scale();
		map.addControl(toolBar);
		map.addControl(scale);
	})
}
function mapInit() {
    var opt = {
        level:13, //设置地图缩放级别
        center:new AMap.LngLat(22.8145439942,108.3560976575), //设置地图中心点,
        doubleClickZoom:true, //双击放大地图
        scrollWheel:true,//鼠标滚轮缩放地图
    }
    mapObj = new AMap.Map("map", opt);/*AMap.Conf.network = 1;*/  
	AMap.event.addListener(mapObj,'complete',function(){
		addMarker();
		});
    
    mapObj.plugin(["AMap.ToolBar", "AMap.OverView", "AMap.Scale"], function () {
        toolbar = new AMap.ToolBar();
        toolbar.autoPosition = false; //加载工具条
        mapObj.addControl(toolbar);
        overview = new AMap.OverView(); //加载鹰眼
        mapObj.addControl(overview);
        scale = new AMap.Scale(); //加载比例尺
        mapObj.addControl(scale);
    });
    
}
function addMarker(){  
    marker=new AMap.Marker({                    
    icon:"http://webapi.amap.com/images/marker_sprite.png",  
    position:new AMap.LngLat(22.8181770000,108.3666130000)  
    });  
    marker.setMap(mapObj);  //在地图上添加点  
}  
var imgscroll;
function showDiv(id){
	$('#showimg').attr("src",id)
	openShowDiv("showdiv");
	imgscroll=new iScroll("imgdiv",{zoom:true,zoomMin:1,zoomMax:4,hScrollbar:false,vScrollbar:false,bounce:true,onZoomEnd:function(){
		if(this.scale==this.options.zoomMin){
			imgscroll.scrollTo(0,0);
		}
	}});
}

function closeShowDiv(){
	imgscroll.destroy();
	closeDiv("showdiv");
}

//点击切换3个板块
function changeBlock(){
	$(".one").click(function(){
		$('.line').removeClass("displayN");
		$('.line02').addClass("displayN");
		$('.map_food').addClass("displayN");
		$('.map02').addClass("displayN");
		$('.map_turn_i').removeClass("map_font_blue");
		$(this).find('.map_turn_i').addClass("map_font_blue");
		
	});
	$(".two").click(function(){
		$('.line').addClass("displayN");
		$('.line02').removeClass("displayN");
		$('.map_food').addClass("displayN");
		$('.map02').addClass("displayN");
		$('.map_turn_i').removeClass("map_font_blue");
		$(this).find('.map_turn_i').addClass("map_font_blue");
		
		var elem1 = document.getElementById('mySwipe1');
		
		
			var wd = $(".map_bj").width()-50;
			var hg = $(window).height()-203.2;
			$("#img1,#img2,#img3,#img4,#img5,#img6,#img7,#img").css({width:wd,height:hg});
			
//			generateImg("img1",w);
//			generateImg("img2",w);
//			generateImg("img",w);
		
		
		$(".con_turn1").find("span").html("&nbsp;");
		$(".con_turn1").find("span").removeClass("con_turn_cur1").addClass("con_turn_nor1");
		$(".con_turn1").find("span:eq(0)").removeClass("con_turn_nor1").addClass("con_turn_cur1");
		$(".con_turn_cur1").html(1);
		
		window.mySwipe1 = Swipe(elem1, {
			  // startSlide: 4,
			  // auto: 3000,
			  // continuous: true,
			  // disableScroll: true,
			   stopPropagation: true,
			   callback: function(index, element) {
			$(".con_turn1").find("span").html("&nbsp;");
			$(".con_turn1").find("span").removeClass("con_turn_cur1").addClass("con_turn_nor1");
			$(".con_turn1").find("span:eq("+index+")").removeClass("con_turn_nor1").addClass("con_turn_cur1");
			$(".con_turn_cur1").html(index+1);
			if($(".con_turn_cur1").html()==1){
				$('.map_bj_f').html("酒店大堂1");
				$(".map2_arr02").removeClass("displayN");
				$(".map2_arr01").addClass("displayN");
			}
			if($(".con_turn_cur1").html()==2){
				$('.map_bj_f').html("酒店大堂2");
				$(".map2_arr02").removeClass("displayN");
				$(".map2_arr01").removeClass("displayN");
			}
			if($(".con_turn_cur1").html()==3){
				$('.map_bj_f').html("豪华商务房 大床");
				$(".map2_arr02").removeClass("displayN");
				$(".map2_arr01").removeClass("displayN");
			}
			if($(".con_turn_cur1").html()==4){
				$('.map_bj_f').html("豪华商务房 双床");
				$(".map2_arr02").removeClass("displayN");
				$(".map2_arr01").removeClass("displayN");
			}
			if($(".con_turn_cur1").html()==5){
				$('.map_bj_f').html("花园厅");
				$(".map2_arr02").removeClass("displayN");
				$(".map2_arr01").removeClass("displayN");
			}
			if($(".con_turn_cur1").html()==6){
				$('.map_bj_f').html("西餐厅");
				$(".map2_arr02").removeClass("displayN");
				$(".map2_arr01").removeClass("displayN");
			}
			if($(".con_turn_cur1").html()==7){
				$('.map_bj_f').html("健身房");
				$(".map2_arr02").addClass("displayN");
				$(".map2_arr01").removeClass("displayN");
			}
				
		},
			  // transitionEnd: function(index, element) {}
			});
		$(".map2_arr01").addClass("displayN");
		$(".map2_arr02").removeClass("displayN");
		
	});
	$(".three").click(function(){
		$('.line').addClass("displayN");
		$('.line02').addClass("displayN");
		$('.map_food').removeClass("displayN");
		$('.map02').addClass("displayN");
		$('.map_turn_i').removeClass("map_font_blue");
		$(this).find('.map_turn_i').addClass("map_font_blue");
		
		myScroll.refresh();
		
	});
}

function generateImg(id,width){
	var w = $("#"+id).width();
	var height=$("#"+id).height()*(width/w);
	$("#"+id).css({width:width-10,height:height-10});
}
