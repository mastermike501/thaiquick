<?php
session_start();
	
	$invalids = array("/\#.*/", "/\-{2}.*/");
	$replacement = "";
	
	if(isset($_POST['firstname']) && !isset($_SESSION['firstname']) || isset($_POST['firstname']) && isset($_SESSION['firstname'])){
		$_SESSION['firstname'] = preg_replace($invalids, $replacement, $_POST['firstname']);
		$_SESSION['firstname_valid'] = $_POST['firstname_valid'];
	}
	else if(!isset($_POST['firstname']) && !isset($_SESSION['firstname'])){	//post variable not set and session variable not set
		$_SESSION['firstname_valid'] = "false";
	}
	
	if(isset($_POST['surname']) && !isset($_SESSION['surname']) || isset($_POST['surname']) && isset($_SESSION['surname'])){
		$_SESSION['surname'] = preg_replace($invalids, $replacement, $_POST['surname']);
	} else if(!isset($_SESSION['surname'])){
		$_SESSION['surname'] = "";
	}	
		
	if(isset($_POST['username']) && !isset($_SESSION['username']) || isset($_POST['username']) && isset($_SESSION['username'])){
		$_SESSION['username'] = preg_replace($invalids, $replacement, $_POST['username']);
		$_SESSION['username_valid'] = $_POST['username_valid'];
	}
	else if(!isset($_POST['username']) && empty($_SESSION['username'])){
		$_SESSION['username_valid'] = "empty";
	}

	if(isset($_POST['email']) && !isset($_SESSION['email']) || isset($_POST['email']) && isset($_SESSION['email'])){
		$_SESSION['email'] = preg_replace($invalids, $replacement, $_POST['email']);
		$_SESSION['email_valid'] = $_POST['email_valid'];
	}
	else if(!isset($_POST['email']) && empty($_SESSION['email'])){
		$_SESSION['email_valid'] = "empty";
	}

	if(isset($_POST['password']) && !isset($_SESSION['password']) || isset($_POST['password']) && isset($_SESSION['password'])){
		$random = mt_rand(-1000000, 1000000);
		$_SESSION['salt'] = hash('sha256', $random);
		$_SESSION['password'] = $_POST['password'].$_SESSION['salt'];
		$_SESSION['password'] = hash('sha256', preg_replace($invalids, $replacement, $_SESSION['password']));
		$_SESSION['password_valid'] = $_POST['password_valid'];
	}
	else if(!isset($_POST['password']) && empty($_SESSION['password'])){
		$_SESSION['password_valid'] = "empty";
	}
		
?>