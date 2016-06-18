$(function(){
	localStorage.sid = getSid();
	if(localStorage.sid){
		isStart(localStorage.sid);
	}
	
	myScroll =new iScroll('wrapper',{ hScrollbar: false, vScrollbar: false});
});

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
				$('#popup_ok').click(function(){
					window.open('../../index.html','_self');
				});
			}else if(status == '2' && groupStatus=='2'){
				jAlert("海燕奖投票已经结束！");
				$('#popup_ok').click(function(){
					window.open('../../index.html','_self');
				});
			}
		}else{
			jAlert("海燕奖投票还未开始！");
			$('#popup_ok').click(function(){
				window.open('../../index.html','_self');
			});
		}
		
	});
}