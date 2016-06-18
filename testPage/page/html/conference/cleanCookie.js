$(function(){
	//电子餐券
//	delCookie('sid');
});

function delCookie(name){//为了删除指定名称的cookie，可以将其过期时间设定为一个过去的时间
	   var date = new Date();
//	   date.setTime(date.getTime() - 100000000);
	   document.cookie = "";
	   localStorage.removeItem(name);
	   var st = "回执清理";
	   $("#showMessage").html(st);
	}