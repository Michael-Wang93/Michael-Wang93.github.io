$(function(){
	$("title").html("太平洋寿险2015年度个险条线工作会议");
	//if(getCookie("reqNo")==""&&window.location.href.indexOf("login.html")<0){
	//	var domain=location.href.substring(0,location.href.indexOf("/html/"));
	///	window.location.href=domain+"/html/login.html";
	//}
});
function onBridgeReady() {
	var domain=location.href.substring(0,location.href.indexOf("/html/"));
	var url = domain+"/html/index.html";
	var imgurl = domain+"/img/cpic.png";
	WeixinJSBridge.on('menu:share:appmessage', function(argv) 
	{
		WeixinJSBridge.invoke('sendAppMessage',{
			"link":url,
			"img_url":imgurl,
			"desc":"微会议  微服务\n\n点开即用  敬请收藏",
			"title":$("title").text()
		}, function(res) {
			WeixinJSBridge.log(res.err_msg);
		});
	});
	WeixinJSBridge.on('menu:share:timeline', function(argv) 
	{
	WeixinJSBridge.invoke("shareTimeline",{
		"link":url,
		"img_url":imgurl,
		"desc":"微会议  微服务\n\n点开即用  敬请收藏",
		"title":$("title").text()
		},
		function(e){
			WeixinJSBridge.log(e.err_msg);
		})
	});
}

function  scanQRCode(){
	WeixinJSBridge.invoke("scanQRCode",{
	});
}

if (typeof WeixinJSBridge === "undefined"){
	if (document.addEventListener){
		document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
	}
}else{
	onBridgeReady();
}

function showDiv(id, e) {
	$.openPopupLayer( {
		name : id,
		target : id
	});
}
function closeDiv(id) {
	$.closePopupLayer(id);
}

function generateParams(transCode,requestBodyJson){
	var request = {};
	request["clientId"]='123';//设备号
	request["transCode"]=transCode;//交易代码
	request["channelCode"]="accessTest";//请求来源
	request["requestNo"]=request["clientId"]+""+(new Date()).getTime();//请求号  要保证每一次，
	request["empNo"] = '123';
	request["encryptValue"]=(getCookie("reqNo")==""?"1":getCookie("reqNo")); //请求号+MAN  要保证每一次，
	request["sessionToken"]="";
	request["sessionRandom"]="";
	request["businessparams"]="";
	request["requestBodyJson"]=requestBodyJson;
	return request;
}

function executeAjax2(transCode,requestParams,callback){
	//if(getCookie("reqNo")==""&&window.location.href.indexOf("login.html")<0)
	//	return;
	var request = generateParams(transCode,requestParams);
	$.ajax({
		url:"/conference/access/doSubmit.do",
		type:"post",
		data:request,
		cache: false,
		success:function(data){
			if(typeof data == "string")
				data = eval("("+data+")");
			if(data.responseBody==null){
				if(data.errorMsg!=null&&data.errorMsg!=""){
					var msg = data.errorMsg;
					alert('1111');
					if(msg=="encryptValue is not valid!"){
						var domain=location.href.substring(0,location.href.indexOf("/html/"));
						window.location.href=domain+"/html/login.html";
					}else{
						jAlert(msg);
						closeLoading();
					}
				}else{
					jAlert("系统繁忙！");
					closeLoading();
				}
			}else{
				callback(data);
			}
		},
		error:function(data){
			jAlert("系统繁忙！");
			if($("#loading_cen"))
				closeLoading();
		}
	});
}
t={};
t.ajax = executeAjax2;

//用来得到url地址里面的参数
function getParam(paras) {
	if(paras=="empNo"&&sessionStorage.empNo){
		return sessionStorage.empNo;
	}
	var url = location.href;
	url = url.charAt(url.length-1)=="#"?url.substring(0,url.length-1):url;
	var paraString = url.substring(url.indexOf("?") + 1, url.length).split("&");
	var paraObj = {};
	for (i = 0; j = paraString[i]; i++) {
		paraObj[j.substring(0, j.indexOf("=")).toLowerCase()] = j.substring(j
				.indexOf("=") + 1, j.length);
	}
	var returnValue = paraObj[paras.toLowerCase()];
	if (typeof (returnValue) == "undefined") {
		return "";
	} else {
		return returnValue;
	}
}

