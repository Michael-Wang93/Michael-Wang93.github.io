$(function(){
	$("#imgBaogao").css("height",($(window).height()/16-12.7)+"em");	
	$("#imgBaogao").attr("src","../../img/seat.jpg");
	var wd = $(window).width()-18;
	var hg = $(window).height()-80;
	$("#imgBaogao").css({width:wd,height:hg});
		
	var domain=location.href.substring(0,location.href.indexOf("/html/"));

    document.getElementById("imgBaogao").addEventListener(
	"click",function(){
                        WeixinJSBridge.invoke("imagePreview",{
		"urls":[
		domain+"/img/seat.jpg"
		],
		"current":domain+"/img/seat.jpg"
		})
                },!1);
 
});


//初始化查询
function querySeatList(telephone){
	var domain=location.href.substring(0,location.href.indexOf("/html/"));
	var params = {};
	params["mobile"] = telephone;
	var text = JSON.stringify(params);
	executeAjax("0070001",text,function(data){
		var seatInfo = data.responseBody.seats[0];
		$('#baogaoC').html("请您在"+seatInfo.rowNo+"排"+seatInfo.seatNo+"座就座");
		if(seatInfo.discussPlaceNo ==null || $.trim(seatInfo.discussPlaceNo) ==''){
			$('#taolunC').html("您无需参加服务体系讨论");
		}else{
			$('#taolunC').html("服务体系讨论分组：您所在的组为"+seatInfo.discussPlaceNo);
		}
		
		$('#taolunT2').html(seatInfo.discussPlaceNameT);
		$("#imgBaogao").attr("src","../../img/baogaoCut.jpg");
		$("#imgTaolun").attr("src","../../img/taolunCut.jpg");
		$("#imgHuiyi").attr("src","../../img/huiyiCut.jpg");
		if(seatInfo.discussPlaceNameT =="第一会议室"){
			$('#taolunT2').html("五号楼B1层"+seatInfo.discussPlaceNameT);
			$('#huiyiC').html("请您参加郑州营运中心片区会议");
			
		}else if(seatInfo.discussPlaceNameT =="第二会议室"){
			$('#taolunT2').html("五号楼B1层"+seatInfo.discussPlaceNameT);
			$('#huiyiC').html("请您参加长沙营运中心片区会议");
		}else{
			$('#taolunT2').html("五号楼B1层");
			$('#huiyiC').html("您无需参加片区会议");
		}
		document.getElementById("imgBaogao").addEventListener(
				"click",function(){
		                            WeixinJSBridge.invoke("imagePreview",{
					"urls":[
					domain+"/img/baogao1.jpg",
					domain+"/img/taolun1.jpg",
					domain+"/img/huiyi1.jpg"
					],
					"current":domain+"/img/baogao1.jpg"
					})
		        },!1);
		document.getElementById("imgTaolun").addEventListener(
				"click",function(){
		                            WeixinJSBridge.invoke("imagePreview",{
					"urls":[
					domain+"/img/baogao1.jpg",
					domain+"/img/taolun1.jpg",
					domain+"/img/huiyi1.jpg"
					],
					"current":domain+"/img/taolun1.jpg"
					})
		        },!1);
		document.getElementById("imgHuiyi").addEventListener(
				"click",function(){
		                            WeixinJSBridge.invoke("imagePreview",{
					"urls":[
					domain+"/img/baogao1.jpg",
					domain+"/img/taolun1.jpg",
					domain+"/img/huiyi1.jpg"
					],
					"current":domain+"/img/huiyi1.jpg"
					})
		        },!1);
		});
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