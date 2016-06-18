$(function(){
	
	//调用顶部图片自伸缩
	var hg = generatePhoto("photo1","divpt");
 	$(window).resize(function(){
 		generatePhoto("photo1");
 	});
	
	//算高度
	$(".con_heig").css("height",(($(window).height()-hg-30)/16)+"em");
	var somediv=document.getElementById("wrapper");
	disableSelection(somediv);//设置文本内容不被选中
	//首页
	myScroll = new iScroll('wrapper',{ hScrollbar: false, vScrollbar: false});
//	$("#photo1").bind("click",enterTest);
//	localStorage.sid = getSid();
//	queryNowDate();
//	$("#prompt").bind("click",promptMessage);
});

function queryNowDate(){
	var params = {};
	var text = JSON.stringify(params);
	showLoading();
	executeAjax("0010003",text,function(data){
		var now = data.responseBody.nowDate;
		var str1 = new Date("2014/06/25 23:59:59").getTime();
		if(now < str1){
			$("#receipt").bind("click",function(){
				window.location.href='conference/receipt.html'
			});
			
		}else{ //6月25号之后，回执功能灰掉，如localStorage，cookie失效，则进入补录回执页面
//			 $("#receipt").unbind("click");
//			 $("#receipt1").addClass("in_ic022");
			$("#receipt").bind("click",function(){
				window.location.href='conference/receipt.html'
			});
			
//			 if(!localStorage.sid){
				 $("#seat").bind("click",goToReceipt02).removeAttr("onclick");
//				 $("#dzcqBtn").bind("click",goToReceipt02).removeAttr("onclick");
				 $("#mapBtn").bind("click",goToReceipt02).removeAttr("onclick");
				 $("#agendaBtn").bind("click",goToReceipt02).removeAttr("onclick");
				 $("#notes").bind("click",goToReceipt02).removeAttr("onclick");
//				 $("#signBtn").bind("click",goToReceipt02).removeAttr("onclick");
//			 }
			 
			 
		}
		closeLoading();
	});
}
//6月25号之前，除‘会议回执功能’，其他功能无法使用
function showMessage(){
	jAlert("请参会者先回复回执，谢谢！");
	return;
}

//如localStorage，cookie失效，则进入补录回执页面
function goToReceipt02(){
	window.location.href='conference/receipt02.html';
}


function goTo(message){
	
	if (message == 'notes') {
		window.location.href = 'conference/notes.html';
	}else if(message == 'agenda'){
		window.location.href='conference/agenda.html';
	}else if(message == 'seat'){
		window.location.href='conference/seat.html';
	}else if(message == 'map'){
		window.location.href='conference/map.html';
	}
//		}else if(message == 'sign'){
//			scanQRCode();
//		}else if(message == 'sys'){
//			isStart(localStorage.sid);
//			
//		}
		
}

function promptMessage(){
	jAlert("点击右上角按钮进行收藏");
}

function isStart(telephone){
	var params = {};
	var text = JSON.stringify(params);
	executeAjax("0080001",text,function(data){
		var staffs = data.responseBody.staffs;
		if(staffs.length >0){
			var status = staffs[0].status;
			var groupStatus = staffs[0].groupStatus;
			if(status ==null && groupStatus==null){
				jAlert("海燕奖投票还未开始！");
				return;
			}else if(status == '2' && groupStatus=='2'){
				jAlert("海燕奖投票已经结束！");
				return;
			}else{
				window.location.href='conference/staff/sys.html';
			}
		}else{
			jAlert("海燕奖投票还未开始！");
			return;
		}
		
	});
}

//弹出框

function showDiv(id,e){
$.openPopupLayer({
		name: id,
		target: id
	});
myScroll.refresh();
myScroll1.refresh();
myScroll2.refresh();
myScroll3.refresh();
myScroll4.refresh();
myScroll5.refresh();
myScroll6.refresh();
myScroll7.refresh();
myScroll8.refresh();



}
function closeDiv(id){
$.closePopupLayer(id);
}




//超出滚动 

var myScroll;
function loaded() {
	myScroll = new iScroll('wrapper',{ hScrollbar: false, vScrollbar: false});
}
	window.addEventListener('DOMContentLoaded', function () { setTimeout(loaded, 200); }, false);
	
//	var myScroll1;
//function loaded1() {
//	myScroll1 = new iScroll('wrapper1',{ hScrollbar: false, vScrollbar: false});
//}
//	window.addEventListener('DOMContentLoaded', function () { setTimeout(loaded1, 200); }, false);
//	
//	var myScroll2;
//function loaded2() {
//	myScroll2 = new iScroll('wrapper2',{ hScrollbar: false, vScrollbar: false});
//}
//	window.addEventListener('DOMContentLoaded', function () { setTimeout(loaded2, 200); }, false);
//	
//	var myScroll3;
//function loaded3() {
//	myScroll3 = new iScroll('wrapper3',{ hScrollbar: false, vScrollbar: false});
//}
//	window.addEventListener('DOMContentLoaded', function () { setTimeout(loaded3, 200); }, false);
//	
//	var myScroll4;
//function loaded4() {
//	myScroll4 = new iScroll('wrapper4',{ hScrollbar: false, vScrollbar: false});
//}
//	window.addEventListener('DOMContentLoaded', function () { setTimeout(loaded4, 200); }, false);
//
//	var myScroll5;
//function loaded5() {
//	myScroll5 = new iScroll('wrapper5',{ hScrollbar: false, vScrollbar: false});
//}
//	window.addEventListener('DOMContentLoaded', function () { setTimeout(loaded5, 200); }, false);
//
//	var myScroll6;
//function loaded6() {
//	myScroll6 = new iScroll('wrapper6',{ hScrollbar: false, vScrollbar: false});
//}
//	window.addEventListener('DOMContentLoaded', function () { setTimeout(loaded6, 200); }, false);
//
//
//	var myScroll7;
//function loaded7() {
//	myScroll7 = new iScroll('wrapper7',{ hScrollbar: false, vScrollbar: false});
//}
//	window.addEventListener('DOMContentLoaded', function () { setTimeout(loaded7, 200); }, false);
//
//
//	var myScroll8;
//function loaded8() {
//	myScroll8 = new iScroll('wrapper8',{ hScrollbar: false, vScrollbar: false});
//}
//	window.addEventListener('DOMContentLoaded', function () { setTimeout(loaded8, 200); }, false);



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
	return wh;
}

function disableSelection(target){
	if (typeof target.onselectstart!="undefined") //IE route
		target.onselectstart=function(){return false}
	else if (typeof target.style.MozUserSelect!="undefined") //Firefox route
		target.style.MozUserSelect="none"
	else //All other route (ie: Opera)
		target.onmousedown=function(){return false}
	}

function enterTest(){
	window.location.href = 'conference/exam.html';
}
