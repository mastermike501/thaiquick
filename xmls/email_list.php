<?php
header('Content-Type: text/xml'); //beginning of XML doc
echo '<?xml version="1.0" encoding="UTF-8" standalone="yes" ?>';

$conn_error = '<Error>Could not connect!</Error></Username>';
$mysql_host = 'localhost';
$mysql_user = 'thaiquick';
$mysql_pass = 'WvQhmLHCDWpMj2jp';
$mysql_db = 'thaiquick_db';
$query = "SELECT `email` FROM `thaiquick_user_info`";

if(isset($_POST['email'])){
	$chosen_email = strip_tags($_POST['email']);
}
else{
	$chosen_email = "";
}

$dbc = @mysqli_connect($mysql_host, $mysql_user, $mysql_pass, $mysql_db);
if(!$dbc){
	die($conn_error);
}

echo '<Email>';
$check_this = 0;
if($query_run = mysqli_query($dbc, $query)){
	while( $query_row = mysqli_fetch_assoc($query_run) ){
		if(empty($chosen_email)){
			$check_this = 0;
			break;
		}
		else if($query_row['email'] == $chosen_email){
			$check_this = 1;
			break;
		}
		else if($query_row['email'] != $chosen_email){
			$check_this = 2;
		}
	}
	
	switch($check_this){
		case 0: echo '<Message>An email is required.</Message><Valid>N</Valid>'; break;
		case 1: echo '<Message>The email exists in the system.</Message><Valid>N</Valid>'; break;
		case 2: echo '<Message>The email is valid.</Message><Valid>Y</Valid>'; break;
	}
	
}
else{
	echo '<Error>Query failed.</Error>';
}
echo '</Email>';
mysqli_close($dbc);
?>