$(function(){
	//会议议程
	$(".yc").css("height",($(window).height()/16-2.6)+"em"); 
	myScroll1=new iScroll('wrapper1',{ hScrollbar: false, vScrollbar: false});
	getAgenda();
	
});

function getAgenda(){
	var params = {};

	params["pageCode"] = "1";//页面编码
	params["eventId"] = "1";//事件ID
	params["type"] = "2";
	var text = JSON.stringify(params);
	showLoading();
	executeAjax("0060001",text,function(data){
		closeLoading();
		var first = data.responseBody.agendas; 
		var htmlText="";
		for(var i=0;i<first.length;i++){			
			    htmlText+="<div class=\"yc_con_tit\"><table class=\"yc_ct_fl\"><tr><td>"+first[i].spokeDate+"</td></tr></table></div>";							
				 if(i%2==0){
					 htmlText += "<div class=\"yc_con02\"><div class=\"yc_con_ft\">"+first[i].content+"</div>";					
				 }else{
					 htmlText += "<div class=\"yc_con01\"><div class=\"yc_con_ft\">"+first[i].content+"</div>";
				 }	
				 htmlText +="</div>";
			 }
		$("#content1").html(htmlText);
		myScroll1.refresh();
		 
	});
}
