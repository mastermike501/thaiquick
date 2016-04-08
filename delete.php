<?php
define('TITLE', 'Delete Account');
define('EXTRA_CODE', '<script src="javascript/decision_maker.js"></script>'); //extra javascript code needed for this page
define('EXTRA_CSS', ""); //extra CSS needed for this page
$breadcrumb_list = array("Home", "Account", "Delete Account");
$breadcrumb_link = array("index.php", "account.php", "#");
session_start();
require('template/header.inc.php');
?>
<header class="title">Delete Account</header>

<?php
if(isset($_SESSION['username']) && isset($_SESSION['login_is_successful']) && $_SESSION['login_is_successful'] == "true"){
	echo '<p>Do you really want to delete this account with username ';
	if(isset($_SESSION['username'])) echo $_SESSION['username'];
	echo '?</p>';
	echo '
<p>This action cannot be undone!</p>
<table>
<tr>
	<td><input type="button" id="the_yes_button" class="button_style text_inputs" value="Yes, I want to delete my account."></td>
	<td><input type="button" id="the_no_button" class="button_style text_inputs" value="No, I want to keep my account. Go back to homepage."></td>
</tr>
</table>
<span id="info"></span>
';
}else
	echo '<p>Please login to continue!</p>';
?>

<?php require('template/footer.inc.php'); ?>