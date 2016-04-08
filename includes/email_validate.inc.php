<?php
	$email = $_POST['email'];
	$email_format = "/^[_a-z0-9-]+(\.[_a-z0-9-]+)*\@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/";
	if(preg_match($email_format, $email) === 1){
		echo 'okay';
	}
	else if (preg_match($email_format, $email) === 0){
		echo 'nope';
	}
?>