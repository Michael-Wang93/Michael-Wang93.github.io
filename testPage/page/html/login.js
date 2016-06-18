$(function(){

		//调用顶部图片自伸缩
		generatePhoto("photo1","divpt");
	 	$(window).resize(function(){
	 		generatePhoto("photo1");
	 	});
		//算高度
		var ih = $("#divpt").height();
		$(".con_heig").css("height",(($(window).height()-ih)/16-14)+"em");
		$("#login_btn").bind("click",login);

});

function login(){
	var username = $("#username").val();
	//var password = $("#password").val();
	if(username==""){
		jAlert("用户名不能为空，请重新填写");
		//$("#username").focus();
		return;
	}
	//if(password==""){
	//	jAlert("密码不能为空，请重新填写");
	//	$("#password").focus();
	//	return;
	//}
	var params = {};
	params["username"] = username;
	params["password"] = "";
	var text = JSON.stringify(params);
	showLoading();
	executeAjax("0010005",text,function(data){
		closeLoading();
		var msg = data.responseBody.msg;
		var testType = data.responseBody.user[0].userentitycode;
		var userId = data.responseBody.user[0].id;
		if(msg=="0"){
			jAlert("您输入的账号或密码有误，请重新输入");
		}else{
			addCookie("desc",msg,1);
			addCookie("telephone",username,1);
			addCookie("testType",testType,1);
			addCookie("userId",userId,1);
			window.location.href="index.html"+"?id="+(Math.random()*1000);
		}
	});
}

//顶部banner图片自伸缩
function generatePhoto(id,div){
	var obj = $("#"+id);
	var w = obj.width();
	var h = obj.height();
	var ww
	if(div)
		ww = $("#"+div).width();
	else
		ww = $(window).width();
	var wh = h*(ww/w);
	obj.css({"width":ww,"height":wh});
}