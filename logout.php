<?php
define('TITLE', 'Logout');
define('EXTRA_CODE', '<script type="text/javascript" src="javascript/counter.js"></script>'); //extra javascript code needed for this page
define('EXTRA_CSS', ""); //extra CSS needed for this page
$breadcrumb_list = array("Home", "Logout");
$breadcrumb_link = array("index.php", "#");
session_start();

if(isset($_SESSION['username'])){
	unset($_SESSION['username']);
	$_SESSION['login_is_successful'] = "false";
}

require('template/header.inc.php');
?>

<header class="title">Logout Successful</header>
<p>You have successfully logged out! You will be automatically redirected to the homepage in <span id="counter">10</span> seconds. If you are not automatically redirected, please click <a href="index.php">here</a>!</p>


<?php require('template/footer.inc.php'); ?>