$(function(){
	//会议回执
	$(".hz").css("height",($(window).height()/16-7.3)+"em"); 
	myScroll = new iScroll('wrapper',{ hScrollbar: false, vScrollbar: false});
	$("#saveBtn").bind("click",saveData);
	var opt = {
	        preset: 'date', //日期
	        theme: 'android-ics light', //皮肤样式
	        display: 'modal', //显示方式 
	        mode: 'scroller', //日期选择模式
	        dateFormat: 'yy-mm-dd', // 日期格式
	        setText: '确定', //确认按钮名称
	        cancelText: '取消',//取消按钮名称
	        dateOrder: 'yymmdd', //面板中日期排列格式
	        dayText: '日', monthText: '月', yearText: '年', //面板中年月日文字
	        minDate: new Date(2014,06,01),
	        maxDate: new Date(2014,06,04),
//	        endYear:2020, //结束年份
	        onSelect:function(){
				if($("#getDate").val()!="" || $("#getDate").val()!="点击此处选择日期"){
					$("#getDate").removeClass("wid34");
					$("#getDate").addClass("wid35");
				}
			},
	        showOnFocus:false,
	        onBeforeShow:function(){
				document.getElementById('name').blur();
				document.getElementById('telephone').blur();
				 $("#getDate").focus();
			}
	    };
	var opt2 = {
	        preset: 'date', //日期
	        theme: 'android-ics light', //皮肤样式
	        display: 'modal', //显示方式 
	        mode: 'scroller', //日期选择模式
	        dateFormat: 'yy-mm-dd', // 日期格式
	        setText: '确定', //确认按钮名称
	        cancelText: '取消',//取消按钮名称
	        dateOrder: 'yymmdd', //面板中日期排列格式
	        dayText: '日', monthText: '月', yearText: '年', //面板中年月日文字
	        minDate: new Date(2014,06,04),
	        maxDate: new Date(2014,06,10),
//	        endYear:2020, //结束年份
	        onSelect:function(){
				if($("#leaveDate").val()!="" || $("#leaveDate").val()!="点击此处选择日期"){
					$("#leaveDate").removeClass("wid34");
					$("#leaveDate").addClass("wid35");
				}
			},
	        showOnFocus:false,
	        onBeforeShow:function(){
				document.getElementById('name').blur();
				document.getElementById('telephone').blur();
				 $("#leaveDate").focus();
			}
	    };
	var opt3 = {
	        preset: 'time', //日期
	        theme: 'android-ics light', //皮肤样式
	        display: 'modal', //显示方式 
	        mode: 'scroller', //日期选择模式
	        dateFormat: 'yyyy-mm-dd', // 日期格式
	        setText: '确定', //确认按钮名称
	        cancelText: '取消',//取消按钮名称
	        dateOrder: 'yymmdd', //面板中日期排列格式
	        timeWheels:'HH',
	        timeFormat:'HH',
	        dayText: '日', monthText: '月', yearText: '年', hourText: '时',//面板中年月日文字
//	        dayText: '日', monthText: '月', yearText: '年', //面板中年月日文字
	        minDate: new Date(2014,06,01,00,00,00),
	        maxDate: new Date(2014,06,10,23,00,00),
//	        endYear:2020, //结束年份
	        onSelect:function(){
				if($("#reGetDate").val()!="" || $("#reGetDate").val()!="点击此处输入"){
					$("#reGetDate").removeClass("wid34");
					$("#reGetDate").addClass("wid35");
					$("#reGetDate").val($("#reGetDate").val()+":00:00");
				}
			},
	        showOnFocus:false,
	        onBeforeShow:function(){
				document.getElementById('name').blur();
				document.getElementById('telephone').blur();
				 $("#reGetDate").focus();
			}
	    };
	var opt4 = {
	        preset: 'time', //日期
	        theme: 'android-ics light', //皮肤样式
	        display: 'modal', //显示方式 
	        mode: 'scroller', //日期选择模式
	        dateFormat: 'yy-mm-dd', // 日期格式
	        setText: '确定', //确认按钮名称
	        cancelText: '取消',//取消按钮名称
	        dateOrder: 'yymmdd', //面板中日期排列格式
	        timeWheels:'HH',
	        timeFormat:'HH',
	        dayText: '日', monthText: '月', yearText: '年', hourText: '时',//面板中年月日文字
//	        dayText: '日', monthText: '月', yearText: '年', //面板中年月日文字
	        minDate: new Date(2014,06,01,00,00,00),
	        maxDate: new Date(2014,06,10,23,00,00),
//	        endYear:2020, //结束年份
	        onSelect:function(){
				if($("#releaveDate").val()!="" || $("#releaveDate").val()!="点击此处输入"){
					$("#releaveDate").removeClass("wid34");
					$("#releaveDate").addClass("wid35");
					$("#releaveDate").val($("#releaveDate").val()+":00:00");
				}
			},
	        showOnFocus:false,
	        onBeforeShow:function(){
				document.getElementById('name').blur();
				document.getElementById('telephone').blur();
				 $("#releaveDate").focus();
			}
	    };
	$("#getDate").scroller(opt);
	$("#leaveDate").scroller(opt2);
	$("#reGetDate").scroller(opt3);
	$("#releaveDate").scroller(opt4);
	
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
//	localStorage.removeItem(sid);
//	localStorage.sid = getSid();
//	if(localStorage.sid){
//		querySaffList(localStorage.sid);
//	}
});

