$(function(){
	$(".dropdown").dropdown();
	$(".toggle-sidebar").on("click",function(){
		$(".wrapper").toggleClass("sidebar-off");
	});
});
