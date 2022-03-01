$(()=>{
	$("accordion dt").on("click",function(e){
		//$(this).next().show();
$(this).next().slideDown()
$(this).next().slideUP()
	});
	});