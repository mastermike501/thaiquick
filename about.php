<?php
define('TITLE', 'About');
define('EXTRA_CODE', ''); //extra javascript code needed for this page
define('EXTRA_CSS', ""); //extra CSS needed for this page
$breadcrumb_list = array("Home", "About");
$breadcrumb_link = array("index.php", "#");
session_start();
require('template/header.inc.php');
?>
<header class="title">About</header>
<p>&raquo; I am <a href="<?php if($browser['ismobiledevice'] == 1) echo 'fb://profile/langagemaster'; else echo 'https://www.facebook.com/langagemaster';?>" target="_blank" class="link_color">Michael Kong</a>. This website's creator, designer and builder, all in one.</p>
<p>&raquo; Contact me <a href="contact.php">here</a>!</p>

<?php require('template/footer.inc.php'); ?>