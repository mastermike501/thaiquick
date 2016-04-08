<?php
ob_start();
define('TITLE', "Register");
define('EXTRA_CODE', '<script type="text/javascript" src="javascript/animation.js"></script><script type="text/javascript" src="javascript/validator.js"></script>'); //extra javascript code needed for this page
define('EXTRA_CSS', "
	.hide_me{
		font-weight: bold;
		font-size: 14px;
		display: none;
	}
	.check_text{
		-webkit-border-radius: 5px;
		-moz-border-radius: 5px;
		border-radius: 5px;
		padding: 2px 4px;
		font-weight: bold;
		font-size: 15px;
	}
	div.text_require{
		float: right;
		margin-right: 50px;
		height: 0px;
	}
	div.text_require > span{
		font-size: 14px;
		white-space: nowrap;
		overflow: hidden;
		padding-left: 15%;
	}
"); //extra CSS needed for this page

$breadcrumb_list = array("Home", "Register");
$breadcrumb_link = array("index.php", "#");
session_start();
require('template/header.inc.php');
require('includes/registration_validator.inc.php');
?>

<header class='title'>Register</header>
<p class='error'>
<?php
	if(isset($error_message)){
		echo $error_message;
	}
?>
</p>
<?php
if(isset($_SESSION['username']) && isset($_SESSION['login_is_successful'])){
	if($_SESSION['login_is_successful'] == "true"){
		ob_end_clean();
		header('Location: index.php');
	}
	else{
		ob_end_flush();
		require('includes/register_form.inc.php');
	}
}
else{
	ob_end_flush();
	require('includes/register_form.inc.php');
}

?>
<?php require('template/footer.inc.php'); ?>	