<?php
define('TITLE', 'Start!');
define('EXTRA_CODE', ''); //extra javascript code needed for this page
define('EXTRA_CSS', ""); //extra CSS needed for this page
$breadcrumb_list = array("Home", "Start");
$breadcrumb_link = array("index.php", "#");
session_start();
require('template/header.inc.php');
?>
<header class="title">Start!</header>
<?php require('template/footer.inc.php'); ?>