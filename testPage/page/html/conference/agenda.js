$(function(){
	//会议议程
	index=request.QueryString("index");
	$(".yc").css("height",($(window).height()/16-6.6)+"em"); 
	getAgenda();
	
	var elem = document.getElementById('mySwipe');
	window.mySwipe = Swipe(elem, {
	   //startSlide: 0,
	  // auto: 3000,
	  // continuous: true,
	  // disableScroll: true,
	   stopPropagation: true,
	   callback: function(index, element) {
		   if(index>=0 && index<agendaDates.length){
			   $(".yc_date_f").html(getDate(agendaDates[index]));
			   if(index==0){
				   $('.yc_arr04').removeClass("displayN");
				   $('.yc_arr02').addClass("displayN");
			   }
			   else if(index==agendaDates.length-1){
				   $('.yc_arr02').removeClass("displayN");
				   $('.yc_arr04').addClass("displayN");
			   }
			   else{
				   $('.yc_arr02').removeClass("displayN");
				   $('.yc_arr04').removeClass("displayN");
			   }
			   scrollArray[index].refresh();  
		   }
	},
	  // transitionEnd: function(index, element) {}
	});
	
});
var index;
var agendaDates = new Array();
var scrollArray=new Array();

var request = { 

		QueryString : function(val) { 

		var uri = window.location.search; 
        //jAlert(uri);
		var re = new RegExp("" +val+ "=([^&?]*)", "ig"); 

		return ((uri.match(re))?(uri.match(re)[0].substr(val.length+1)):null); 

		} 

		}

function getAgenda(){
	var params = {};

	params["pageCode"] = "1";//页面编码
	params["eventId"] = "1";//事件ID
	params["type"] = "1";
	var text = JSON.stringify(params);
	showLoading();
	executeAjax("0060001",text,function(data){
		closeLoading();
		var response = data.responseBody.agendas;
        var datas={};
		for(var i=0;i<response.length;i++){
			if(response[i].address==null){
				response[i].address = "";
			}
			
			if(response[i].agendaDate==null){
				response[i].agendaDate = "";
			}
			if(response[i].content==null){
				response[i].content = "";
			}
			if(response[i].spokeDate==null){
				response[i].spokeDate = "";
			}
			if(response[i].agendaTime=="1"){
				response[i].agendaTime = "参会业务精英";
			}else if(response[i].agendaTime=="2"){
				response[i].agendaTime = "会议工作组";
			}else if(response[i].agendaTime=="3"){
				response[i].agendaTime = "全体人员";
			}else{
				response[i].agendaTime ="";
			}
			if(datas[response[i].agendaDate]){
				datas[response[i].agendaDate].push(response[i]);		
			}
			else{
				var temp=new Array();
				temp.push(response[i]);
				datas[response[i].agendaDate]=temp;
			}
		}
		for(var d in datas){
			agendaDates.push(d+"");
		}
		for(var dd=0;dd<agendaDates.length;dd++){
			if(dd==0){
				$(".yc_date_f").html(getDate(agendaDates[dd]));
			}
			 var first=datas[agendaDates[dd]];
			 var htmlText="";
			 for(var i=0;i<first.length;i++){
				 var agendaTime=first[i].agendaTime;
				 
				 var addr="";
				
			    htmlText+="<div class=\"yc_con_tit\"><table class=\"yc_ct_fl\"><tr><td>"+first[i].spokeDate+"</td></tr></table></div>";
				
				
				 if(i%2==0){
					 htmlText += "<div class=\"yc_con02\"><div class=\"yc_con_ft\">"+first[i].content;					
				 }else{
					 htmlText += "<div class=\"yc_con01\"><div class=\"yc_con_ft\">"+first[i].content;
				 }
				 if(first[i].id==10){
					 htmlText +="<span class=\"yc_con_fb03\" style=\"color:blue\"><a href=\"#\" onclick=\"window.open('groups.html','_self')\">查看表彰大会流程</a></span>"
				 }	
				 htmlText +="</div>";
				 if(first[i].address){
					 htmlText += "<div class=\"yc_con_fb\"><span class=\"yc_con_fb01\">地点："+first[i].address+"</span><div class=\"clear\"></div></div>";
				 }
				 
				 if(first[i].agendaTime){
					 htmlText += "<div class=\"yc_con_fb\"><span class=\"yc_con_fb01\">参与人员："+first[i].agendaTime +"</span><div class=\"clear\"></div></div>";
				 }
				 			 
				 htmlText +="</div>";
			 }
			 var index=dd+1;
			 $("#agendaContent"+index).html(htmlText);
        }
		
		$('.yc_arr04').click(function(){
			mySwipe.next();
		});
		$('.yc_arr02').click(function(){
			mySwipe.prev();
		});
		
		setTimeout(isc,200);
		 
	});
}

function isc(){
	myScroll1 =new iScroll('wrapper1',{ hScrollbar: false, vScrollbar: false});
	myScroll2 =new iScroll('wrapper2',{ hScrollbar: false, vScrollbar: false});
	myScroll3 =new iScroll('wrapper3',{ hScrollbar: false, vScrollbar: false});
	scrollArray.push(myScroll1);
	scrollArray.push(myScroll2);
	scrollArray.push(myScroll3);
	if(index){
		mySwipe.slide(index, 100);
		myScroll2.scrollTo(0, -500, 100);
	}
}

function getDate(agendaDate){
	var month = "";
	var day = "";
	if(agendaDate.substring(5,6)=="0"){
		month = agendaDate.substring(6,7);
	}else{
		month = agendaDate.substring(5,7);
	}
	if(agendaDate.substring(8,9)=="0"){
		day = agendaDate.substring(9,10);
	}else{
		day = agendaDate.substring(8,10);
	}
	return month+"月"+day+"日";
}