function checkedIdcard(value) {
	var idcard = value;
	if(idcard==""){
		return false;
	}
	var regex1 = /^[1-9][0-7]\d{4}((([0-9]{3}[1-9]|[0-9]{2}[1-9][0-9]{1}|[0-9]{1}[1-9][0-9]{2}|[1-9][0-9]{3})(((0[13578]|1[02])(0[1-9]|[12][0-9]|3[01]))|((0[469]|11)(0[1-9]|[12][0-9]|30))|(02(0[1-9]|[1][0-9]|2[0-8]))))|((([0-9]{2})(0[48]|[2468][048]|[13579][26])|((0[48]|[2468][048]|[3579][26])00))0229))\d{3}(\d|X|x)?$/;
	
	switch (idcard.length) {
	  case 15:
		if ( (parseInt(idcard.substr(6,2))+1900) % 4 == 0 || ((parseInt(idcard.substr(6,2))+1900) % 100 == 0 && (parseInt(idcard.substr(6,2))+1900) % 4 == 0 )){
			var regex2 = /^[1-9][0-9]{5}[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}$/;//测试出生日期的合法性
		} else {
			var regex2 = /^[1-9][0-9]{5}[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))[0-9]{3}$/;//测试出生日期的合法性
		}

		if(regex2.test(idcard)) 
			return true;
		else 
			return false;
		break; 
	  case 18:
	 	 if(regex1.test(idcard)){
	 		idcard = idcard.split("");
			var S = (parseInt(idcard[0]) + parseInt(idcard[10])) * 7 + (parseInt(idcard[1]) + parseInt(idcard[11])) * 9 + (parseInt(idcard[2]) + parseInt(idcard[12])) * 10 + (parseInt(idcard[3]) + parseInt(idcard[13])) * 5 + (parseInt(idcard[4]) + parseInt(idcard[14])) * 8 + (parseInt(idcard[5]) + parseInt(idcard[15])) * 4 + (parseInt(idcard[6]) + parseInt(idcard[16])) * 2 + parseInt(idcard[7]) * 1 + parseInt(idcard[8]) * 6 + parseInt(idcard[9]) * 3;
			var Y = S % 11;
			var M = "F";
			var JYM = "10X98765432";
			M = JYM.substr(Y, 1);
			/*判断校验位*/
			if (M == idcard[17].toUpperCase()) {
				return true;
			} else {
				return false;
			}
		}else{
			return false;
		}
		break;
	  default:
		return false;
	}
}

function getBirthdayFromIdCard(idcard){
	var birthdayFromIdcard="";
	if(idcard.length==18){
		birthdayFromIdcard=isValidityBrithBy18IdCard(idcard);
	}else if(idcard.length==15){
		birthdayFromIdcard="19"+isValidityBrithBy15IdCard(idcard);
	}
	return birthdayFromIdcard;
}
function isValidityBrithBy18IdCard(idCard18){   
	var year = idCard18.substring(6, 10);   
   var month = idCard18.substring(10, 12);   
	var day = idCard18.substring(12, 14); 
	// var temp_date = new Date(year, parseFloat(month)-1, parseFloat(day));
	return year+"-"+month+"-"+day;
}
function isValidityBrithBy15IdCard(idCard15){   
	var year = idCard15.substring(6, 8);   
	var month = idCard15.substring(8, 10);   
    var day = idCard15.substring(10, 12);   
	return year+"-"+month+"-"+day;
}
function getGenderByIdCard(idCard) {
	idCard = $.trim(idCard.replace(/ /g, ""));// 对身份证号码做处理。包括字符间有空格。
	if (idCard.length == 15) {
		if (idCard.substring(14, 15) % 2 == 0) {
			return '0';
		} else {
			return '1';
		}
	} else if (idCard.length == 18) {
		if (idCard.substring(16, 17) % 2 == 0) {
			return '0';
		} else {
			return '1';
		}
	} else {
		return "";
	}
}
function checkedAge(){
	var age = $("#age").val();
	if(age=="")
		return;
	if(!(/\d/.test(age)&&age>0)){
		jAlert("请输入正确的年龄！");
		return false;
	}
	return true;
}

function checkedMobile(){
	if($("#telNo").val()=="")
		return;
	if(!(/^(13|14|15|18)\d{9}$/.test($("#telNo").val()))){
		jAlert("请输入正确的手机号码！");
		return false;
	}
	return true;
}

function checkedZipcode(){
	if($("#zipCode").val()=="")
		return;
	if(!(/^[0-9]\d{5}$/.test($("#zipCode").val()))){
		jAlert("请输入正确的邮政编码！");
		return false;
	}
	return true;
}

function checkedEmail(){
	if($("#email").val()=="")
		return;
	if(!(/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test($("#email").val()))){
		jAlert("请输入正确的电子邮箱！");
		return false;
	}
	return true;
}

function checkedPhone(){
	if($("#otherPhone").val()=="")
		return;
	if(!(/^((0\d{2,3})-)(\d{7,8})$/.test($("#otherPhone").val()))){
		jAlert("请输入正确的电话号码,如021-11111111！");
		return false;
	}
	return true;
}

function getSid(){
	if (!localStorage.sid) {
		localStorage.sid = getCookie("sid");
	}
	return localStorage.sid;
}

function addCookie(name,value,expiresHours){
	var cookieString=name+"="+escape(value); 
	if(expiresHours>0){
		var date=new Date();
		date.setTime(date.getTime()+expiresHours*24*3600*1000); 
		cookieString=cookieString+"; expires="+date.toGMTString(); 
	}
	document.cookie=cookieString+";path=/";
}

function getCookie(name){ 
		var strCookie=document.cookie; 
		var arrCookie=strCookie.split("; "); 
		for(var i=0;i<arrCookie.length;i++){ 
			var arr=arrCookie[i].split("="); 
			if(arr[0]==name)
				return arr[1]; 
		} 
		return ""; 
	}