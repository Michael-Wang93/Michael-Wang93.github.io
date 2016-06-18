var doneNumber=0;
var userId = getCookie("userId");
var testType = getCookie("testType");
var fakedType = "";
$(function(){
	$(".xz_con").css("height",($(window).height()/16-3.3)+"em");
	if(testType=="B"){
		fakedType = "B";
		getExamPaper(fakedType);
	}else{
		fakedType = "A";
		getExamPaper(fakedType);
	}
});

/*初始化获取试卷*/
function getExamPaper(paperType){
	showLoading();
	var params = {};
	params["userId"] = userId;
	var text = JSON.stringify(params);
	executeAjax("0100003",text,function(data){
		var html = "";
		if(data.responseBody.userPaper != null){
			html += "您的考试成绩为：" + data.responseBody.userPaper.mark;
			$("div[class='content']").html(html);
			closeLoading();
		}else{
			
			var params1 = {};
			params1["userId"] = userId;
			params1["paperType"] = paperType;
			var text1 = JSON.stringify(params1);
			executeAjax("0100001",text1,function(data){
				if(fakedType == "A"){fakedType = "B";}else if(fakedType == "B"){fakedType = "A";}
				html +="<table>";
				html +="<tr><td class='txtC' colspan='3'><p class='height1'></p><span class='btn_blue' id='switchPaper'>试卷"+fakedType+"</span></td></tr>";
				var questionList = data.responseBody.questionList;
				$("#totalNumber").val(questionList.length);
				$("#paperId").val(questionList[0].paperId);
				for(var i=0;i<questionList.length;i++){
					var questionType = questionList[i].questionType*1;
					switch(questionType){
					case 1:
						html += drawSingleSelect(questionList[i]);
						break;
					case 2:
						html += drawMultiSelect(questionList[i]);
						break;
					case 3:
						html += drawJudged(questionList[i]);
						break;
					}
				}
				html += "<tr><td class='txtC' colspan='3'><p class='height1'></p><span class='btn_blue' id='subPaper'>提交</span></td></tr>";
				html +="</table>";
				$("div[class='content']").html(html);
				if(testType=="C"){
					$("#subPaper").hide();
					$("#switchPaper").show();
				}else{
					$("#subPaper").show();
					$("#switchPaper").hide();
				}
				$(".single_img").bind("click",chooseSingleSelect);
				$(".multi_img").bind("click",chooseMultiSelect);
				$(".judge_r_f").bind("click",chooseJudgeRight);
				$(".judge_w_f").bind("click",chooseJudgeWrong);
				$("#subPaper").bind("click",subPaper);
				$("#switchPaper").bind("click",switchPaper);
				closeLoading();
			})
		}
	});
}

function switchPaper(){
	if(fakedType == "A"){
		getExamPaper(fakedType);
	}else if(fakedType == "B"){
		getExamPaper(fakedType);
	}
}

/*描绘单选题页面*/
function drawSingleSelect(data){
	var html = "";
	html += "<tr><td width='5%' colspan='3'>"+data.number+"、（单选题）"+data.question+"</td></tr>"
	var answers = data.answerList;
	for(var i=0;i<answers.length;i++){
		var answer = answers[i];
		html += "<tr><td><div questionId='"+answer.questionId+"' questionType='1' class='single_img' value='"+answer.orderNo+"'></div></td><td>"+answer.orderNo+"</td><td align='left' width='80%'>"+answer.answer+"</td></tr>";
	}
	html += "<tr><td>&nbsp;</td></tr>";
	return html;
}
/*描绘多选题页面*/
function drawMultiSelect(data){
	var html = "";
	html += "<tr><td width='5%' colspan='3'>"+data.number+"、（多选题）"+data.question+"</td></tr>"
	var answers = data.answerList;
	for(var i=0;i<answers.length;i++){
		var answer = answers[i];
		html += "<tr><td><div questionId='"+answer.questionId+"' questionType='2' class='multi_img' value='"+answer.orderNo+"'></div></td><td>"+answer.orderNo+"</td><td align='left' width='80%'>"+answer.answer+"</td></tr>";
	}
	html += "<tr><td>&nbsp;</td></tr>";
	return html;
}
/*描绘判断题页面*/
function drawJudged(data){
	var html = "";
	html += "<tr><td width='5%' colspan='3'>"+data.number+"、（判断题）"+data.question+"</td></tr><tr><td></td><td><div questionId='"+data.id+"' questionType='3' class='judge_r_f' value='1'></div></td><td><div questionId='"+data.id+"' questionType='3' class='judge_w_f' value='0'></div></td></tr>";
	html += "<tr><td>&nbsp;</td></tr>";
	return html;
}


