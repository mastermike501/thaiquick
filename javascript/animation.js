$(document).ready(function(){ // jQuery for registration
	$('.the_form').focus(function(){
		switch($(this).attr('name')){
			case 'first_name'	: $('#one').slideDown(); break;
			case 'surname'		: $('#two').slideDown(); break;
			case 'username'		: $('#three').slideDown(); break;
			case 'email'		: $('#four').slideDown(); break;
			case 'email_confirm': $('#five').slideDown(); break;
			case 'pwd'			: $('#six').slideDown(); break;
			case 'pwd_confirm'	: $('#seven').slideDown(); break;
		}
	});
	
	$('.the_form').blur(function(){
		$('.hide_me').slideUp();
	});	
});