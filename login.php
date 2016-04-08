<?php
	$invalids = array("/\#.*/", "/\-{2}.*/");
	$replacement = "";
	$current_page = "";
	
	session_start();
	$_SESSION['login_error'] = 'The username or the password is incorrect.';
	if(!empty($_POST['username']) && !empty($_POST['password'])){
		$username = trim($_POST['username']);
		$password = trim($_POST['password']);
		$username = preg_replace($invalids, $replacement, $username);
		$password = preg_replace($invalids, $replacement, $password);//clean input!
		include('includes/db_connection.inc.php');
		$query = "SELECT `username`, `password`, `salt` FROM `thaiquick_user_info` WHERE `username`='".$username."'";
		
		if($query_run = mysqli_query($dbc, $query)){
			while( $query_row = mysqli_fetch_assoc($query_run) ){
				if($query_row['username'] == $username){
					$password = $password.$query_row['salt'];
					$h_pw = hash('sha256', $password);
					if($query_row['password'] == $h_pw){		
						$_SESSION['username'] = $username;
						$_SESSION['login_is_successful'] = "true";
						ob_end_clean();
					}
					break; //break out of loop to save on further searching
				}
			}
		}
		
		mysqli_close($dbc);
	}
	else if(!empty($_POST['username']) && empty($_POST['password'])){	//username variable set but password variable not set
		$_SESSION['login_error'] = 'Please enter a password!';
	}
	else if(empty($_POST['username']) && !empty($_POST['password'])){	//username variable not set but password variable set
		$_SESSION['login_error'] = 'Please enter a username!';
	}
	else{	//both variables not set
		$_SESSION['login_error'] = 'Please enter a username and password!';
	}
	if(isset($_POST['page']))
		$current_page = $_POST['page'];
	else
		$current_page = "index.php";
		
	header('Location: '.$current_page);
	exit();
?>