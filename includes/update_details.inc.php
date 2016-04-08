<?php
session_start();
require('db_connection.inc.php');

$item = $_POST['item'];
$choice;

switch($_POST['choice']){
	case 1:
		$choice = "firstname";
		break;
	case 2:
		$choice = "surname";
		break;
	case 3:
		$choice = "email";
		break;
	case 4:
		$choice = "password";
		break;
}
echo $item."<br>".$choice;
if($_POST['choice'] == 4){ //password hashing
	$random = mt_rand(-1000000, 1000000);
	$salt = hash('sha256', $random);
	$item = $item.$salt;
	$item = hash('sha256', $item);
	$query = "UPDATE `thaiquick_user_info` SET `".$choice."`='".$item."', `salt`='".$salt."' WHERE `username`='".$_SESSION['username']."'";
} else{
	$query = "UPDATE `thaiquick_user_info` SET `".$choice."`='".$item."' WHERE `username`='".$_SESSION['username']."'";
}

mysqli_query($dbc, $query);

mysqli_close($dbc);
?>