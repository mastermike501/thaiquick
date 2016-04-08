var a_bool = true;
var is_speech_available;
var choice;
if (document.createElement("input").webkitSpeech === undefined)
	is_speech_available = false;
else
	is_speech_available = true;

$(document).ready(function(){
	$('#firstname').click(function(){
		text_slider('#firstname');
		choice = 1;
	});
	$('#lastname').click(function(){
		text_slider('#lastname');
		choice = 2;
	});
	$('#email').click(function(){
		text_slider('#email');
		choice = 3;
	});
	$('#password').click(function(){
		text_slider('#password');
		choice = 4;
	});
	
	$('#the_update_button').click(process_info);
});

function text_slider(string){
	$('#the_update_button').removeClass('text_inputs');
	switch(string){
		case '#firstname':
		case '#lastname':
			$('#updater').attr('type', 'text');
			$('#updater_check').attr('type', 'text');
			break;
		case '#email':
			$('#updater').attr('type', 'email');
			$('#updater_check').attr('type', 'email');
			break;
		case '#password':
			$('#updater').attr('type', 'password');
			$('#updater_check').attr('type', 'password');
			break;
	}
	
	if(a_bool){
		$('.updater_label').text($(string).text());
		
		if(is_speech_available && (string === "#firstname" || string === "#lastname")){
			$('#updater').attr('x-webkit-speech', '');
			$('#updater_check').attr('x-webkit-speech', '');
		} else{
			$('#updater').removeAttr('x-webkit-speech');
			$('#updater_check').removeAttr('x-webkit-speech');
		}
		
		$('.text_inputs').slideDown(500);
		a_bool = false;
	} else{
		$('.text_inputs').slideUp(500, function(){
			$('#error1').text(''); //gets rid of prev error messages
			$('#error2').text('');
			$('#updater').val('');
			$('#updater_check').val('');
			a_bool = true;
			text_slider(string); //recursive function to slide down
		});
	}
}

function process_info(){
	var item1, item2;
	item1 = $('#updater').val();
	item2 = $('#updater_check').val();
	
	if(item1 === "")
		$('#error1').text('Please fill in this field!');
	if(item2 === "")
		$('#error2').text('Please fill in this field!');
	else if(item1 != item2){
		$('#error1').text('The fields do not match!');
		$('#error2').text('');
	}
	else{
		$('#info').html('<table><tr><td colspan="2">Are you sure?</td></tr><tr><td><input type="button" class="button_style" id="the_yes_button" value="Yes"></td><td><input type="button" class="button_style" id="the_no_button" value="No"></td></tr></table>');
		
		$('#the_yes_button').click(function(){
			$.post('includes/update_details.inc.php',
				{
					item: item1,
					choice: choice
				}
			);
			$('#updater').val('');
			$('#updater_check').val('');
			$('#info').html("<p>Your details have been successfully updated!</p>");
		});
		$('#the_no_button').click(function(){
			$('#info').html("<p>You have cancelled your update!</p>");
		});
	}
}

function keypress_func(e){
	switch(e.keyCode){
		case 13: process_info();
			break;
	} //end switch
}
$(document).on('keypress', function(e){
	keypress_func(e);
});