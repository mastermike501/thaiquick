<?php
define('TITLE', 'Account');
define('EXTRA_CODE', ''); //extra javascript code needed for this page
define('EXTRA_CSS', ""); //extra CSS needed for this page
$breadcrumb_list = array("Home", "Account");
$breadcrumb_link = array("index.php", "#");
session_start();
require('template/header.inc.php');
?>
<header class="title">Account</header>
<?php
if(isset($_SESSION['username']) && isset($_SESSION['login_is_successful']) && $_SESSION['login_is_successful'] == "true")
	echo '
<table class="account">
<tr>
	<td colspan="2">Options</td>
</tr>
<tr>
	<td>1.</td>
	<td><a href="update.php" class="link_color">Update Account</a></td>
</tr>
<tr>
	<td>2.</td>
	<td><a href="delete.php" class="link_color">Delete Account</a></td>
</tr>
</table>
';
else
	echo '<p>Please login to continue!</p>';
?>



<?php require('template/footer.inc.php'); ?>