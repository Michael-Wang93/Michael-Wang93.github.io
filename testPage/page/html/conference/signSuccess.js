$(function(){
	
	searchDetail();
});


var myScroll;
function searchDetail(){
	var params = {};
	params["telephone"] = getSid();
//	params["pageCode"] = "1";//页面编码
//	params["eventId"] = "1";//事件ID
	var text = JSON.stringify(params);
	showLoading();
	executeAjax("0040001", text, function(data) {
		closeLoading();
		var code = data.responseBody.code;
		if (code == '0') {
			var roomNo = data.responseBody.roomNo;
			var st = "签到成功,您的房间号是" + (roomNo==null?"":roomNo);
			st += "<br/>请凭身份证至前台办理入住";
			$("#content").html(st);
		}else if(code == '1'){
			jAlert("签到失败，请联系会务组确认名单。");
		}else{
			jAlert("签到失败，系统异常。");
		}
	});
	
	
}




