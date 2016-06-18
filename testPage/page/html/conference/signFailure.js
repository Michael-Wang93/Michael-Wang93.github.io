$(function(){
});


var myScroll;
function searchDetail(){
	var params = {};
//	params["telephone"] = localStorage.sid;
	params["telephone"] = $("#telephone").val();
	params["pageCode"] = "1";//页面编码
	params["eventId"] = "1";//事件ID
	var text = JSON.stringify(params);
	showLoading();
	executeAjax("0040001",text,function(data){
		closeLoading();
		var code = data.responseBody.code;
		if (code == '0') {
			window.location.href='signSuccess.html'
		}else if(code == '1'){
			jAlert("签到失败，请联系会务组确认名单。");
		}else{
			jAlert("签到失败，系统异常。");
		}
	});
	
	
}




