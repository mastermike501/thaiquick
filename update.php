<?php
define('TITLE', 'Update Account');
define('EXTRA_CODE', '<script src="javascript/update_select.js"></script>'); //extra javascript code needed for this page
define('EXTRA_CSS', "
	.text_inputs{
		display: none;
	}
"); //extra CSS needed for this page
$breadcrumb_list = array("Home", "Account", "Update Account");
$breadcrumb_link = array("index.php", "account.php", "#");
session_start();
require('template/header.inc.php');
?>
<header class="title">Update Account</header>

<?php
if(isset($_SESSION['username']) && isset($_SESSION['login_is_successful']) && $_SESSION['login_is_successful'] == "true")
	echo '
<span id="info"></span>
<table class="account">
<tr>
	<td colspan="2">Options</td>
</tr>
<tr>
	<td>1.</td>
	<td><a href="#" class="link_color" id="firstname">First Name</a></td>
</tr>
<tr>
	<td>2.</td>
	<td><a href="#" class="link_color" id="lastname">Last Name</a></td>
</tr>
<tr>
	<td>3.</td>
	<td><a href="#" class="link_color" id="email">Email</a></td>
</tr>
<tr>
	<td>4.</td>
	<td><a href="#" class="link_color" id="password">Password</a></td>
</tr>

<table>
<tr>
	<td><div class="text_inputs"><label class="updater_label"></label></div></td>
	<td><div class="text_inputs">:</div></td>
	<td><div class="text_inputs"><input type="text" class="the_form" id="updater" required></div></td>
	<td><div id="error1" class="text_inputs"></div></td>
</tr>
<tr>
	<td><div class="text_inputs">Confirm <label class="updater_label"></label></div></td>
	<td><div class="text_inputs">:</div></td>
	<td><div class="text_inputs"><input type="text" class="the_form" id="updater_check" required></div></td>
	<td><div id="error2" class="text_inputs"></div></td>
</tr>
</table>

<p><input type="button" id="the_update_button" class="button_style text_inputs" value="Update"></p>
';
else
	echo '<p>Please login to continue!</p>';
?>

<?php require('template/footer.inc.php'); ?>