//初始化查询
function querySaffList(telephone){
	var params = {};
	params["telephone"] = telephone;
	var text = JSON.stringify(params);
	showLoading();
	executeAjax("0010001",text,function(data){
		closeLoading();
		var conferenceReceipt = data.responseBody.conferenceReceiptList[0];
		var status = conferenceReceipt.status;
//		if(status=='1'){
			$("#name").val(conferenceReceipt.name);
			if(conferenceReceipt.sex=='1'){
				$("#sex_dummy").val("男");
				
			}else{
				$("#sex_dummy").val("女");
			}
			
			$("#telephone").val(conferenceReceipt.telephone);
			var getDate = conferenceReceipt.getDate;
			$("#getDate").val(new Date(getDate).Format("yyyy-MM-dd"));
			$("#getDate").removeClass("wid34");
			$("#getDate").addClass("wid35");
			var hour = new Date(conferenceReceipt.regetDate).getHours();
			if(hour<=9){
				hour = "0"+hour;
			}
			$("#reGetDate").val(hour +":00:00");
			$("#reGetDate").removeClass("wid34");
			$("#reGetDate").addClass("wid35");
			$("#leaveDate").val(new Date(conferenceReceipt.leaveDate).Format("yyyy-MM-dd"));
			$("#leaveDate").removeClass("wid34");
			$("#leaveDate").addClass("wid35");
			
			var hour1 = new Date(conferenceReceipt.releaveDate).getHours();
			if(hour1<=9){
				hour1 = "0"+hour1;
			}
			$("#releaveDate").val(hour1+":00:00");
			$("#releaveDate").removeClass("wid34");
			$("#releaveDate").addClass("wid35");
			
			$('#name').attr("readonly", "readonly");
			$("#sex").mobiscroll('disable');
			$('#telephone').attr("readonly", "readonly");
//		}
	});
}

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
	var getDate = $("#getDate").val();
	var reGetDate = $("#reGetDate").val();
	var leaveDate = $("#leaveDate").val();
	var reLeaveDate = $("#releaveDate").val();

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
	if ($("#getDate").val() == "" || "点击此处选择日期" == $("#getDate").val()) {
		jAlert("请选择到达日期");
		return;
	}
	if ($("#reGetDate").val() == "" || "点击此处输入" == $("#reGetDate").val()) {
		jAlert("请选择预计到达酒店时间");
		return;
	}
	if ($("#leaveDate").val() == "" || "点击此处选择日期" == $("#leaveDate").val()) {
		jAlert("请选择出发时间");
		return;
	}
	if ($("#releaveDate").val() != "" && "点击此处输入" == $("#releaveDate").val()) {
		jAlert("请选择预计离开酒店时间");
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
	params["getDate"] = getDate;
	params["reGetDate"] = getDate+" "+reGetDate;
	params["leaveDate"] = leaveDate;
	params["reLeaveDate"] = leaveDate+" "+reLeaveDate;
	params["flag"] = '0';

	jConfirm("是否确定？<br/>", "提示", function(flag) {
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


//对Date的扩展，将 Date 转化为指定格式的String
//月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符， 
//年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字) 
//例子： 
//(new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423 
//(new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18 
Date.prototype.Format = function(fmt) { // author: meizz
	var o = {
		"M+" : this.getMonth() + 1, // 月份
		"d+" : this.getDate(), // 日
		"h+" : this.getHours(), // 小时
		"m+" : this.getMinutes(), // 分
		"s+" : this.getSeconds(), // 秒
		"q+" : Math.floor((this.getMonth() + 3) / 3), // 季度
		"S" : this.getMilliseconds()
	// 毫秒
	};
	if (/(y+)/.test(fmt))
		fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "")
				.substr(4 - RegExp.$1.length));
	for ( var k in o)
		if (new RegExp("(" + k + ")").test(fmt))
			fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k])
					: (("00" + o[k]).substr(("" + o[k]).length)));
	return fmt;
}


var i = 3;
function out(){
  if (i>0){
    i--;
  }else{
    location.href="../index.html";
  }
}
