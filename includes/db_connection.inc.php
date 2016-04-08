<?php
$conn_error = 'Could not connect to db.';
$mysql_host = 'localhost';
$mysql_user = 'thaiquick';
$mysql_pass = 'WvQhmLHCDWpMj2jp';
$mysql_db = 'thaiquick_db';

$dbc = @mysqli_connect($mysql_host, $mysql_user, $mysql_pass, $mysql_db);
if(!$dbc){
	die($conn_error);
}

mysqli_set_charset ($dbc , "utf8");

?>