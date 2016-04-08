<?php
define('TITLE', 'Contact the Author');
define('EXTRA_CODE', ''); //extra javascript code needed for this page
define('EXTRA_CSS', ""); //extra CSS needed for this page
$breadcrumb_list = array("Home", "Contact the Author");
$breadcrumb_link = array("index.php", "#");
session_start();
require('template/header.inc.php');
?>
<header class="title">Contact the Author</header>
<table>
<tr>
	<td class="table_underline">&raquo; Email</td>
</tr>
<tr>
	<td>mastermike501@hotmail.com</td>
</tr>
<tr>
	<td class="table_underline">&raquo; Area of study</td>
</tr>
<tr>
	<td><iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4002.454595416819!2d100.28128670000265!3d5.339385082069754!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x881c46d428b3162c!2s!5e1!3m2!1sen!2s!4v1385597400574" id="google_map" frameborder="0"></iframe></td>
</tr>
<tr>
	<td class="table_underline">&raquo; More Contact Details</td>
</tr>
<tr>
	<td><img src="images/contact_details.png" alt="Contact Details QR Code" height="252" width="253"></td>
</tr>
</table>
<?php require('template/footer.inc.php'); ?>
