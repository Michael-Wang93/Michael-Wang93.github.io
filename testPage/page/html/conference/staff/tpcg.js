$(function(){
	var groupCode=getParam("groupCode");
	$('#groupCode').val(groupCode);
	localStorage.sid = getSid();
	if(localStorage.sid){
		isStart(localStorage.sid);
	}
});

function isStart(telephone){
	var params = {};
	var text = JSON.stringify(params);
	executeAjax("0080001",text,function(data){
		var staffs = data.responseBody.staffs;
		var groupStatus = staffs[0].groupStatus;
		if(groupStatus =='' || groupStatus==null){
			jAlert("我支持的小组投票还未开始！");
			window.location.href="sys.html";
		}else if(groupStatus == '2'){
			jAlert("我支持的小组投票已经结束！");
			window.location.href="sys.html";
		}else{
			isVote(telephone);
		}
	});
}

function isVote(telephone){
	var params = {};
	params["telephone"] = telephone;
	var text = JSON.stringify(params);
	executeAjax("0080002",text,function(data){
		var counts = data.responseBody.counts;
		if(counts.length>0){
			$('#error').css('display','block');
			$('#errorMsg2').html('您已经投了'+counts[0].group.name+'，<br>不能三心二意哦！');
		}else{
			$('#confirm').css('display','block');
			var groups = data.responseBody.groups;
			for(var i in groups){
				if($('#groupCode').val() == groups[i].code){
					$('#confirmMsg2').html(groups[i].name);
				}
			}
		}
	});
}

function confirmBut(){
	var params = {};
	var groupCode = $('#groupCode').val();
	params["telephone"] = localStorage.sid;
	params["groupName"] = groupCode;
	var text = JSON.stringify(params);
	executeAjax("0080003",text,function(data){
		if(data.responseBody.code =='1'){
			$('#confirm').css('display','none');
			$('#success').css('display','block');
		}else if(data.responseBody.code =='2'){
			jAlert("投票失败，请重新投票");
			$('#popup_ok').click(function(){
				window.location.href="sys.html";
			});
			
		}
		
	});
}

function thinkBut(){
	scanQRCode();
}