<?php
define('TITLE', 'Canvas Try');
define('EXTRA_CODE', '<script src="javascript/jfabric.js"></script><script src="javascript/try_fabric.js"></script><script src="javascript/kinetic.js"></script><script src="javascript/try_kinetic.js"></script>'); //extra javascript code needed for this page
define('EXTRA_CSS', ""); //extra CSS needed for this page
$breadcrumb_list = array("Home", "Canvas Try");
$breadcrumb_link = array("index.php", "#");
session_start();
require('template/header.inc.php');
?>
<header class="title">Canvas Try</header>
<table>
<tr>
	<td><button id="click_me">Click Me!</button></td>
	<td><button id="click_me2">Click Me!</button></td>
</tr>
<tr>
	<td><canvas id="paint_area" height="400px" width="400px"><p>Your browser does not support this application. Use Google Chrome.</p></canvas></td>
	<td><section id="paint_area2" height="400px" width="400px"></section></td>
</tr>
</table>

<?php require('template/footer.inc.php'); ?>