$(function(){
	//海燕奖-人气选手
	$(".rqxs01").css("height",($(window).height()/16-4.8)+"em"); 
	localStorage.sid = getSid();
	if(localStorage.sid){
		isStart(localStorage.sid);
		
		queryGroup();
	}
	
	
});

function isStart(telephone){
	var params = {};
	var text = JSON.stringify(params);
	executeAjax("0080001",text,function(data){
		var staffs = data.responseBody.staffs;
		if(staffs.length>0){
			var status = staffs[0].status;
			if(status =='' || status==null){
				jAlert("人气选手投票还未开始！");
				$('#popup_ok').click(function(){
					window.location.href="sys.html";
				});
			}else if(status == '2'){
				jAlert("人气投票已经结束！");
				$('#popup_ok').click(function(){
					window.location.href="sys.html";
				});
			}
		}else{
			jAlert("人气选手投票还未开始！");
			$('#popup_ok').click(function(){
				window.location.href="sys.html";
			});
		}
		
	});
}
function queryGroup(){
	var params = {};
	var text = JSON.stringify(params);
	executeAjax("0080005",text,function(data){
		var groups = data.responseBody.groups;
		var html='';
		for(var i in groups){
			html += ' <div class="rqxs01_b"><span class="rqxs01_but" onclick="selectGroup('+groups[i].id+')">'+groups[i].name+'</span> </div>';
		}
		$('#group').html(html);
	});
}

function selectGroup(num){
	var params = {};
	params['groupName'] = num;
	params['telephone']= localStorage.sid;
	var text = JSON.stringify(params);
	executeAjax("0080002",text,function(data){
		var counts = data.responseBody.counts;
		if(counts.length >0){
			jAlert("您已经投了"+counts[0].group.name+""+counts[0].name+"，不能三心二意哦！");
			return;
		}else{
			window.location.href="rqxs02.html?groupName="+num;
		}
	});
}