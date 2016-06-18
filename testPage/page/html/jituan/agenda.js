$(function(){
	$("#wrapper").css("height",$(window).height()-50); 
	var domain=location.href.substring(0,location.href.indexOf("/html/"));
	document.getElementById("img").addEventListener(
			"click",function(){
	                            WeixinJSBridge.invoke("imagePreview",{
				"urls":[domain+"/img/images/conference-agenda.jpg"],"current":domain+"/img/images/conference-agenda.jpg"
				})},!1);
	//getAgenda();
	(function () {
		var myScroll;
		function loaded () {
			myScroll = new iScroll('wrapper',{hScrollbar: true, vScrollbar: true});
		}
		
		window.addEventListener("DOMContentLoaded",loaded,false);
	})()
	
});


function getAgenda(){
	var params = {};

	params["pageCode"] = "1";//页面编码
	params["eventId"] = "1";//事件ID
	params["type"] = "1";
	var text = JSON.stringify(params);
	showLoading();
	executeAjax("0060001",text,function(data){
		closeLoading();
		var response = data.responseBody.agendas;
		setTimeout(isc,200);
	});
}

function isc(){
	myScroll1 =new iScroll('agenda',{ hScrollbar: false, vScrollbar: false});

}

function getDate(agendaDate){
	var month = "";
	var day = "";
	if(agendaDate.substring(5,6)=="0"){
		month = agendaDate.substring(6,7);
	}else{
		month = agendaDate.substring(5,7);
	}
	if(agendaDate.substring(8,9)=="0"){
		day = agendaDate.substring(9,10);
	}else{
		day = agendaDate.substring(8,10);
	}
	return month+"月"+day+"日";
}