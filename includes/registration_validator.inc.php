<?php

if($_SERVER['REQUEST_METHOD'] == 'POST' && $_POST['submitted'] == true){
	ob_start();
	if($_SESSION['firstname_valid'] == "true" && $_SESSION['username_valid'] == "true" && $_SESSION['email_valid'] == "true" && $_SESSION['password_valid'] == "true"){ //if everything is okay, input values to db
		require('includes/db_connection.inc.php'); //opens the db connection
		$query = "INSERT INTO `thaiquick_user_info` VALUES ('', '".$_SESSION['firstname']."', '".$_SESSION['surname']."', '".$_SESSION['username']."', '".$_SESSION['email']."', '".$_SESSION['password']."', '".$_SESSION['salt']."', '0', '0', '0', '0')";
		
		if(mysqli_query($dbc, $query)){ //submits the query and returns bool var
			unset($_SESSION['firstname']);
			unset($_SESSION['surname']);
			unset($_SESSION['email']);
			unset($_SESSION['password']);
			$_SESSION['login_is_successful'] = "true";
			mysqli_close($dbc); //closes db connection
			ob_end_clean();
			header('Location: index.php');
			exit();
			//does not unset username session variable
		}
		mysqli_close($dbc); //closes db connection
	}//end check session var if-block
	
	$are_variables_set = isset($_SESSION['firstname_valid']) || isset($_SESSION['username_valid']) || isset($_SESSION['email_valid']) || isset($_SESSION['password_valid']);
	
	if($are_variables_set){
		$error_message = "";
		if($_SESSION['firstname_valid'] == "false"){
			$error_message .= "Please enter a firstname or given name!";
		}
		
		if($_SESSION['username_valid'] == "false"){
			if(!empty($error_message))
				$error_message = append_line_break($error_message);
			$error_message .= "The username ".$_SESSION['username']." has been taken!";
		}
		else if($_SESSION['username_valid'] == "empty"){
			if(!empty($error_message))
				$error_message = append_line_break($error_message);
			$error_message .= "Please enter a username!";
		}
		
		if($_SESSION['email_valid'] == "empty"){
			if(!empty($error_message))
				$error_message = append_line_break($error_message);
			$error_message .= "Please enter an email into the Email field!";
		}
		else if($_SESSION['email_valid'] == "false"){
			if(!empty($error_message))
				$error_message = append_line_break($error_message);
			$error_message .= "The emails do not match!";
		}
		
		if($_SESSION['password_valid'] == "empty"){
			if(!empty($error_message))
				$error_message = append_line_break($error_message);
			$error_message .= "Please enter a password into the Password field!";
		}
		else if($_SESSION['password_valid'] == "false"){
			if(!empty($error_message))
				$error_message = append_line_break($error_message);
			$error_message .= "The passwords do not match!";
		}
		unset($_SESSION['firstname']);
		unset($_SESSION['surname']);
		unset($_SESSION['username']);
		unset($_SESSION['email']);
		unset($_SESSION['password_valid']);
		ob_end_flush();
	}
}

function append_line_break($error_message){
	$error_message .= "<br />";
	return $error_message;
}
?>