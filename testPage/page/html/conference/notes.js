(function(){
//	$(".main_bg").css("height",($(window).height()/16-0)+"em"); 
//	$(".main_div").css("height",($(window).height()/16-2.4)+"em"); 
//	$("#wrapper").css("height",($(window).height()/16-22.4)+"em");
	//会议须知
	/*$(".xz_con").css("height",($(window).height()/16-3.3)+"em");
	$(".xz_img").css("height",($(window).height()/16-27.2)+"em");*/
	$("#wrapper").css({"height":document.body.clientHeight-211,"overflow":"auto"});
	$(".content").css({"height":"1400px"});
	if(myScroll)
				myScroll.destroy();

	window.addEventListener("DOMContentLoaded",loaded,false);
			
	//searchDetail();
})();


var myScroll;

function loaded () {
	myScroll = new iScroll('wrapper',{hScrollbar: false, vScrollbar: false});
}
function searchDetail(){
	var params = {};

	params["pageCode"] = "1";//页面编码
	params["eventId"] = "1";//事件ID
	var text = JSON.stringify(params);
	showLoading();
	executeAjax("0020001",text,function(data){
		closeLoading();
		var response = data.responseBody.content;
		var res = response.split("|");
		var con = "";
		for(var i=0;i<res.length;i++){
			con += "<div class=\"xz_font\" style='text-indent:2em;'>"+res[i]+"</div>";
		}
		$(".content").html(con);
		
		
			if(myScroll)
				myScroll.destroy();
			setTimeout(function(){myScroll = new iScroll('wrapper',{ hScrollbar: false, vScrollbar: false})},200);
	});
	
	
}




