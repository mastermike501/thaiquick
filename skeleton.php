<?php
define('TITLE', '');
define('EXTRA_CODE', ''); //extra javascript code needed for this page
define('EXTRA_CSS', ""); //extra CSS needed for this page
$breadcrumb_list = array("");
$breadcrumb_link = array("#");
session_start();
require('template/header.inc.php');
?>
<header class="title"></header>
<?php require('template/footer.inc.php'); ?>