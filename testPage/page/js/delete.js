$(function(){
	initEvent();
});

function initEvent(){
	$(".table_list").find("tr").swipeleft(function(){
		createDeleteBg();
		var td = $(this).find("td:last");
		var deleteTap = $(".btn_delete");
		var offset = td.offset();
		var top = offset.top+(td.height()/2+deleteTap.height()/2);
		var left = offset.left+(td.width()/2);
		$(".btn_delete").css({"z-index": 11,"display":"inline-block","top":top,"left":left});
	});
}

function createDeleteBg() {
	if ($("#lock_delete_bg").is(".lock_delete_bg")) {
		$("#lock_delete_bg").show();
	} else {
		$("body")
				.append(
						"<div id='lock_delete_bg' class='lock_delete_bg' style='position:absolute;left: 0px; top: 0px;display:none'></div>");
		$("#lock_delete_bg").show();
		var lock = $("#lock_delete_bg");
		var height = $(document).height();
		var width = $(document).width();
		lock.css("height", height);
		lock.css("width", width);
		lock.css("opacity", 0);
		lock.css("z-index", 10);
		lock.css("background", "#000");
		lock.click(function(){
			$(".btn_delete").hide();
			lock.hide();
		});
	}
}