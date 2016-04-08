function window_calc(){
	var win_height = $(window).height();
	var content_height = $('#content').height() + 260; //260 is height in px from top of window to top of content div
	
	if(content_height > win_height){
		$('#wrapper').css('height', (content_height - 60) + 'px');
	}
}