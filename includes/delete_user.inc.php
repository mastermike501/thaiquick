<?php
session_start();
require('db_connection.inc.php');

if("3TqDrTUa9c1mbeT7Us8Qh3daMDIlszrUoREoSwQ0" == $_POST['pzpeJlDhQUYiF8RrTl5EppQz22ODilxF7U1IDjFI'])

$query = "DELETE FROM `thaiquick_user_info` WHERE `username`='".$_SESSION['username']."'";
mysqli_query($dbc, $query);

if(isset($_SESSION['username'])){
	unset($_SESSION['username']);
	$_SESSION['login_is_successful'] = "false";
}

mysqli_close($dbc);
?>