/*选择单选*/
function chooseSingleSelect(){
	var questionId = $(this).attr("questionId");
	var curDiv = $(this);
	if($("div[questionId="+questionId+"][class='singles_img']").length==0){
		doneNumber++;
	}
	$("div[questionId="+questionId+"]").each(function(){
		if($(this).attr("class")=='singles_img'){
			$(this).addClass('single_img');
			$(this).removeClass('singles_img');
		}
	})
	curDiv.removeClass();
	curDiv.addClass("singles_img");
}
/*选择多选*/
function chooseMultiSelect(){
	var questionId = $(this).attr("questionId");
	if($("div[questionId="+questionId+"][class='multis_img']").length==0){
		doneNumber++;
	}
	if($(this).attr("class")=='multi_img'){
		$(this).addClass('multis_img');
		$(this).removeClass('multi_img');
	}else if($(this).attr("class")=='multis_img'){
		$(this).addClass('multi_img');
		$(this).removeClass('multis_img');
		if($("div[questionId="+questionId+"]").length==$("div[questionId="+questionId+"][class='multi_img']").length){
			doneNumber--;
		}
	}
}
/*判断题√的处理*/
function chooseJudgeRight(){
	var questionId = $(this).attr("questionId");
	if($("div[questionId="+questionId+"][class='judge_r_f']").length>0&&$("div[questionId="+questionId+"][class='judge_w_f']").length>0){
		doneNumber++;
	}
	if($(this).attr("class")=='judge_r_f'){
		$(this).addClass('judge_r_t');
		$(this).removeClass('judge_r_f');
		var wdom = $("div[questionId="+questionId+"][class^='judge_w_']");
		wdom.removeClass("judge_w_t");
		wdom.addClass("judge_w_f");
	}
}
/*判断题×的处理*/
function chooseJudgeWrong(){
	var questionId = $(this).attr("questionId");
	if($("div[questionId="+questionId+"][class='judge_r_f']").length>0&&$("div[questionId="+questionId+"][class='judge_w_f']").length>0){
		doneNumber++;
	}
	if($(this).attr("class")=='judge_w_f'){
		$(this).addClass('judge_w_t');
		$(this).removeClass('judge_w_f');
		var rdom = $("div[questionId="+questionId+"][class^='judge_r_']");
		rdom.removeClass("judge_r_t");
		rdom.addClass("judge_r_f");
	}
}

/*提交试卷*/
 function subPaper(){
	 showLoading();
	 var totalNumber = $("#totalNumber").val()*1;
	 if(doneNumber<totalNumber){
		 jAlert("题目未做完,请完成后再提交");
		 closeLoading();
		 return;
	 }
	 var answer = "";//questionId:answerId|questionId:answerId,answerId
	 var doneQuestions = $("div[questionId]");
	 var uniqueId = []; 
	 for(var i=0;i<doneQuestions.length;i++){
		 var eachAnswer = doneQuestions[i];
		 var qid = $(eachAnswer).attr("questionId");
		 var qtype = $(eachAnswer).attr("questionType")*1;
		 if(uniqueId.contains(qid)){
			 continue;
		 }
		 uniqueId.push(qid);
		 switch(qtype){
			 case 1:{
				 var canswer = $("div [questionid="+$(eachAnswer).attr("questionId")+"][class='singles_img']");
				 answer += $(canswer).attr("questionId")+":";
				 answer += $(canswer).attr("value")+"|";
				 break;
				 }
			 case 2:{
				 var canswer = $("div [questionid="+$(eachAnswer).attr("questionId")+"][class='multis_img']");
				 answer += $(canswer).attr("questionId")+":";
				 $(canswer).each(function(){
					 answer += $(this).attr("value");
				 })
				 answer += "|";
				 break;
			 }
			 case 3:{
				 var canswer = $("div [questionid="+$(eachAnswer).attr("questionId")+"][class$='_t']");
				 answer += $(canswer).attr("questionId")+":";
				 answer += $(canswer).attr("value")+"|";
				 break;
			 }
		 }
	 }
	 answer = answer.substring(0,answer.length-1);
	 var paperId = $("#paperId").val();
	 var params = {}
	 params["userId"]=userId;
	 params["paperId"]=paperId;
	 params["answer"]=answer;
	 var text = JSON.stringify(params);
	 executeAjax("0100002",text,function(data){
		 if(data.responseBody.mark!=null){
			 closeLoading();
			 location.reload() 
			 return;
		 }
	 });
	 
 }

 /*添加数组的contains方法,用于拼接答案的时候使用*/
Array.prototype.contains = function(obj){
	var i = this.length;
	while(i--){
		if(this[i]===obj){
			return true; 
		}
	}
	return false; 
}
