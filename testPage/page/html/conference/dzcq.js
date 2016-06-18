$(function(){
	//电子餐券
	$(".cq").css("height",($(window).height()/16-4.25)+"em"); 
	$(".cq_w").css("height",($(window).height()/16-32.3)+"em");
	
	queryDzcq();
});

function queryDzcq(){
	var params = {};
	var text = JSON.stringify(params);
	executeAjax("0050001",text,function(data){
		var code = data.responseBody.code;
		if(code=='0'){
			var str = "<p calss='xz_font' style='text-indent:2em'>"+data.responseBody.message+"</p>";
//			str += "<p class='cq_f'>用餐时请向服务人员出示该图片</p>";
	        $("#showDiv").append(str);
		}
	});
}