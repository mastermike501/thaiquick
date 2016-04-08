<?php
$browser = get_browser(null, true); //important!
setcookie('isMobileDevice', $browser['ismobiledevice']);
define('TITLE', 'Learn');
define('EXTRA_CODE', '
<script src="javascript/kinetic.js"></script>
<script src="javascript/game.js"></script>
<script src="javascript/nav_animate.js"></script>
<script src="javascript/jquery.cookie.js"></script>
'); //extra javascript code needed for this page
define('EXTRA_CSS', "
#nav_arrow{
	font-size: 12px;
}

#game_nav{
	cursor: pointer;
	margin-top: 40px;
	margin-bottom: 5px;
	width: 100%;
	text-align: center;
	background-color: #1589FF;
	background: rgb(21, 137, 255);
	background: rgba(21, 137, 255, 0.5);
	-webkit-border-radius: 10px 10px 0 0;
	-moz-border-radius: 10px 10px 0 0;
	border-radius: 10px 10px 0 0;
	color: black;
	font-size: 20px;
	-webkit-box-shadow: 5px 5px 5px 0px rgba(0,0,0,0.75);
	-moz-box-shadow: 5px 5px 5px 0px rgba(0,0,0,0.75);
	box-shadow: 5px 5px 5px 0px rgba(0,0,0,0.75);
}

#game_nav > ul{
	list-style-type: none;
	line-height: 42px;
	padding: 0px 10px 8px 10px;
	display: none;
}

#game_nav > ul > li{
	cursor: pointer;
	white-space: nowrap;
  	overflow: hidden;
	font-size: 16px;
	padding: 3px;
	background: rgb(170, 170, 170);
	background: rgba(170, 170, 170, 0.5);
	-webkit-border-radius: 5px;
	-moz-border-radius: 5px;
	border-radius: 5px;
	margin-bottom: 3px;
	border: 1px solid black;
}

#game_canvas{
	-webkit-border-radius: 10px;
	-moz-border-radius: 10px;
	border-radius: 10px;
}
"); //extra CSS needed for this page
$breadcrumb_list = array("Home", "Learn");
$breadcrumb_link = array("index.php", "#");
session_start();
require('template/header.inc.php');
?>
<header class="title">Learn</header>

<?php
if(isset($_SESSION['username']) && isset($_SESSION['login_is_successful']) && $_SESSION['login_is_successful'] == "true"){
	echo '<p>Are you ready, '.$_SESSION['username'].'?</p>';
	echo '<p>All the best!</p>';
	require('includes/game.inc.php');
}else
	echo '<p>Please login to continue!</p>';
?>


<?php require('template/footer.inc.php'); ?>