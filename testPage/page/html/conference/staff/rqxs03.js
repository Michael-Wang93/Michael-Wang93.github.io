$(function(){
	//海燕奖-人气选手
//	$(".rqxs03_zzt").css("height",($(window).height()/16-10)+"em");
//	var groupName=getParam("groupName");
//	getVoteCount(groupName);
	
});

function getVoteCount(groupName){
	var params = {};
	params["groupName"] = groupName;
	var text = JSON.stringify(params);
	executeAjax("0080004",text,function(data){
		var value = data.responseBody.counts;
		createBar2D(value);
	});
}

function createBar2D(value){
	var data =value;
	var chart = new iChart.Bar2D({
		render : 'canvasDiv',
		data: data,
		title:{
			text:'投票结果',
			color:'#4572a7',
			fontsize : 24
		},
		width : $('#canvasDiv').width(),
		height : $('#canvasDiv').height(),
		border: null,
		label: {
			fontsize : 12
		},
		coordinate:{
			width:$('#canvasDiv').width()-100,
			height:$('#canvasDiv').height(),
			gridlinesVisible:false,
			axis:{
				width:[0,0,0,1]
			},
			scale:[{
				 position:'bottom',	
				 start_scale:0,
				 border: null,
				 end_scale:200,
				 scale_space:40,
				 scale_enable:false,
				 listeners:{
						parseText:function(t,xori,yori,index,last){
							return {text:""};
						}
				}

			}]
		},
		sub_option:{
			border:{
				enable : false,
				color:'#fcfcfc' 
			},
			listeners:{
				parseText:function(r,t){
					return t+"票";
				}
			}
		},
		legend:{enable:false}
	});
	
	chart.plugin(new iChart.Custom({
		drawFn:function(){
			//计算位置
			var coo = chart.getCoordinate(),
				x = coo.get('originx'),
				y = coo.get('originy'),
				w = coo.width,
				h = coo.height;
			//在左上侧的位置，渲染一个单位的文字
			chart.target.textAlign('start')
			.fillText('姓名',x-30,y,false,'#000000')
			.textBaseline('top');
		}
	}));
	chart.draw();

}