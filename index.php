<?php
define('TITLE', "Home");
define('EXTRA_CODE', ''); //extra javascript code needed for this page
define('EXTRA_CSS', ""); //extra CSS needed for this page
$breadcrumb_list = array("Home");
$breadcrumb_link = array("#");
session_start();
require('template/header.inc.php');
?>
<header class="title">Home</header>
<p>Welcome to Thai Quick! The quickest way to learn the basics of the Thai language!</p>
<?php //changes as user logs in or logs out
    if(!empty($_SESSION['username']) && $_SESSION['login_is_successful'] == "true"){
		echo "<p>Hello ".$_SESSION['username']."!</p><p>To begin, click the \"Learn\" icon above.</p>";
	}
    else{
    	echo '<p>Login on the left, or select the "New User?" button if you do not have an account.</p>';
    }
?>


<?php require('template/footer.inc.php'); ?>