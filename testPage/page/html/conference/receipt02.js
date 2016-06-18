$(function(){
	//会议补录回执
	$(".hz").css("height",($(window).height()/16-7.3)+"em"); 
	myScroll = new iScroll('wrapper',{ hScrollbar: false, vScrollbar: false});
	$("#saveBtn").bind("click",saveData);
	var opt1 = {
			inputClass:"main_input wid34",//自动生成的输入框的样式
			label:"请选择性别",//title
	        preset: 'select', //选择框
	        theme: 'android-ics light', //皮肤样式
	        display: 'modal', //显示方式 
	        mode: 'scroller', //选择模式
	        setText: '确定', //确认按钮名称
	        cancelText: '取消',//取消按钮名称
	        onSelect:function(){
				if($("#sex").val()!=""){
					$("#sex_dummy").removeClass("wid34");
					$("#sex_dummy").addClass("wid35");
				}else{
					$("#sex_dummy").removeClass("wid35");
					$("#sex_dummy").addClass("wid34");
				}
			},
	        showOnFocus:false,
	        onBeforeShow:function(){
				document.getElementById('name').blur();
				document.getElementById('telephone').blur();
				 $("#sex").focus();
			}
	    };
	$("#sex").scroller(opt1);
});


/**
 * 清理文本框里默认内容
 * @return
 */
function clearQueryString(flag){
	if(flag=="1" && $("#name").val() != "" && "点击此处输入姓名" == $("#name").val()){
		$("#name").val("");
		$("#name").removeClass("wid34");
		$("#name").addClass("wid35");
		$("#name").css("width","75%");
	}
	if(flag=="3" && $("#telephone").val() != "" && "点击此处输入" == $("#telephone").val()){
		$("#telephone").val("");
		$("#telephone").removeClass("wid34");
		$("#telephone").addClass("wid35");
	}
}

/**
 * 增加文本框里默认内容
 * @return
 */
function addQueryString(flag){
	if(flag=="1" && $("#name").val() == ""){
		$("#name").removeClass("wid35");
		$("#name").addClass("wid34");
		$("#name").val("点击此处输入姓名");
	}
	if(flag=="3"){
		if($("#telephone").val() == ""){
			$("#telephone").removeClass("wid35");
			$("#telephone").addClass("wid34");
			$("#telephone").val("点击此处输入");
		}else{
			if(!/^(13|14|15|18)\d{9}$/.test($("#telephone").val())){
				jAlert("请输入正确的手机号！");
				return;
			}
		}
	}
}

/**
 * 提交数据
 */
function saveData(){
	var params = {};
	var name = $("#name").val();
	var sex = $("#sex_dummy").val();
	var telephone = $("#telephone").val();

	if ($("#name").val() == "" || "点击此处输入姓名" == $("#name").val()) {
		jAlert("请输入姓名");
		return;
	}
	if (sex == "" || "请选择" == sex) {
		jAlert("请选择性别");
		return;
	}
	if ($("#telephone").val() == "" || "点击此处输入" == $("#telephone").val()) {
		jAlert("请输入手机号码");
		return;
	}
	if (!/^(13|14|15|18)\d{9}$/.test($("#telephone").val())) {
		jAlert("请输入正确的手机号！");
		return;
	}

	if(sex=='男'){
		sex='1';
		
	}else{
		sex='0';
	}
	params["name"] = name;
	params["sex"] = sex;
	params["telephone"] = telephone;
	params["flag"] = '1';

	jConfirm("是否确定？", "提示", function(flag) {
		if (flag) {
			var text = JSON.stringify(params);
			showLoading();
			executeAjax("0010002", text, function(data) {
				closeLoading();
				var code = data.responseBody.code;
				if (code == '0') {
//					localStorage.sid = data.responseBody.telephone;
//					addCookie("sid",data.responseBody.telephone,30);
					jAlert(data.responseBody.message);
					setInterval('out()',1000);
				} else {
					jAlert(data.responseBody.message);
				}
			});
		}
	});
}

var i = 3;
function out(){
  if (i>0){
    i--;
  }else{
    location.href="../index.html";
  }
}
