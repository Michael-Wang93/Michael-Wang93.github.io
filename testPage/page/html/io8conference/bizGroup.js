$(function(){
	//会务组
	$(".m_hz").css("height",($(window).height()/16-5.5)+"em");  
	
	//myScroll =new iScroll('contact',{ hScrollbar: false, vScrollbar: false});
	
	queryBizGroup();
});


function queryBizGroup(){
	var html='';
	var params = {};
	var text = JSON.stringify(params);
	showLoading();
	executeAjax("0090001",text,function(data){
		closeLoading();
		var groups = data.responseBody.groups;
		for(var i = 0; i < groups.length;i++){
			var info = groups[i];
			if(!info.conpetency){
				info.conpetency='';
			}		
			if(info.id==11){
				html+="<li><h1>"+info.conpetency+"</h1><p class=\"p_contact\"><span class=\"left\">姓名：<em>"+info.name+"</em></span> <span class=\"right\">电话：<a href=\"tel:"+info.telephone+"\"><em>"+info.telephone+"</em></a></span></p>";			
			}
			else if(info.id==12){
				html+="<p class=\"p_contact\"><span class=\"left\">姓名：<em>"+info.name+"</em></span> <span class=\"right\">电话：<a href=\"tel:"+info.telephone+"\"><em>"+info.telephone+"</em></a></span></p></li>";	
		  }	
		  else{
			html+="<li><h1>"+info.conpetency+"</h1><p class=\"p_contact\"><span class=\"left\">姓名：<em>"+info.name+"</em></span> <span class=\"right\">电话：<a href=\"tel:"+info.telephone+"\"><em>"+info.telephone+"</em></a></span></p></li>";			
		  }
		}
		$("#contact ul").html(html);
		setTimeout(function(){myScroll = new iScroll('contact',{ hScrollbar: false, vScrollbar: false})},200);
	});
}