<?php
	session_start();
	
	if(!isset($_SESSION['username']))
		exit();
	
	require('db_connection.inc.php'); //opens the db connection
	
	if(isset($_POST['layer_number'])){
	
		if($_POST['layer_number'] != 5){//not sure if this if is necessary since there's a copy in javscript
	
			$layer = NULL;
			switch($_POST['layer_number']){
				case 1: $layer = "consonant"; break;
				case 2: $layer = "vowel"; break;
				case 3: $layer = "tone"; break;
				case 4: $layer = "number"; break;
			}
			
			if(isset($_POST['selected'])){ //sets value into db
				$selected = $_POST['selected'];
				
				$query = "UPDATE `thaiquick_user_info` SET `".$layer."`='".$selected."' WHERE `username`='".$_SESSION['username']."'";
				mysqli_query($dbc, $query);
				
			} else{
				$query = "SELECT `".$layer."` FROM `thaiquick_user_info` WHERE `username`='".$_SESSION['username']."'";
				$query_run = mysqli_query($dbc, $query);
				$query_row = mysqli_fetch_assoc($query_run);
				$query_row[$layer];
			}
		} 
	} else{ //selects all from db on load
		$query = "SELECT `consonant`, `vowel`, `tone`, `number` FROM `thaiquick_user_info` WHERE `username`='".$_SESSION['username']."'";
		
		if($query_run = mysqli_query($dbc, $query)){
			$query_row = mysqli_fetch_assoc($query_run);
			echo json_encode($query_row);
		}
	}
	
	mysqli_close($dbc);
?>