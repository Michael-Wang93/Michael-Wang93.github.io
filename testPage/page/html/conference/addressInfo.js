$(function(){
	//通讯录
	$(".txl").css("height",($(window).height()/16-5.7)+"em"); 
	$("#searchBtn").bind("click",queryAddressInfo);
	queryAddressInfo();
});


function queryAddressInfo() {
	var html = '';
	var params = {};
	var name = $("#name").val();
	if(name == '输入姓名或分公司'){
		name = "";
	}
	params['name'] = name;

	var text = JSON.stringify(params);
	executeAjax(
			"0010004",
			text,
			function(data) {
				var groups = data.responseBody.conferenceReceiptList;
				html += "<div>"
				for ( var i = 0; i < groups.length; i++) {
					var info = groups[i];
					var telephone = info.telephone;
					var tt = "13916390474,13801856316,13918394080";
					if(tt.indexOf(telephone)>-1){
						telephone = telephone.substring(0,3)+"****"+telephone.substring(7,11);
					}
					if (i % 2 == 0) {
						html += ' <div class="hwz_c1"><table class="hwz_tab" width="100%"> <tr> <td width="5%"></td> <td width="30%">'
								+ info.name
								+ '</td> <td width="22%"></td><td width="33%">'
								+ info.orgName
								+ '</td> </tr>';
						if (telephone != null && telephone.length > 11) {
							var s = new Array();
							s = telephone.split("|");
							html += '<tr><td></td><td><a href="tel:'+(s[0] == null ? "" : s[0])+'">'+(s[0] == null ? "" : s[0])+'</a></td><td>&nbsp;</td> <td>&nbsp;</td></tr>'
							html += '<tr> <td></td> <td><a href="tel:'+(s[1] == null ? "" : s[1])+'">'+(s[1] == null ? "" : s[1])+'</a></td>';
						}else{
							html += '<tr> <td></td> <td><a href="tel:'+(telephone == null ? "" : telephone)+'">'+(telephone == null ? "" : telephone)+'</a></td>';
						}
						html +='<td></td> <td>'+(info.roomNo == null ? "" : info.roomNo)+'</td></tr> </table></div>';
					} else {
						html += ' <div class="hwz_c2"><table class="hwz_tab" width="100%"> <tr> <td width="5%"></td> <td width="30%">'
								+ info.name
								+ '</td> <td width="22%"></td><td width="33%">'
								+ info.orgName
								+ '</td> </tr>';
						if (telephone != null && telephone.length > 11) {
							var s = new Array();
							s = telephone.split("|");
							html += '<tr><td></td><td><a href="tel:'+(s[0] == null ? "" : s[0])+'">'+(s[0] == null ? "" : s[0])+'</a></td><td>&nbsp;</td> <td>&nbsp;</td></tr>'
							html += '<tr> <td></td> <td><a href="tel:'+(s[1] == null ? "" : s[1])+'">'+(s[1] == null ? "" : s[1])+'</a></td>';
						}else{
							html += '<tr> <td></td> <td><a href="tel:'+(telephone == null ? "" : telephone)+'">'+(telephone == null ? "" : telephone)+'</a></td>';
						}
						html +='<td></td> <td>'+(info.roomNo == null ? "" : info.roomNo)+'</td></tr> </table></div>';
					}

				}
				html += "</div>"
				$(".txl").html(html);
				myScroll = new iScroll('wrapper', {
					hScrollbar : false,
					vScrollbar : false
				});
			});
}

function clearQueryString(){
	if($("#name").val() != "" && "输入姓名或分公司" == $("#name").val()){
		$("#name").val("");
		$("#name").removeClass("txl_ser_r01");
	}
}

function addQueryString(){
	if($("#name").val() == ""){
		$("#name").addClass("txl_ser_r01");
		$("#name").val("输入姓名或分公司");
	}
}