var myScroll;
$(function(){
	//海燕奖-人气选手
	$(".rqxs02").css("height",($(window).height()/16-4.8)+"em");  
	var groupName=getParam("groupName");
	localStorage.sid = getSid();
	getGroupPerson(groupName,localStorage.sid);
	
});

function getGroupPerson(groupName,telephone){
	var params = {};
	params['groupName'] = groupName;
	var text = JSON.stringify(params);
	executeAjax("0080001",text,function(data){
		var staffs = data.responseBody.staffs;
		var html='';
		if(staffs.length > 0){
			for( var i = 0;i<staffs.length;i++){
				var info = staffs[i];
				var purl = info.purl;
				var name = info.name;
				var groupId = info.group.id;
				var memberNo = info.memberNo;
				html +=' <div class="rqxs02_b"><div class="rqxs02_bb"><span class="rqxs02_ph"><img src="../../../img/staff/'+purl+'.jpg" width="225" height="225" onclick="selectrqxs(&apos;'+groupId+'&apos;,&apos;'+name+'&apos;,&apos;'+memberNo+'&apos;)">'
				       +'</span><span class="rqxs02_f">'+memberNo+'号 '+name+'</span></div></div>';
			}
		}
		$('#contextrqxs').prepend(html);
		myScroll =new iScroll('wrapper',{ hScrollbar: false, vScrollbar: false});
	});
	
}

function selectrqxs(groupId,name,memberNo){
	jConfirm("是否确定投票？", "提示", function(flag) {
		if (flag) {
			showLoading();
			var params1 = {};
			params1['groupName'] = groupId;
			params1['telephone']= localStorage.sid;
			var text1 = JSON.stringify(params1);
			executeAjax("0080002",text1,function(data){
				var counts = data.responseBody.counts;
				if(counts.length >0){
					closeLoading();
					jAlert("您已经投了"+counts[0].group.name+""+counts[0].name+"，不能三心二意哦！");
					return;
				}else{
					var params = {};
					params["groupName"] = groupId;
					params["name"] = name;
					params["memberNo"] = memberNo;
					params["telephone"] = localStorage.sid;
					var text = JSON.stringify(params);
					executeAjax("0080003",text,function(data){
						closeLoading();
						if(data.responseBody.code =='1'){
							jAlert("恭喜您已经投票成功！");
							$('#popup_ok').click(function(){
								window.location.href="rqxs01.html";
							});
							
						}else if(data.responseBody.code =='2'){
							jAlert("投票失败，请重新投票");
							$('#popup_ok').click(function(){
								window.location.href="rqxs01.html";
							});
							
						}
						
					});
				}
			});
			
		}
	});
	
}