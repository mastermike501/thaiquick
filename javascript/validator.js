$(document).ready(function(){
	
	//calls functions once
	check_firstname();
	check_surname();
	check_username();
	validate_email()
	check_email();
	check_pw();
	
	//checks firstname
	$("#firstname_value").keyup(check_firstname);
	$("#firstname_value").blur(check_firstname);
	$("#firstname_value").click(check_firstname);
	
	function check_firstname(){
		$('#check_firstname').css('display', 'inline');
		$fn = $.trim($('#firstname_value').val());
		if($fn == ''){
			$('#check_firstname').text('A first name is required.');
			$('#check_firstname').css('color', 'red');
			$firstname_valid = "false";
		}
		else{
			$('#check_firstname').text('Okay');
			$('#check_firstname').css('color', 'green');
			$firstname_valid = "true";
		}
		$.post('includes/registration_details.inc.php',
			{
				firstname: $fn,
				firstname_valid: $firstname_valid
			}
		);
	}
	
	//checks surname
	$("#surname_value").keyup(check_surname);
	$("#surname_value").blur(check_surname);
	$("#surname_value").click(check_surname);
	
	function check_surname(){
		$('#check_surname').css('display', 'inline');
		$sn = $.trim($('#surname_value').val());
		if($sn == ''){
			$('#check_surname').text('A last name is optional.');
			$('#check_surname').css('color', 'green');
		}
		$.post('includes/registration_details.inc.php',
			{
				surname: $sn
			}
		);
	}

	//checks usernames
	$("#username_value").keyup(check_username);
	$("#username_value").blur(check_username);
	$("#username_value").click(check_username);
	
	function check_username(){ //uses ajax jquery function to check usernames
		$chosen_username = $.trim($("#username_value").val());
		$.ajax({
			timeout: 1000,
			type: 'POST',
			url: 'xmls/username_list.php',
			data: 'username=' + $chosen_username,
			dataType: 'xml',
			success: function(data){
				$('#check_username').css('display', 'inline');
				$isValid = $(data).find('Valid').text();	//find <Valid> tag and retrieve info
				$message = $(data).find('Message').text();	//find <Message> tag and retrieve info
				$('#check_username').text($message);		//put the message into the span
				if($isValid == 'N'){
					$('#check_username').css('color', 'red');
					$username_valid = "false";
				}
				else{
					$('#check_username').css('color', 'green');
					$username_valid = "true";
				}
				//posts information to xml file
				$.post('includes/registration_details.inc.php',
					{
						username: $chosen_username,
						username_valid: $username_valid
					}
				);
			}//end success block
		});//end ajax function block
	}

	//checks email format
	$('input[name="email"]').keyup(validate_email);
	$('input[name="email"]').blur(validate_email);
	$('input[name="email"]').click(validate_email);
	
	function validate_email(){
		$chosen_email = $.trim($('input[name="email"]').val());
		$.ajax({
			timeout: 1000,
			type: 'POST',
			url: 'xmls/email_list.php',
			data: 'email=' + $chosen_email,
			dataType: 'xml',
			success: function(data){
				$isValid = $(data).find('Valid').text();	//find <Valid> tag and retrieve info
				$message = $(data).find('Message').text();	//find <Message> tag and retrieve info
				if($isValid == 'N'){
					$('#validate_email').text($message);	//put the message into the span
					$('#validate_email').css('color', 'red');
				}
				else{
					$.ajax({ //checks whether email is valid
						timeout: 1000,
						type: 'POST',
						url: 'includes/email_validate.inc.php',
						data: 'email=' + $chosen_email,
						dataType: 'text',
						success: function(data){
							if(data == "okay"){
								$('#validate_email').text('This email is valid.');
								$('#validate_email').css('color', 'green');
							}//end if-block
							else{
								$('#validate_email').text('This email is not valid.');
								$('#validate_email').css('color', 'red');
							}
						}//end success block
					});//end ajax function block
				}//end else
			}//end success block
		});//end ajax function block
		$('#validate_email').css('display', 'inline');
	}//end function
	
	//checks email similarity
	$('input[name="email_confirm"]').keyup(check_email);
	$('input[name="email_confirm"]').blur(check_email);
	$('input[name="email_confirm"]').click(check_email);
	
	function check_email(){
		$('#check_email').css('display', 'inline');
		$em = $.trim($('input[name="email"]').val());
		$em_cf = $.trim($('input[name="email_confirm"]').val());
		
		if($em_cf == ''){
			$('#check_email').text('A confirmation email is required.');
			$('#check_email').css('color', 'red');
			$email_valid = "false";
		}
		else if(!($em == $em_cf)){
			$('#check_email').text('The emails do not match.');
			$('#check_email').css('color', 'red');
			$email_valid = "false";
		}
		else{
			$('#check_email').text('The emails match.');
			$('#check_email').css('color', 'green');
			$email_valid = "true";
		}
		$.post('includes/registration_details.inc.php',
			{
				email: $em,
				email_valid: $email_valid
			}
		);
	}

	//checks password
	$('input[name="pwd"]').keyup(check_pw);
	$('input[name="pwd"]').blur(check_pw);
	$('input[name="pwd"]').click(check_pw);
	$('input[name="pwd_confirm"]').keyup(check_pw);
	$('input[name="pwd_confirm"]').blur(check_pw);
	$('input[name="pwd_confirm"]').click(check_pw);
	
	function check_pw(){
		$('.check_pw').css('display', 'inline');
		$('.check_pw2').css('display', 'inline');
		$pw = $.trim($('input[name="pwd"]').val());
		$pw_cf = $.trim($('input[name=pwd_confirm]').val());
		
		if($pw != ''){
			$('.check_pw').text('Okay');
			$('.check_pw').css('color', 'green');
		} else if($pw == ''){
			$('.check_pw').text('A password is required.');
			$('.check_pw').css('color', 'red');
		}
		
		if(!($pw == $pw_cf)){
			$('.check_pw2').text('The passwords do not match.');
			$('.check_pw2').css('color', 'red');
			$password_valid = "false";
		}
		else if($pw_cf == ''){
			$('.check_pw2').text('A password is required.');
			$('.check_pw2').css('color', 'red');
			$password_valid = "false";
		}
		else{
			$('.check_pw2').text('The passwords match.');
			$('.check_pw2').css('color', 'green');
			$password_valid = "true";
		}
		$.post('includes/registration_details.inc.php',
			{
				password: $pw,
				password_valid: $password_valid
			}
		);
	}

	//speech event listeners
	if (document.createElement("input").webkitSpeech === undefined) {
		//do nothing
	} else{
		$('#firstname_value').attr('x-webkit-speech', '');
		$('#surname_value').attr('x-webkit-speech', '');
		$('#username_value').attr('x-webkit-speech', '');
		
		$("#firstname_value").bind('webkitspeechchange', check_firstname);
		$("#surname_value").bind('webkitspeechchange', check_surname);
		$("#username_value").bind('webkitspeechchange', check_username);
	}
});