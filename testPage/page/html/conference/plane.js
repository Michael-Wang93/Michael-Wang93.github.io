$(function(){
	
	//会议地图-酒店路线
	$("#wrapper").css("height",($(window).height()/16-4)+"em"); 
	//changeBlock();
	//var elem = document.getElementById('mySwipe');
	 myScroll1 =new iScroll('wrapper',{ hScrollbar: false, vScrollbar: false});
    
    var params = {};
    params["tel"]=getCookie("telephone");
	params["pageCode"] = "1";//页面编码
	params["eventId"] = "1";//事件ID
	var text = JSON.stringify(params);
	showLoading();
	executeAjax("0080001",text,function(data){
		closeLoading();
		var info = data.responseBody.planeInfo;
		if(info){
			var text="";
			if(info.name){
				$("#name").html(info.name);
				//text+="<div><p class=\"map_lx_p\">姓名："+info.name+"</p></div>";
			}
			if(info.backDay){
				$("#backDay").html(info.backDay);
				//text+="<div><p class=\"map_lx_p\">返程日期："+info.backDay+"</p></div>";
			}
			if(info.flight){
				$("#flight").html(info.flight);
				//text+="<div><p class=\"map_lx_p\">航班/车次："+info.flight+"</p></div>";
			}
			if(info.beginTime){
				$("#beginTime").html(info.beginTime);
				//text+="<div><p class=\"map_lx_p\">返程起飞/发车时间："+info.beginTime+"</p></div>";
			}
			if(info.station){
				$("#station").html(info.station);
				//text+="<div><p class=\"map_lx_p\">出发机场/火车站："+info.station+"</p></div>";
			}
			if(info.address){
				$("#address").html(info.address);
				//text+="<div><p class=\"map_lx_p\">送机地点："+info.address+"</p></div>";
			}
			else{
				$("#address").html("请联系会务组人员！");
				$("#address").css("color","red");
			}
			if(info.waitTime){
				$("#waitTime").html(info.waitTime);
				//text+="<div><p class=\"map_lx_p\">酒店出发时间："+info.waitTime+"</p></div>";
			}
			//$("#cont").html(text);
			
		}
		else{
			$("#wrapper").html( "<div><p class=\"map_lx_p\">未查到您的航班信息，请联系会务组人员！</p></div>");
		}
	});
	
});
