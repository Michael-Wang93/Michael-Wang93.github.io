$(function(){
	//会务组
	$(".hwz").css("height",($(window).height()/16-2.2)+"em");  
	
	myScroll =new iScroll('wrapper',{ hScrollbar: false, vScrollbar: false});
	
	queryBizGroup();
});


function queryBizGroup(){
	var html='';
	var params = {};
	var text = JSON.stringify(params);
	executeAjax("0090001",text,function(data){
		var groups = data.responseBody.groups;
		for(var i = 0; i < groups.length;i++){
			var info = groups[i];
			if(!info.conpetency){
				info.conpetency='';
			}			
			if(i%2==0){
				html += ' <div class="hwz_c1"><table class="hwz_tab"> <tr> <td></td> <td>'+info.name+'</td> <th></th><td>'+info.conpetency+'</td> </tr><tr> <td></td> <td><a href="tel:'+info.telephone+'">'+info.telephone+'</a></td> <th>&nbsp;</th> <td>&nbsp;</td></tr> </table></div>';
			}else{
				html += ' <div class="hwz_c2"><table class="hwz_tab"> <tr> <td></td> <td>'+info.name+'</td> <th></th><td>'+info.conpetency+'</td> </tr><tr> <td></td> <td><a href="tel:'+info.telephone+'">'+info.telephone+'</a></td> <th>&nbsp;</th> <td>&nbsp;</td></tr> </table></div>';
			}
			
		}
		$(".context").html(html);
		
	});
}