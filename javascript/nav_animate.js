$(document).ready(function(){
	"use strict";
	var $is_up = true;
	
	$('#game_nav').click(function(){
		if($is_up){
			$('#game_nav_list').slideDown({
				duration: 1000,
				start: function(){
					$('#nav_arrow').fadeOut(500, function(){
						$('#nav_arrow').html('&#9650;');
						$('#nav_arrow').fadeIn(500);
					});
				},
				complete: function(){
					$('#game_nav_list').css({
						display: 'block',
						cursor: 'default'
					});
					$is_up = false;
				}
			});
		}
		else{
			$('#game_nav_list').slideUp({
				duration: 1000,
				start: function(){
					$('#nav_arrow').fadeOut(500, function(){
						$('#nav_arrow').html('&#9660;');
						$('#nav_arrow').fadeIn(500);
					});
				},
				complete: function(){
					$('#game_nav_list').css({
						display: 'none',
						cursor: 'pointer'
					});
					$is_up = true;
				}
			});	
		}
	});
});
