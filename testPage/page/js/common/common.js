$(function(){
	$("title").html("集团工作会议");

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

function generateParams(transCode,requestBodyJson){
	var request = {};
	request["clientId"]='123';//设备号
	request["transCode"]=transCode;//交易代码
	request["channelCode"]="accessTest";//请求来源
	request["requestNo"]=request["clientId"]+""+(new Date()).getTime();//请求号  要保证每一次，
	request["empNo"] = '123';
	request["encryptValue"]="Abcwo29480CAei4859ee2123"; //请求号+MAN  要保证每一次，
	request["sessionToken"]="";
	request["sessionRandom"]="";
	request["businessparams"]="";
	request["requestBodyJson"]=requestBodyJson;
	return request;
}

function executeAjax(transCode,requestParams,callback){
	//if(getCookie("desc")==""&&window.location.href.indexOf("login.html")<0)
	//	return;
	var request = generateParams(transCode,requestParams);
	$.ajax({
		url:"/jituan/access/doSubmit.do",
		type:"post",
		data:request,
		cache: false,
		success:function(data){
			if(typeof data == "string")
				data = eval("("+data+")");
			if(data.responseBody==null){
				if(data.errorMsg!=null&&data.errorMsg!=""){
					var msg = data.errorMsg;
					if(msg=="encryptValue is not valid!"){
						var domain=location.href.substring(0,location.href.indexOf("/html/"));
						window.location.href=domain+"/html/index.html";
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
t.ajax = executeAjax;

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
function goToIndexPage(){
	var domain=location.href.substring(0,location.href.indexOf("/html/"));
	var url=domain+"/html/index.html?id=3";
	window.open(url,'_self');
	//window.location.href=domain+"/html/index.html"+"?"+(Math.random()*1000);
}