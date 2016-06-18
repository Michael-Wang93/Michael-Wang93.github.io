function createSelectBg() {
	if ($("#lock_select_bg").is(".lock_select_bg")) {
		$("#lock_select_bg").show();
	} else {
		$("body")
				.append(
						"<div id='lock_select_bg' class='lock_select_bg' style='position:absolute;left: 0px; top: 0px;display:none'></div>");
		$("#lock_select_bg").show();
		var lock = $("#lock_select_bg");
		var height = $(document).height();
		var width = $(document).width();
		lock.css("height", height);
		lock.css("width", width);
		lock.css("opacity", 0.5);
		lock.css("filter", 'Alpha(Opacity=50)');
		lock.css("z-index", 10000);
		lock.css("background", "#000");
	}
}

function showLoading(){
	if(!$("#loading_cen").is(".loading_cen"))
		$("body").append("<div id='loading_cen' class='loading_cen'></div>");
	createSelectBg();
	var select_content = $("#loading_cen");
	var top = ($(window).height()- select_content.height())/2;
	var left = ($(window).width()-select_content.width())/2;
	select_content.css("top",$(window).scrollTop()+top);
	select_content.css("left",$(window).scrollLeft()+left);
	select_content.css("z-index",10001);
	select_content.show();
}

function closeLoading(){
	if($("#loading_cen").is(".loading_cen")){
		$("#loading_cen").remove();
		$("#lock_select_bg").remove();
	}
}